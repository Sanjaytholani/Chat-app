import {
  DotsVerticalIcon,
  EmojiHappyIcon,
  PaperClipIcon,
  MicrophoneIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import TimeAgo from "timeago-react";
import getRecipientEmail from "../utils/getRecipientEmail";
import Message from "./Message";
import firebase from "firebase";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessage = useRef(null);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
          language={language}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message
          key={message.id}
          user={message.user}
          message={message}
          language={language}
        />
      ));
    }
  };
  const scrollToBottom = () => {
    endOfMessage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    setUid(v4().toString());
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    // db.collection("messages")
    //   .doc(uid)
    //   .set({
    //     message: input,
    //   })
    //   .then(() => {
    //     db.collection("messages")
    //       .doc(uid)
    //       .onSnapshot((snapshot) => {
    //         db.collection("chats")
    //           .doc(router.query.id)
    //           .collection("messages")
    //           .add({
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             message: input,
    //             user: user.email,
    //             photoURL: user.photoURL,
    //             translations: snapshot.data()?.translated,
    //           });
    //       });
    //   });
    if (input.length > 0) {
      db.collection("messages")
        ?.add({
          message: input,
        })
        .then((data) => {
          data.onSnapshot((snapshot) =>
            db
              .collection("chats")
              .doc(router.query.id)
              .collection("messages")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user.email,
                photoURL: user.photoURL,
                translations: snapshot?.data()?.translated,
              })
          );
        });
    }

    setInput("");

    scrollToBottom();
  };
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div className="flex-7 h-screen">
      <div className="flex sticky z-10 h-16 top-0 bg-white justify-between items-center p-2 border-b-2 border-whiteSmoke">
        <div className="flex items-center space-x-2">
          <img src={recipient?.photoURL} className="h-10 w-10 rounded-full" />
          <div className="flex flex-col justify-center space-y-1">
            <h3 className="text-sm">{recipient?.name}</h3>
            {recipientSnapshot ? (
              <h5 className="text-xs text-gray-500">
                {" "}
                Last active:{` `}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : (
                  "Unavailable"
                )}
              </h5>
            ) : (
              <h5 className="text-xs text-gray-500">Loading...</h5>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
          </select>
          <PaperClipIcon className="h-5 w-5 text-gray-500" />
          <DotsVerticalIcon className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="h-[85%] overflow-y-auto bg-[#e5ded8] p-7">
        {showMessages()}
        <div className="mb-4" ref={endOfMessage} />
      </div>
      <form className="flex items-center p-4 sticky z-10 bg-white bottom-0">
        <EmojiHappyIcon className="h-4 w-4" />
        <input
          className="flex-1 border-none rounded-md p-2 mx-4 bg-whiteSmoke focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicrophoneIcon className="h-4 w-4" />
      </form>
    </div>
  );
};

export default ChatScreen;
