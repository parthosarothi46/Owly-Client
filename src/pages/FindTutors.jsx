import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

function FindTutors() {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_apiURL}/tutorials`
        );
        setTutors(response.data);
        setFilteredTutors(response.data);
      } catch (err) {
        setError("Failed to fetch tutors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    const results = tutors.filter((tutor) =>
      tutor.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTutors(results);
    setCurrentPage(1);
  }, [searchQuery, tutors]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );

  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <Search className="w-12 h-12 text-primary" />
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

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10 text-primary"
      >
        Find Your Perfect Tutor
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="relative w-full md:w-2/3 mx-auto">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Language"
            className="w-full pl-10 pr-4 py-2 border-2 border-primary/20 rounded-full shadow-sm focus:border-primary focus:ring focus:ring-primary/50 transition duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </motion.div>

      <AnimatePresence>
        {filteredTutors.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 text-xl mt-10"
          >
            No tutors found.
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentTutors.map((tutor, index) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={tutor.image || "/placeholder.svg"}
                      alt={tutor.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">
                      {tutor.language}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
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
                      <span className="ml-2 text-sm">({tutor.review})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link to={`/tutor/${tutor._id}`} passHref>
                      <Button className="w-full">Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex justify-center items-center space-x-2"
        >
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default FindTutors;
