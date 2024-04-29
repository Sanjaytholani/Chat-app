import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Message = ({ user, message, language }) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? "sender" : "reciver";
  return (
    <div>
      {message?.translated?.[language] && (
        <div
          className={`p-4 rounded-xl m-2 w-max relative ${
            TypeOfMessage === "sender"
              ? "text-right bg-[#dcf8c6] ml-auto"
              : "text-left bg-whiteSmoke"
          }`}
        >
          <h1>
            {message?.translated?.[language]
              ? message?.translated?.[language]
              : message.message}
          </h1>
          <h3 className="text-[9px] text-gray-500 text-right">
            {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Message;
