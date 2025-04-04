import { footerLinks } from "../constants"
import { Link } from 'react-router-dom';
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 mt-4">
        <div className="mx-10 pt-2">
            <div className="flex justify-between items-start flex-wrap max-lg:flex-col">
                <div className="flex flex-col">
                    <h1 className='flex items-start text-xl font-bold cursor-pointer'>Tech
                      <span className='text-red-500'>Haven</span>
                    </h1>
                    <p className="mt-2 sm:mt-6 text-base leading-7 text-white-400 sm:max-w-sm">Get electronic devices at your nearest Tech Haven store.Find your perfect device in store.Get Rewards</p>
                    <SocialMediaLinks />
                </div>    
                <div className="mt-5 flex flex-1 flex-wrap justify-between">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg sm:text-2xl leading-normal font-medium">
                                {section.title}
                            </h4>
                            <ul>
                                {section.links.map((link) => (
                                    <li key={link.name} className="text-base leading normal cursor-pointer hover:font-semibold">
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>                   
                        </div>
                    ))}
                </div>
                
            </div>

            <div className="flex justify-between mt-4 pb-2 max-sm:flex-col max-sm:items-center">
                <span className="text-center sm:text-left">© 2024 Developed by Mulindi. All rights reserved.</span>
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