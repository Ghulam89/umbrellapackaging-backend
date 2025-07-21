import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import AddReviews from "../../components/CustomerReviews/AddReviews";
import Button from "../../components/common/Button";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/rating/getAll`);
      setReviews(response?.data?.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl    font-medium mb-4">
            Customers Trust Umbrella Custom Packaging
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Customers are really important to our business! If it weren't for them, 
            it would have taken us a long time to succeed. We're grateful for all 
            the customers who've supported us and helped us sell more. When our 
            customers are happy, it makes us feel really good and pushes us to keep improving.
          </p>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-xl md:text-2xl  font-medium  mb-4">
            Lots of customers say nice things about us!
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-sm md:text-base text-gray-600 mb-4 max-w-3xl mx-auto">
              Because we do a good job making sure they're happy. You can count on 
              Umbrella Custom Packaging to help you with your packaging needs.
            </p>
            <Button 
              onClick={() => setOpenModal(true)} 
              label={'Write a Review'} 
              className="bg-[#4440E6] text-white hover:bg-[#3730a3] px-6 py-2 rounded-md" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg  text-center transition-shadow">
              <ul className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <li key={i}>
                    <FaStar 
                      size={20} 
                      color={i < item.rating ? "#f0ad4e" : "#e4e5e9"} 
                    />
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mb-4 italic">
                {item?.review}
              </p>
              <h5 className="font-semibold text-gray-800">
                {item?.name}
              </h5>
              {item?.position && (
                <p className="text-sm text-gray-500">{item.position}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddReviews
        isModalOpen={openModal} 
        setIsModalOpen={setOpenModal} 
        onReviewAdded={fetchReviews} 
      />
    </>
  );
};

export default Reviews;