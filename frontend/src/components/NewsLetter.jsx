const NewsLetter = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
        <p className="text-gray-400 mt-3">Sign up now to enjoy a 20% discount and stay updated with our latest offers and updates.</p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-full">
            <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your Email" required/>
            <button type="submit" className="bg-black text-white text-lg px-4 py-1 sm:px-10 sm:py-4">Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter;