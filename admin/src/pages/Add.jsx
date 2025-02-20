import React, { useState } from 'react';
import { MdOutlineCloudUpload } from "react-icons/md";
import axios from 'axios';
import {backendUrl} from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image, setImage] = useState(null);
  const [name,setName] = useState('');
  const [brand,setBrand] = useState('');
  const [category,setCategory] = useState('Laptop');
  const [rating,setRating] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Category-wise brand mapping
  const categoryBrands = {
    Laptop: ["Apple", "Dell", "Lenovo", "HP", "Asus", "Acer"],
    Smartphone: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Tecno", "Infinix"],
    Television: ["Samsung", "LG", "Sony", "TCL", "Hisense", "Vitron"],
    Audio: ["Bose", "Sony", "JBL", "Sennheiser", "Beats", "Samsung"],
  };

  // Update brands when category changes
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setBrand(categoryBrands[newCategory][0]); // Set first brand in the list
  };  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("rating", rating);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}});

      if(response.data.success) {
        toast.success(response.data.message);
        setImage(null);
        setName('');
        setBrand('');
        setCategory('Laptop');
        setRating('');
        setPrice('');
        setDescription('');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  } 

  return (
    <form onSubmit={onSubmitHandler} className="space-y-6 p-6 border rounded-xl shadow-lg w-full max-w-2xl mx-auto bg-white">
      {/* Image Upload Section */}
      <div>
        <p className="text-lg font-semibold text-gray-700 mb-2">Upload Product Image</p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors duration-200 hover:border-blue-500 hover:bg-gray-50">
          <label htmlFor="image" className="group flex flex-col items-center gap-3 cursor-pointer">
            {!image ? (
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
            ): (
              <img 
                src={URL.createObjectURL(image)}
                alt="Preview" 
                className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-lg shadow-sm" 
              />
            )}
            <input type="file" id="image" hidden onChange={e => setImage(e.target.files[0])} />
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
              onChange = {e => setName(e.target.value)}
              value={name}
              type="text"
              required
              className="w-full px-4 py-2.5 border-xl transition-all"
              placeholder="Enter product name"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select onChange = {handleCategoryChange} value={category} className="w-full px-4 py-2.5 border-xl transition-all"> 
              {Object.keys(categoryBrands).map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Brand Select (Filtered Based on Category) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select onChange={(e) => setBrand(e.target.value)} value={brand} className="w-full px-4 py-2.5 border-xl transition-all"> 
              <option value="" disabled>
                Select a brand
              </option>
              {categoryBrands[category].map((br) => (
                <option key={br} value={br}>
                  {br}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-5)
            </label>
            <input
              onChange = {e => setRating(e.target.value)}
              value={rating}
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
            onChange = {e => setPrice(e.target.value)}
            value={price}
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
            onChange = {e => setDescription(e.target.value)}
            value={description}
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
        disabled={loading}
        className={`w-full rounded text-white py-3.5 font-semibold transition-colors duration-200 ${
          loading ? 'bg-blue-900 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? `Adding ${name}...` : 'Add Product'}
      </button>
    </form>
  );
};

export default Add;