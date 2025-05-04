import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { infinixHeroBackground, infinixHeroBackground1, camonHeroBackground } from "../assets/images";

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

  return (
    <div className="hero-slider h-[225px] sm:h-[500px] overflow-hidden">
      <Slider {...settings}>
        <div>
          <img src={infinixHeroBackground} alt="Spark 20" className="object-cover w-full"/>
        </div>
        <div>
          <img src={infinixHeroBackground1} alt="Infinix Hero" className="object-cover w-full"/>
        </div>
        <div>
          <img src={camonHeroBackground} alt="Lenovo Hero" className="object-cover w-full"/>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
