import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const FindTutorsCategory = () => {
  const { category } = useParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tutorials");
        const filteredTutors = response.data.filter(
          (tutor) => tutor.language.toLowerCase() === category.toLowerCase()
        );
        setTutors(filteredTutors);
      } catch (err) {
        setError("Failed to fetch tutors. Please try again.");
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [category]);

  if (loading) {
    return <p className="text-center py-8">Loading tutors...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  if (tutors.length === 0) {
    return (
      <p className="text-center py-8">
        No tutors found for the category "{category}".
      </p>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Tutors for {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all"
          >
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{tutor.name}</h3>
              <p className="text-sm text-gray-600">
                Language: {tutor.language}
              </p>
              <p className="text-sm text-gray-600">Price: {tutor.price}</p>
              <p className="text-sm text-gray-600">Review: {tutor.review}</p>
              <p className="mt-2 text-gray-700">{tutor.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutorsCategory;
