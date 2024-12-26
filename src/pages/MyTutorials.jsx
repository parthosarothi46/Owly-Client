import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function MyTutorials() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/tutorials/user/${user.email}`,
          {
            withCredentials: true,
          }
        );
        setTutorials(response.data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchTutorials();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tutorials/${id}`);
      setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
    } catch (error) {
      console.error("Error deleting tutorial:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-tutorial/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading tutorials...</p>
      </div>
    );
  }

  if (tutorials.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No tutorials found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Tutorials</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium">Image</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Language
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">Price</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Description
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Review
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tutorials.map((tutorial, index) => (
              <tr
                key={tutorial._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-4 text-gray-700">{tutorial.name}</td>
                <td className="py-3 px-4">
                  <img
                    src={tutorial.image}
                    alt={tutorial.language}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                </td>
                <td className="py-3 px-4 text-gray-700">{tutorial.language}</td>
                <td className="py-3 px-4 text-gray-700">${tutorial.price}</td>
                <td className="py-3 px-4 text-gray-600">
                  {tutorial.description}
                </td>
                <td className="py-3 px-4 text-gray-600">{tutorial.review}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <Button
                    onClick={() => handleUpdate(tutorial._id)}
                    variant="default"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(tutorial._id)}
                    variant="default"
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyTutorials;
