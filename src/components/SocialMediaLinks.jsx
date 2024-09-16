import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; 
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaLinks = () => {
    return (
        <div className="flex items-center gap-5 mt-2">
            {/* Instagram */}
            <a href="https://www.instagram.com/mulindijr" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer bg-white shadow-lg">
                    <FaInstagram className="text-xl text-red-400" />
                </div>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/mulindijr" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer bg-white shadow-lg">
                    <FaFacebookF className="text-xl text-red-400" />
                </div>
            </a>
            {/* Twitter */}
            <a href="https://www.twitter.com/mulindijr" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer bg-white shadow-lg">
                    <FaXTwitter className="text-xl text-red-400" />
                </div>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/mulindijr/" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer bg-white shadow-lg">
                    <FaLinkedinIn className="text-xl text-red-400" />
                </div>
            </a>
        </div>
    );
};

export default SocialMediaLinks;
