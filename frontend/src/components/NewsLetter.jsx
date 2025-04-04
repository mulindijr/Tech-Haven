import { FiMail, FiArrowRight } from "react-icons/fi";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center px-4">
      <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
      <p className="text-gray-500 mt-3">
        Sign up now to enjoy a 20% discount and stay updated with our latest offers and updates.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto space-y-4 sm:space-y-0 sm:space-x-4 mt-6"
      >
        <div className="relative w-full sm:w-72">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
          <input
            type="email"
            placeholder="Enter your Email"
            required
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Subscribe <FiArrowRight />
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;