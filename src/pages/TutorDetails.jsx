import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "react-router";

function TutorDetails() {
  const { details } = useParams(); // Get the tutor ID from the route params
  const { user } = useAuth(); // Get logged-in user info
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        // Replace with your API endpoint for fetching tutor details
        const response = await axios.get(
          `http://localhost:5000/tutorials/${details}`
        );
        setTutor(response.data);
      } catch (err) {
        setError("Failed to fetch tutor details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, [details]);

  const handleBooking = async () => {
    if (!user) {
      alert("You must be logged in to book a tutor.");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        tutorId: tutor._id,
        image: tutor.image,
        language: tutor.language,
        price: tutor.price,
        tutorEmail: tutor.email,
        email: user.email,
      };

      // Replace with your API endpoint for storing booking details
      await axios.post("http://localhost:5000/bookings", bookingData);

      alert("Tutor booked successfully!");
    } catch (err) {
      setBookingError("Failed to book the tutor. Please try again.");
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!tutor) return <p className="text-center mt-10">Tutor not found.</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Tutor Details</h1>
      <div className="max-w-lg mx-auto border border-gray-200 rounded-md shadow-sm p-6">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{tutor.name}</h2>
        <p className="text-gray-700 mb-1">Language: {tutor.language}</p>
        <p className="text-gray-700 mb-1">Description: {tutor.description}</p>
        <p className="text-gray-700 mb-1">Price: ${tutor.price}</p>
        <p className="text-gray-700 mb-4">Review: {tutor.review}</p>
        <Button
          onClick={handleBooking}
          disabled={bookingLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {bookingLoading ? "Booking..." : "Book"}
        </Button>
        {bookingError && <p className="text-red-500 mt-4">{bookingError}</p>}
      </div>
    </div>
  );
}

export default TutorDetails;
