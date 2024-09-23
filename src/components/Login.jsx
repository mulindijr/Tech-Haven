import { useState } from "react"
import { MdClose } from "react-icons/md";

const Login = ({setShowLogin}) => {

  const [currentState, setCurrentState] = useState('Login')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-slate-200 px-5 py-5 rounded mb-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl">{currentState}</h2>
        <MdClose onClick={() => setShowLogin(false)} className="w-8 h-8 cursor-pointer"/>
      </div>      
      {currentState === "Login" ? <></>: <input type="text" placeholder="Fullname" required className="w-full px-3 py-2 border border-gray-400 outline-none rounded"/>}
      <input type="email" placeholder="Email" required className="w-full px-3 py-2 border border-gray-400 outline-none rounded"/>
      <input type="password" placeholder="Password" required className="w-full px-3 py-2 border border-gray-400 outline-none rounded"/>
      <button className="w-full py-2 text-xl border-none rounded text-white bg-red-500">{currentState === 'Sign Up' ? "Create Account" : "Login"}</button>
      
      {currentState === 'Sign Up' 
      ? <div className="flex gap-2">
          <input type="checkbox" required />
          <p>I agree to terms of use and privacy policy</p>
        </div>
      : ""
      }

      {currentState === 'Login' 
      ? <p>Create new Account? <span onClick={() => setCurrentState("Sign Up")}  className="cursor-pointer text-red-500">Click here</span></p> 
      : <p>Already have an Account? <span onClick={() => setCurrentState("Login")}  className="cursor-pointer text-red-500">Login here</span></p>}      
    </form>
  )
}

export default Login