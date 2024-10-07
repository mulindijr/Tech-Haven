import Title from "../components/Title"
import Hero from "../components/Hero"

const About = () => {
  return (
    <section className="py-10">
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
        <p className="text-lg text-gray-700 leading-relaxed mb-2">
            At Tech Haven, we believe in making technology accessible to everyone. Whether you're a tech enthusiast, a professional, or someone 
            looking for the perfect device to suit your lifestyle, we’ve got something for you. We are committed to offering products from top brands,
            with a seamless shopping experience and excellent customer support to help you find exactly what you need.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore the future of technology with us and experience the convenience of shopping at Tech Haven—where innovation meets affordability.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-xl font-bold text-center mb-2">Why Choose Us?</h3>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>We offer a wide range of high-quality electronic products from top brands, ensuring that you get the best in technology.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>Our competitive prices make cutting-edge technology more accessible and affordable to everyone.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>Enjoy a seamless shopping experience with fast, reliable delivery and hassle-free returns.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>We provide exceptional customer service to assist you with any inquiries or issues you may have.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>We prioritize your security and privacy, ensuring safe and secure transactions on our platform.</span>
          </li>
        </ul>
      </div>     
    </section>
  );
};

export default About;
