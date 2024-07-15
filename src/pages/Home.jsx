import { App } from "../layouts/App"

export const Home = () => {
    return (
        <App>
            <div className="h-screen flex justify-center items-center">
                <div className="text-center gap-0">
                    <span className="text-sky-500 text-3xl ">Xwitter</span>
                    <form action="" className="flex flex-col w-96 gap-y-2 mt-5">
                        <input type="email" className="placeholder-slate-400 border border-slate-400 rounded p-2" placeholder="email@example.com"/>
                        <input type="password" className="placeholder-slate-400 border border-slate-400 rounded p-2" placeholder="Senha"/>
                        <button className="bg-emerald-500 text-slate-100 items-center w-full h-10 mt-5 rounded">Criar uma nova conta</button>
                    </form>
                    <span>Já possui uma conta? <a className="text-sky-500" href="#">Acesse agora!</a></span>
                </div>
            </div>
        </App>
    )
}

