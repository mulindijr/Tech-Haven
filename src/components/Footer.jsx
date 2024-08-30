import { footerLinks } from "../constants"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-100">
        <div className="mx-10 pt-5">
            <div className="flex justify-between items-start flex-wrap max-lg:flex-col">
                <div className="flex flex-col">
                    <h1 className='flex items-start text-xl font-bold cursor-pointer'>Tech
                      <span className='text-red-500'>Haven</span>
                    </h1>
                    <p className="mt-6 text-base leading-7 text-white-400 sm:max-w-sm">Get electronic devices at your nearest Tech Haven store.Find your perfect device in store.Get Rewards</p>
                    <div className=" flex items-center gap-5 mt-2">
                        <div className="flex justify-center items-center w-5 h-5 rounded-full p-5 cursor-pointer bg-white">i</div>
                        <div className="flex justify-center items-center w-5 h-5 rounded-full p-5 cursor-pointer bg-white">f</div>
                        <div className="flex justify-center items-center w-5 h-5 rounded-full p-5 cursor-pointer bg-white">x</div>
                        <div className="flex justify-center items-center w-5 h-5 rounded-full p-5 cursor-pointer bg-white">l</div>
                    </div>
                </div>    
                <div className="mt-5 flex flex-1 flex-wrap justify-between max-lg:gap-20 gap-5">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-2xl leading-normal font-medium">
                                {section.title}
                            </h4>
                            <ul>
                                {section.links.map((link) => (
                                    <li key={link.name} className="text-base leading normal cursor-pointer hover:text-blue-400 ">
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>                   
                        </div>
                    ))}
                </div>
                
            </div>

            <div className="flex justify-between mt-10 pb-2 max-sm:flex-col max-sm:items-center">
                <span>© 2024 Developed by Mulindi. All rights reserved.</span>
                <p className="cursor-pointer">
                    <a href="/terms&conditions">
                        Terms & Conditions  
                    </a>
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer