import { App } from "../layouts/App"
import {useForm} from 'react-hook-form'

export const SignIn = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const handleFormSubmit = ({email, password}) => {
        console.log ("Criando conta... ",email, password)
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

                        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-100 items-center w-full h-10 mt-5 rounded">Acessar Plataforma</button>
                    </form>
                    <span>Não possui uma conta? <a className="text-sky-500" href="/sign-up">Crie uma agora!</a></span>
                </div>
            </div>
        </App>
    )
}

