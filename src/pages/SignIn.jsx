import { App } from "../layouts/App"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";


export const SignIn = (props) => {
    // eslint-disable-next-line react/prop-types
    const {logInData} = props
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm();
    // eslint-disable-next-line no-unused-vars
    const [requesting, setRequesting] = useState(false);
    const [error, setError] = useState(null);

    const setErrorMessage = message => {
        if (message) {
            setError(message);
            setTimeout(() => setError(null), 10000);
        }
    }


    const handleFormSubmit = ({email, password}) => {
        setRequesting(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            logInData(email, password)
            // Signed in 
            localStorage.setItem("access-token", credential.user.accessToken);
            // ...
            navigate("/")
        })
        .catch((error) => setErrorMessage(error.message === "Firebase: Error (auth/invalid-credential)." ? "Email ou senha inválidos" : error.message))
        .finally(() => setRequesting(false));
    }

    return (


        <App>
            <div className="h-screen flex justify-center items-center"> 
                <div className="flex items-center justify-center w-screen h-screen flex-col">
                    <span className="text-sky-500 text-3xl mb-5">Xwitter</span>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-full lg:w-1/5 md:w-1/3 sm:w-1/2 px-10 sm:px-0 gap-2">
                        <input {...register("email", {required: true})} type="email" 
                            className= {`placeholder-slate-400 border border${errors.email?.type === "required" ? "-red-500" : "-slate-400"} rounded p-2`} 
                            placeholder="email@example.com"/>
                        
                        {/* {errors.email?.type === "required" && <span className="text-red-500">O campo email é obrigatório</span>} */}
                        
                        <input {...register("password", {required: true})} type="password" 
                            className= {`placeholder-slate-400 border border${errors.password?.type === "required" ? "-red-500" : "-slate-400"} rounded p-2`} 
                            placeholder="Senha"/>
                        {/* {errors.password?.type === "required" && <span className="text-red-500">O campo senha é obrigatório</span>} */}
                        {error && <span className="text-red-500">{error}</span>}

                        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-100 items-center w-full h-10 mt-5 rounded">Acessar Plataforma</button>
                    </form>
                    <span>Não possui uma conta? <a className="text-sky-500" href="/sign-up">Crie uma agora!</a></span>
                </div>
            </div>
        </App>
    )
}

