import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, DollarSign, Book, Clock, User } from "lucide-react";
import { useParams } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

function TutorDetails() {
  const { details } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  // const { toast } = useToast();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_apiURL}/tutorials/${details}`
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

      await axios.post(`${import.meta.env.VITE_apiURL}/bookings`, bookingData);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <User className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );

  if (error)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-10 text-red-500 text-xl"
      >
        {error}
      </motion.p>
    );

  if (!tutor)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-10 text-xl"
      >
        Tutor not found.
      </motion.p>
    );

  return (
    <ToastProvider>
      <div className="container mx-auto py-10 px-4 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={tutor.image || "/placeholder.svg"}
                alt={tutor.name}
                className="w-full h-80 object-cover"
              />
              <Badge className="absolute top-4 right-4 text-lg px-3 py-1">
                {tutor.language}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(tutor.review)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2">({tutor.review})</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ${tutor.price}
                  </p>
                </div>
              </div>
              <p className=" mb-6">{tutor.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Book className="w-5 h-5 mr-2 text-primary" />
                  <span>{tutor.language} Tutor</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span>Flexible Schedule</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  <span>1-on-1 Lessons</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6">
              <Button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full text-lg py-6"
              >
                {bookingLoading ? "Booking..." : "Book Now"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      <Toaster />
    </ToastProvider>
  );
}

export default TutorDetails;
