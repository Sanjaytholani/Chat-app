import {
  AnnotationIcon,
  DotsVerticalIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import * as emailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat chat"
    );
    if (!input) return null;
    if (
      emailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };
  return (
    <div className="flex-3 border-r-2 border-whiteSmoke h-full">
      <div className="flex flex-row top-0 sticky z-10 bg-white justify-between items-center p-2 h-16 border-b-2 border-whiteSmoke">
        <img
          src={user.photoURL}
          className="h-12 w-12 rounded-full cursor-pointer"
          onClick={() => auth.signOut()}
        />
        <div className="flex flex-row space-x-2">
          <AnnotationIcon className="h-7 w-7" />
          <DotsVerticalIcon className="h-7 w-7" />
        </div>
      </div>
      <div className="flex flex-row items-center space-x-1 p-1 ">
        <SearchIcon className="h-5 w-5" />
        <input
          className="text-lg p-2 border-none focus:outline-none  w-full"
          type="text"
          placeholder="Search"
        />
      </div>
      <button
        onClick={createChat}
        className="w-full px-2 py-4 text-xl border border-whiteSmoke hover:bg-gray-50 focus:outline-none"
      >
        Start a New Chat
      </button>
      <div className="h-full overflow-y-auto">
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
