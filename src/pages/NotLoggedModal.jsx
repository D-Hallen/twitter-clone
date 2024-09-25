import { useNavigate } from "react-router-dom";



export const NotLoggedModal = () => {

    const navigate = useNavigate()
    const handleSignOut = () => {
        navigate('/sign-up')
      }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> 
            <div className="items-center justify-center w-30 h-auto flex-col border border-slate-300 bg-slate-50 rounded px-5 py-5 shadow-md">
                <span className="text-sky-500 text-3xl ">Xwitter</span>
                <p className="pb-5 text-gray-500">
                    Crie uma conta e junte-se a uma das maiores comunidades do mundo!
                </p>
                <button className="bg-sky-500 hover:bg-sky-600 border border-slate-300 text-slate-100 items-center w-full h-10 rounded" onClick={handleSignOut}>Criar uma conta</button>
                <p className="pb-5 text-gray-500 text-center pt-2">
                    Já tem uma conta? <a className="text-sky-500 hover:underline" href="/sign-in">Acesse agora!</a>
                </p>
                
            </div>
        </div>
    )
}