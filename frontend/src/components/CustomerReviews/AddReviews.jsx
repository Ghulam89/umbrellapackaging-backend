import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Modal from "../common/Modal";
import Input from "../common/Input";
import logo from "../../assets/images/umbrella-logo.svg";
import Button from "../common/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";

const AddReviews = ({ isModalOpen, setIsModalOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: ""
  });
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({
      ...prev,
      rating: value
    }));
  };

  const handleHoverRating = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate rating
    if (formData.rating < 1 || formData.rating > 5) {
      toast.error("Please select a rating between 1 and 5 stars");
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${BaseUrl}/rating/create`, formData);
      toast.success("Review submitted successfully!");
      setIsModalOpen(false);
      
      setFormData({
        name: "",
        email: "",
        rating: 0,
        review: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  // Function to render stars with more professional appearance
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      const ratingValue = star;
      
      return (
        <label
          key={star}
          className="cursor-pointer transition-all duration-200 p-1"
          onMouseEnter={() => handleHoverRating(ratingValue)}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => handleRatingChange(ratingValue)}
            className="hidden"
            required
          />
          {ratingValue <= (hoverRating || formData.rating) ? (
            <FaStar 
              className="text-3xl text-[#f0ad4e]" 
              style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.2))" }}
            />
          ) : (
            <FaRegStar className="text-3xl text-gray-600" />
          )}
        </label>
      );
    });
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} className={"rounded-xl max-w-lg mx-auto"}>
        <div className="p-5">
          <div className="bg-[#b8b6fa99] rounded-xl shadow-lg flex flex-col items-center p-6 relative">
            <div className="cursor-pointer absolute top-4 right-4">
              <MdClose 
                onClick={() => setIsModalOpen(false)} 
                size={25} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              />
            </div>
            
            <div className="flex flex-col items-center mt-4 mb-2">
              <img src={logo} alt="Company Logo" className="mb-3 w-32" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">Share Your Feedback</h2>
              <p className="text-gray-600 text-sm">We value your opinion</p>
            </div>
            
            <form className="w-full mt-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
                <div className="w-full">
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="rounded-lg w-full h-12  border bg-white px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 transition-colors"
                    required
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="rounded-lg w-full h-12  border bg-white px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="pb-2 text-gray-700 font-medium">
                  How would you rate your experience?
                </p>
                <div className="flex justify-start gap-1">
                  {renderStars()}
                </div>
               
              </div>

              <div className="flex flex-col mb-4 mt-4">
                <label
                  className="pb-2 text-gray-700 font-medium"
                  htmlFor="review"
                >
                  Your Review:
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={3}
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Share details of your experience with us..."
                  className="rounded-lg w-full  border bg-white p-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                ></textarea>
              </div>
              
              <Button
                label={loading ? "Submitting..." : "Submit Review"}
                className=" bg-indigo-700 hover:bg-indigo-700 text-white mt-2 w-full py-3 rounded-lg font-medium disabled:opacity-80 transition-colors shadow-md hover:shadow-lg"
                type="submit"
                disabled={loading || formData.rating === 0}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddReviews;