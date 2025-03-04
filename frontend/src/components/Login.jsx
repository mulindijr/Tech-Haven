import { useState, useEffect, useContext } from "react"
import { MdClose } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({setShowLogin}) => {

  const [currentState, setCurrentState] = useState('Login')
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        console.log(response.data)
      }
    } catch {

    }
  }

  // Prevent scrolling when the modal is open
  useEffect(() => {
    if (typeof setShowLogin === "function") {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "unset"; // Restore scrolling
    }

    // Cleanup function to restore scrolling on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [setShowLogin]);

  return (
    <div className="absolute z-[1] w-full h-full bg-[#00000090] grid">
      <div className="place-self-center animate-fadeIn">
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-slate-200 px-5 py-5 rounded mb-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl">{currentState}</h2>
            <MdClose onClick={() => typeof setShowLogin === "function" && setShowLogin(false)} className="w-8 h-8 cursor-pointer"/>
          </div>      
          {currentState === "Login" ? <></>: <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Fullname" required className="w-full px-3 py-2 border border-gray-400 outline-none rounded"/>}
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full px-3 py-2 border border-gray-400 outline-none rounded"/>
          <div className="relative">
            <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} placeholder="Password" required className="w-full px-3 py-2 border border-gray-400 outline-none rounded"/>
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer text-sm text-red-500">
              {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
            </span>
          </div>
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
      </div>
    </div>
  )
}

export default Login