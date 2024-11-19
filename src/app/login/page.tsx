'use client'
import { getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../api/config/config";
import { Button } from "@nextui-org/button";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const loginWithGoogle = async () => {
    console.log("CLICKED")
    try {
      const provider = new GoogleAuthProvider();

      // Redirects the user to Google's login page
      await signInWithRedirect(auth, provider);
      alert("SIGN IN COMPLETE")
      // After redirecting back, process the result

    } catch (error) {
      console.error("Login failed", error);

      const credential = GoogleAuthProvider.credentialFromError(error);
      alert("Something went wrong");
    }
  };

  const isAuthenticated = async () => {
    const result = await getRedirectResult(auth);

    if (result) {
      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info
      const user = result.user;
      console.log("LOGGED IN", user);

      alert("Login complete");
      return true
    }
  }
  useEffect(() => {
    isAuthenticated();
  }, [])


  const loginWithCredentials = async () => {

    console.log("Login with credentials : ", email, ":", password)

    const result = await fetch('/api/auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({ email, password }) // Serialize the body as a JSON string
    });
    const data = await result.json()

    console.log("RESULT : ", data)

    if (data.user) {
      const user = data.user
      localStorage.setItem("user", JSON.stringify(user))
    }
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //       console.log("Already Logined  : ",user)
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("Error : ",errorCode," : ",errorMessage)
    //   });
  }



  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          LOGO
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={loginWithCredentials}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[--primary] focus:ring-[--primary] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[--primary] hover:text-[--primary]">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                onClick={loginWithCredentials}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[--primary] hover:bg-[--primary] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary]"
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div>
                <Button
                  onClick={e => loginWithGoogle()}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="h-5 w-5" />
                  <span className="px-2">Google</span>
                </Button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}