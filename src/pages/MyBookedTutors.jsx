import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";

function MyBookedTutors() {
  const { user } = useAuth();
  const [bookedTutors, setBookedTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch booked tutors
  useEffect(() => {
    const fetchBookedTutors = async () => {
      try {
        const response = await axios.get(
          `https://b10a11-server-side-parthosarothi46.vercel.app/bookings/${user.email}`
        );
        setBookedTutors(response.data);
      } catch (error) {
        console.error("Error fetching booked tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchBookedTutors();
  }, [user?.email]);

  // Handle review increment
  const handleReview = async (tutorialId) => {
    try {
      // Increment review count on the backend
      const patchResponse = await axios.patch(
        `https://b10a11-server-side-parthosarothi46.vercel.app/tutorials/review/${tutorialId}`
      );

      // Fetch the updated tutorial details
      const getResponse = await axios.get(
        `https://b10a11-server-side-parthosarothi46.vercel.app/tutorials/${tutorialId}`
      );

      // Update the state with the new review count
      setBookedTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.tutorId === tutorialId
            ? { ...tutor, review: getResponse.data.review }
            : tutor
        )
      );
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  if (loading) {
    return <p>Loading booked tutors...</p>;
  }

  if (bookedTutors.length === 0) {
    return <p>No booked tutors found.</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <h1 className="text-2xl font-bold text-center mb-6">My Booked Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="p-4 border border-gray-200 rounded-md shadow-sm"
          >
            <img
              src={tutor.image}
              alt={tutor.language}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{tutor.language}</h2>
            <p className="text-gray-600">Price: ${tutor.price}</p>
            <p className="text-gray-600">Reviews: {tutor.review || 0}</p>
            <Button
              className="mt-4 w-full"
              onClick={() => handleReview(tutor.tutorId)}
            >
              Review
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookedTutors;
