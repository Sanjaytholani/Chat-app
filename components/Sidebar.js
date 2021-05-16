import {
  AnnotationIcon,
  DotsVerticalIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import * as emailValidator from "email-validator";
import { auth } from "../firebase";

const Sidebar = () => {
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat chat"
    );
    if (!input) return null;
    if (emailValidator.validate(input)) {
      //
    }
  };
  return (
    <div className="flex flex-col border-r-2 border-whiteSmoke h-screen">
      <div className="flex flex-row top-0 sticky z-10 bg-white justify-between items-center p-2 h-28 border-b-2 border-whiteSmoke">
        <img
          src="https://avatars.githubusercontent.com/u/63097168?s=60&v=4"
          className="h-12 w-12 rounded-full cursor-pointer"
          onClick={() => auth.signOut()}
        />
        <div className="flex flex-row space-x-2">
          <AnnotationIcon className="h-7 w-7" />
          <DotsVerticalIcon className="h-7 w-7" />
        </div>
      </div>
      <div className="flex flex-row items-center space-x-1 py-1">
        <SearchIcon className="h-5 w-5" />
        <input
          className="text-lg p-2 border-none focus:outline-none"
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
    </div>
  );
};

export default Sidebar;
