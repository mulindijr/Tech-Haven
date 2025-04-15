import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { AiOutlineSave, AiOutlineLoading3Quarters, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const fileInputRef = useRef(null);
  const { token, backendUrl } = useContext(ShopContext);

  // Fetch user profile data using the provided endpoint.
  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(backendUrl + "/api/profile/get", {}, { headers: { token } });
        const user = response.data.user;
        
        setUserData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          address: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        });
        
        if (user.profilePic) {
          setProfilePicPreview(user.profilePic);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    };

    fetchUserProfile();
  }, [token, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
  
      // Combine address fields and stringify
      const addressObj = {
        street: userData.address,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
        country: userData.country,
      };
      formData.append("address", JSON.stringify(addressObj));
  
      if (profilePic) formData.append("profilePic", profilePic);
  
      const response = await axios.post(
        `${backendUrl}/api/profile/update`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const updatedUser = response.data.user;
  
      setUserData({
        ...updatedUser,
        address: updatedUser.address?.street || "",
        city: updatedUser.address?.city || "",
        state: updatedUser.address?.state || "",
        zipCode: updatedUser.address?.zipCode || "",
        country: updatedUser.address?.country || "",
      });
  
      if (updatedUser.profilePic) {
        setProfilePicPreview(updatedUser.profilePic);
      }
  
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };  

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AiOutlineLoading3Quarters className="animate-spin w-12 h-12 text-blue-600" />
        <p className="mt-4 text-lg text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {profilePicPreview ? (
                    <img 
                      src={profilePicPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AiOutlineUser className="w-10 h-10 text-white" />
                  )}
                </div>
                {isEditing && (
                  <>
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition-all duration-200 transform group-hover:scale-110"
                    >
                      <FiCamera className="w-4 h-4 text-white" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfilePicChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-blue-100">{userData.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <AiOutlineEdit className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <form className="p-6 space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Personal Information
              </h3>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Shipping Address</h3>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={userData.city || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={userData.state || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={userData.zipCode || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={userData.country || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setProfilePic(null); // Clear the selected image from memory

                  // Reset profilePicPreview to the current saved one if it exists
                  if (updatedUser.profilePic) {
                    setProfilePicPreview(updatedUser.profilePic);
                  } else {
                    setProfilePicPreview("");
                  }
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <AiOutlineSave className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;