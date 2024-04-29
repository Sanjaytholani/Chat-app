import Head from "next/head";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Head>
        <title>Login</title>
      </Head>
      <header>
        <button
          onClick={signIn}
          className="px-2 w-80 flex flex-row items-center space-x-2 py-4 text-xl border border-whiteSmoke hover:bg-gray-50 focus:outline-none"
        >
          <img className="h-7 w-7 object-contain" src="/google.png" />
          <h1 className="text-gray-400">Continue With Google</h1>
        </button>
      </header>
    </div>
  );
};

export default Login;
