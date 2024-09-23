import Title from "../components/Title"
import Hero from "../components/Hero"

const About = () => {
  return (
    <section className="py-10">
      <Title title1={'About'} title2={'Tech Haven'}/>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2">
          <Hero />
        </div>
        <div className="w-full sm:w-1/2">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to <span className="font-semibold text-red-400">Tech Haven</span>, your trusted online destination for the latest and greatest in electronic devices.
            We specialize in providing a wide range of high-quality gadgets, from smartphones and laptops to smart home devices, accessories, and more. 
            Our mission is to offer cutting-edge technology at competitive prices, ensuring that you stay connected and ahead of the curve in the digital age.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At Tech Haven, we believe in making technology accessible to everyone. Whether you're a tech enthusiast, a professional, or someone 
            looking for the perfect device to suit your lifestyle, we’ve got something for you. We are committed to offering products from top brands,
            with a seamless shopping experience and excellent customer support to help you find exactly what you need.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore the future of technology with us and experience the convenience of shopping at Tech Haven—where innovation meets affordability.
        </p>
      </div>      
    </section>
  );
};

export default About;
