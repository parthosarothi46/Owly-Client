import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function MyBookedTutors() {
  const { user } = useAuth();
  const [bookedTutors, setBookedTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookedTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_apiURL}/bookings/${user.email}`
        );
        setBookedTutors(response.data);
      } catch (error) {
        console.error("Error fetching booked tutors:", error);
        toast({
          title: "Error",
          description: "Failed to fetch booked tutors. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchBookedTutors();
  }, [user?.email, toast]);

  const handleReview = async (tutorialId) => {
    try {
      const patchResponse = await axios.patch(
        `${import.meta.env.VITE_apiURL}/tutorials/review/${tutorialId}`
      );
      const getResponse = await axios.get(
        `${import.meta.env.VITE_apiURL}/tutorials/${tutorialId}`
      );
      setBookedTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.tutorId === tutorialId
            ? { ...tutor, review: getResponse.data.review }
            : tutor
        )
      );
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (bookedTutors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <h2 className="text-2xl font-bold mb-4">No Booked Tutors</h2>
        <p className="text-gray-600">
          You haven't booked any tutors yet. Start exploring and book your first
          session!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-10"
      >
        My Booked Tutors
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {bookedTutors.map((tutor) => (
            <motion.div
              key={tutor._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={tutor.image || "/placeholder.svg"}
                    alt={tutor.language}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">
                    {tutor.language}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-2">
                    {tutor.language} Tutor
                  </h2>
                  <p className="mb-2">Price: ${tutor.price}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(tutor.review)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm">({tutor.review || 0})</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    className="flex-1 mr-2"
                    onClick={() => handleReview(tutor.tutorId)}
                  >
                    Review
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Toaster position="top-right" />
    </div>
  );
}

export default MyBookedTutors;
