import { useNavigate } from "react-router-dom";
import { App } from "../layouts/App";
import {useForm} from 'react-hook-form';

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const SignUp = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [requesting, setRequesting] = useState(false);
    const [error, setError] = useState(null);

    const setErrorMessage = message => {
        if (message) {
            setError(message);
            setTimeout(() => setError(null), 10000);
        }
    }

    // eslint-disable-next-line react/prop-types
    const {logInData} = props
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm();
    const handleFormSubmit = ({email, password, confirmPassword}) => {
        if (password !== confirmPassword) {
            return setErrorMessage("As senhas precisam ser iguais")
        }
        setRequesting(true);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            localStorage.setItem("access-token", credential.user.accessToken);
            logInData(email, password)
            navigate("/");
        })
        .catch((error) => setErrorMessage(error.message === "Firebase: Error (auth/email-already-in-use)." ? "Email já cadastrado" : error.message))
        .finally(() => setRequesting(false));
        }

    return (


        <App>
            <div className="h-screen flex justify-center items-center"> 
                <div className="flex items-center justify-center w-screen h-screen flex-col">
                    <span className="text-sky-500 text-3xl ">Xwitter</span>
                    <p className="pb-5 text-gray-500">
                        Crie uma nova conta e junte-se a uma das maiores comunidades do mundo!
                    </p>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-full lg:w-1/5 md:w-1/3 sm:w-1/2 px-10 sm:px-0 gap-2">
                        <input {...register("email", {required: true, minLength: 5})} type="email" 
                            className= {`placeholder-slate-400 border border${errors.email?.type === "required" ? "-red-500" : "-slate-400"} rounded p-2`} 
                            placeholder="email@example.com"/>
                        
                        {errors.email?.type === "required" && <span className="text-red-500">O campo email é obrigatório</span>}
                        {errors.email?.type === "minLength" && <span className="text-red-500">O email deve ter pelo menos 5 caracteres</span>}
                        
                        <input {...register("password", {required: true, minLength: 8})} type="password" 
                            className= {`placeholder-slate-400 border border${errors.password?.type === "required" ? "-red-500" : "-slate-400"} rounded p-2`} 
                            placeholder="Senha"/>
                        {errors.password?.type === "required" && <span className="text-red-500">O campo senha é obrigatório</span>}
                        {errors.password?.type === "minLength" && <span className="text-red-500">A senha deve ter pelo menos 8 caracteres</span>}

                        <input {...register("confirmPassword", {required: true, minLength: 8})} type="password" 
                            className= {`placeholder-slate-400 border border${errors.ConfirmPassword?.type === "required" ? "-red-500" : "-slate-400"} rounded p-2`}
                            placeholder="Confirme a senha"/>
        
                        {errors.ConfirmPassword?.type === "required" && <span className="text-red-500">O campo confirmar senha é obrigatório</span>}

                        {error && <span className="text-red-500">{error}</span>}

                        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-100 items-center w-full h-10 mt-5 rounded">Criar uma nova conta</button>
                    </form>
                    <span>Já possui uma conta? <a className="text-sky-500" href="/sign-in">Acesse agora!</a></span>
                </div>
            </div>
        </App>
    )
}

