import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";

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
          "https://b10a11-server-side-parthosarothi46.vercel.app/tutorials"
        );
        setTutors(response.data);
        setFilteredTutors(response.data); // Initialize filtered tutors
      } catch (err) {
        setError("Failed to fetch tutors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    // Filter tutors based on the search query
    const results = tutors.filter((tutor) =>
      tutor.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTutors(results);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchQuery, tutors]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination calculations
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <h1 className="text-2xl font-bold text-center mb-6">Find Tutors</h1>
      <div className="mb-6">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Language"
          className="w-full md:w-1/2 mx-auto block px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        ></Input>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="border border-gray-200 rounded-md shadow-sm p-4"
          >
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{tutor.name}</h2>
            <p>Language: {tutor.language}</p>
            <p>Review: {tutor.review}</p>
            <Link to={`/tutor/${tutor._id}`}>
              <Button className="mt-4 w-full">Details</Button>
            </Link>
          </div>
        ))}
      </div>
      {filteredTutors.length === 0 && (
        <p className="text-center text-gray-500">No tutors found.</p>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex flex-wrap md:flex-nowrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FindTutors;
