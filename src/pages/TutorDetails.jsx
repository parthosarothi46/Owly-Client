import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "react-router";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function TutorDetails() {
  const { details } = useParams(); // Get the tutor ID from the route params
  const { user } = useAuth(); // Get logged-in user info
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axios.get(
          `https://b10a11-server-side-parthosarothi46.vercel.app/tutorials/${details}`
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
      toast({
        title: "Booking Failed",
        description: "You must be logged in to book a tutor.",
        variant: "destructive",
      });
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

      await axios.post(`${import.meta.env.VITE_apiKey}/bookings`, bookingData);

      toast({
        title: "Booking Successful",
        description: `You have successfully booked ${tutor.name}.`,
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: "Failed to book the tutor. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!tutor) return <p className="text-center mt-10">Tutor not found.</p>;

  return (
    <ToastProvider>
      <div className="container mx-auto py-10">
        <div className="relative max-w-lg mx-auto">
          {/* Toasts will appear relative to this div */}
          <h1 className="text-2xl font-bold text-center mb-6">Tutor Details</h1>
          <div className="border border-gray-200 rounded-md shadow-sm p-6">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{tutor.name}</h2>
            <p className="mb-1">Language: {tutor.language}</p>
            <p className="mb-1">Description: {tutor.description}</p>
            <p className="mb-1">Price: ${tutor.price}</p>
            <p className="mb-4">Review: {tutor.review}</p>
            <Button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full"
            >
              {bookingLoading ? "Booking" : "Book"}
            </Button>
          </div>

          {/* Toast Viewport positioned at the top-right of this container */}
          <ToastViewport className="absolute top-0 right-0 flex flex-col items-end space-y-2" />
        </div>
      </div>
      <Toaster />
    </ToastProvider>
  );
}

export default TutorDetails;
