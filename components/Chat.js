import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from "next/router";
const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <div
      onClick={enterChat}
      className="flex border-b-2 border-whiteSmoke w-full items-center space-x-2 p-2 cursor-pointer hover:bg-whiteSmoke"
    >
      <img
        src={recipient?.photoURL}
        className="h-7 w-7 rounded-full cursor-pointer"
      />
      <h1>{recipient?.name}</h1>
    </div>
  );
};

export default Chat;
