import { RiExchangeFundsFill } from "react-icons/ri";
import { FaHeadset } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm md:text-base text-gray-700">
        <div>
            <div className="w-12 m-auto mb-5 text-4xl">
                <RiExchangeFundsFill />
            </div>            
            <p className="font-semibold">Eeasy Exchange Policy</p>
            <p>We offer hassle free exchange policy</p>
        </div>
        <div>
            <div className="w-12 m-auto mb-5 text-4xl">
             <FcApproval />
            </div>            
            <p className="font-semibold">7 days return policy</p>
            <p>We provide 7 days free return policy</p>
        </div>
        <div>
            <div className="w-12 m-auto mb-5 text-4xl">
                <FaHeadset />
            </div>
            <p className="font-semibold">Best customer support</p>
            <p>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy