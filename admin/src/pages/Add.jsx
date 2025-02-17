import React, { useState } from 'react';
import { MdOutlineCloudUpload } from "react-icons/md";

const Add = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <form className="space-y-6 p-6 border rounded-xl shadow-lg w-full max-w-2xl mx-auto bg-white">
      {/* Image Upload Section */}
      <div>
        <p className="text-lg font-semibold text-gray-700 mb-2">Upload Product Image</p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors duration-200 hover:border-blue-500 hover:bg-gray-50">
          <label htmlFor="image" className="group flex flex-col items-center gap-3 cursor-pointer">
            {image ? (
              <img src={image} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-sm" />
            ) : (
              <>
                <MdOutlineCloudUpload 
                  size={60} 
                  className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" 
                />
                <div className="space-y-1">
                  <p className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG (max. 5MB)</p>
                </div>
              </>
            )}
            <input type="file" id="image" hidden onChange={handleImageChange} />
          </label>
        </div>
      </div>

      {/* Form Grid */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 border-xl transition-all"
              placeholder="Enter product name"
            />
          </div>

          {/* Brand Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 border-xl transition-all"
              placeholder="Enter brand name"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-2.5 border-xl transition-all">  
              <option value="laptop">Laptop</option>
              <option value="smartphone">Smartphone</option>
              <option value="television">Television</option>
              <option value="soundDevice">Sound Device</option>
            </select>
          </div>

          {/* Rating Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              required
              className="w-full px-4 py-2.5 border-xl transition-all"
              placeholder="Enter rating"
            />
          </div>
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (Ksh)
          </label>
          <input
            type="number"
            required
            className="w-full px-4 py-2.5 border-xl transition-all"
            placeholder="Enter price"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows="4"
            required
            className="w-full px-4 py-2.5 border-xl transition-all resize-none"
            placeholder="Write detailed product description..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 rounded text-white py-3.5 font-semibold hover:bg-blue-700 transition-colors duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;