'use client'
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewFormPopup = () => {
  // State for popup visibility, selected rating, and review content
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rating:", selectedRating);
    console.log("Review:", reviewContent);
    // You can add your submission logic here, such as sending data to an API
    setShowPopup(false); // Close the popup after submission
  };

  return (
    <div>
      {/* Button to open the popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Write a Review
      </button>

      {/* Popup modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

            {/* Rating section */}
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= selectedRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setSelectedRating(star)}
                />
              ))}
            </div>

            {/* Review content */}
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows={4}
              placeholder="Write your review here..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />

            {/* Submit and Cancel buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewFormPopup;
