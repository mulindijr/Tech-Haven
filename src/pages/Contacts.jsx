import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';
import { BsPhone } from 'react-icons/bs';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-12 px-4">      
      <p className="text-center text-sm sm:text-lg text-gray-700 mb-12">
        We would love to hear from you! Whether you have questions, feedback, or concerns, our team is here to assist you. 
        Please feel free to reach out to us using the contact form below. For a more personal touch, you can also visit our 
        office at the address shown on the map. We look forward to connecting with you and providing the support you need.
      </p>

      <div className='mb-12'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0169788218373!2d36.961706974044866!3d-1.1483576354889946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4750be919635%3A0x6fa1a091d62c885c!2sKimtech%20properties!5e0!3m2!1sen!2ske!4v1721428135636!5m2!1sen!2ske"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of Kimtech Properties, Ruiru"
        ></iframe>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-8 mb-12">
        <div className="space-y-8 sm:w-1/3"> 
          <div className="flex items-center space-x-4 group">
            <div className='p-4 bg-blue-100 rounded-full group-hover:bg-blue-500 transition duration-300'>
              <FaMapMarkerAlt className='text-blue-500 text-xl group-hover:text-white' />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Location:</h2>
              <span className="text-gray-600">C63 Kimtech Properties, Ruiru, Kenya</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 group">
            <div className='p-4 bg-blue-100 rounded-full group-hover:bg-blue-500 transition duration-300'>
              <TfiEmail className='text-blue-500 text-xl group-hover:text-white' />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Email:</h2>
              <a href="mailto:customer@techhaven.com" className="text-gray-600 cursor-pointer">customer@techhaven.com</a>
            </div>
          </div>
          <div className="flex items-center space-x-4 group">
            <div className='p-4 bg-blue-100 rounded-full group-hover:bg-blue-500 transition duration-300'>
              <BsPhone className='text-blue-500 text-xl group-hover:text-white' />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Call:</h2>
              <span className="text-gray-600">(713) 62-1330</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:w-2/3 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Subject"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Message"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
