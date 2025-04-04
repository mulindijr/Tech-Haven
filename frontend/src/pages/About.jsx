import Title from "../components/Title";
import { FiCheckCircle, FiShield, FiTruck, FiTag, FiHeadphones } from "react-icons/fi";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <section className="py-1">
      <div className="container mx-auto px-4 max-w-6xl">
        <Title title="About Tech Haven" subtitle="Our Story & Values" center />
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="w-full">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
              Empowering Your Digital Journey
            </h2>
            <p className="text-center text-lg text-gray-600 leading-relaxed mb-6">
              Welcome to <span className="font-semibold text-red-500">Tech Haven</span>, your trusted destination for cutting-edge electronics. 
              We're passionate about connecting you with the latest gadgets that enhance your daily life and propel your 
              productivity to new heights.
            </p>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Promise</h3>
              <p className="text-gray-700">
                Quality products | Expert-curated selection | Price match guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FiCheckCircle className="text-red-600 mr-2" />
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To democratize technology access through carefully selected devices that offer exceptional 
              value, paired with education and support that empowers every user.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FiShield className="text-red-600 mr-2" />
              Our Values
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Integrity guides every decision. We prioritize sustainability in our operations and 
              maintain transparency in all customer interactions.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white py-12 px-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Tech Haven Stands Out
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FiTag, title: "Best Prices", text: "Daily price monitoring and match guarantee" },
              { icon: FiTruck, title: "Fast Shipping", text: "Free expedited shipping on orders over Ksh 30,000" },
              { icon: FiHeadphones, title: "24/7 Support", text: "Award-winning customer service team" },
              { icon: FiCheckCircle, title: "Quality Assurance", text: "Rigorous 5-point inspection process" },
              { icon: FiShield, title: "Secure Shopping", text: "Bank-grade encryption for all transactions" },
              { icon: "🔄", title: "Easy Returns", text: "30-day no-questions-asked return policy" },
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 shadow-md transition-all"
              >
                <div className="flex items-center mb-4">
                  {typeof feature.icon === 'string' ? (
                    <span className="text-2xl mr-3">{feature.icon}</span>
                  ) : (
                    <feature.icon className="text-2xl text-red-600 mr-3" />
                  )}
                  <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                </div>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Policy */}
        <OurPolicy />

        {/* Newsletter */}
        <NewsLetter />

      </div>
    </section>
  );
};

export default About;