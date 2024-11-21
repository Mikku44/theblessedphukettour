import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config";
import { cookies } from "next/headers";


export async function POST(req) {
    try {
        const data = await req.json();
        if (!data) return Response.json({
            status: "ERROR",
            message: "Invalid Username or Password."
        })
        // const { email, password } = data

        const email = data.email
        const password = data.password

        const result = signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log("Already Logined  : ", user)
                const session = JSON.stringify(user) //encypt before use
                const expires = new Date(Date.now() + 10 * 1000);
                cookies().set("session", session, { expires, httpOnly: true })
                return Response.json({
                    status: "OK",
                    message: "Create account succesfully.",
                    user: {
                        id: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        verified: user.emailVerified,
                        image: user.photoURL
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error : ", errorCode, " : ", errorMessage)
                return Response.json({
                    status: "ERROR",
                    message: errorMessage
                })
            });

        return result

    }
    catch (e) {
        return Response.json({
            status: "ERROR",
            message: `${e.message}`,
        })
    }
}


export function GET(req) {
    return Response.json({
        status: "OK",
        message: "TEST GET"
    })
}
