/* eslint-disable react/prop-types */
import { App } from "../layouts/App";
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { NotLoggedModal } from "./NotLoggedModal";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import {getDatabase, ref, child, get, set} from 'firebase/database'
import { useState, useEffect } from "react";


export const Home = () => {
  // eslint-disable-next-line react/prop-types
  const db = getDatabase();
  const [xweet, setXweet] = useState([])
  const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();
  const navigate = useNavigate()
  const inputValue = watch('xwitte','')
  const user = jwtDecode(localStorage.getItem("access-token"))
  
  const handleSignOut = () => {
    navigate('/sign-in')
  }
  const handleFormSubmit = ({xwitte}) => {
     set(ref(db, 'xweet/' + new Date().getTime()), {
      message: xwitte,
      email: user.email,
      date: new Date().toLocaleString()
     }).catch((error) => {
      console.error(error);
     })
     loadDB();
    reset();
  }

  const loadDB = () => {
    get(child(ref(db), 'xweet')).then(() => {
      get(child(ref(db), 'xweet')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const xweetArray = Object.entries(data).map(([key, value]) => ({key, ...value}));
          setXweet(xweetArray.reverse())
          console.log (xweetArray)
        }
      })
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
   loadDB()
  })

  return (
  <App>
    <div className="bg-slate-100 h-screen ">
      <header className="w-full border-b bg-slate-50 border-slate-300 h-11 flex items-center px-5 gap-2">
        <span className="text-sky-500 text-lg font-sans flex-1 font-roboto font-light">xwitter</span>
        <span className="text-slate-500 text-sm">{user.email}</span>
        <button className="font-roboto bg-red-500 text-slate-50 px-2 py-1 rounded" onClick={handleSignOut}>sair</button>
      </header>
      <div className=" sm:w-[90%] lg:w-3/4 mx-auto mt-10 px-2">
        <p className="px-2 pb-2.5 text-slate-700 font-roboto font-light text-sm">Xwitte agora mesmo...</p>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <textarea type="text" {...register("xwitte", {required: true, maxLength: 280})}
           className="border border-slate-300 rounded p-2 w-full h-28 placeholder-lg" placeholder="O que esta acontecendo?"/>
          
          {errors.xwitte?.type === "maxLength" && <span className="text-red-500">O xwitte deve ter no maximo 280 caracteres</span>}

          <div className="flex mt-3">
          <span className={`flex-1 ${inputValue.length < 280 ? 'text-emerald-500' : 'text-red-500'}`}>
            Você ainda pode digitar {280-inputValue.length} caracteres
          </span>
            <button disabled={inputValue.length < 1} className="bg-sky-500 text-slate-50 px-2 py-1 h-10 rounded disabled:opacity-70">Tweetar</button>
          </div>
        </form>
      </div>

       
      {//eslint-disable-next-line react/prop-types
      xweet.map((elem) => {
        return (
          <div key={elem.data}className="animate-pulse-short 1s lg:w-3/4 lg:mx-auto mx-2 mt-10 mx-10 bg-slate-50 border border-slate-300 rounded p-5">
              <p className='text-slate-600 mb-8'>{elem.message}</p>
            <div className="flex">
              <span className="text-sky-500 text-sm flex-1">{elem.email}</span>
              <span className="text-slate-500 text-xs">{elem.date}</span>
            </div>
          </div>
        )})}

        {user.email ? null : <NotLoggedModal/>}
        
    </div>
  </App>
)};

Home.propTypes = {
  xweetPosts: PropTypes.array
}



