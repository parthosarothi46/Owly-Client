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
    return <p>Loading tutorials...</p>;
  }

  if (tutorials.length === 0) {
    return <p>No tutorials found.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">My Tutorials</h1>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Language</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Review</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutorials.map((tutorial) => (
            <tr key={tutorial._id}>
              <td className="border p-2">{tutorial.name}</td>
              <td className="border p-2">
                <img
                  src={tutorial.image}
                  alt={tutorial.language}
                  className="w-24 h-24 object-cover"
                />
              </td>
              <td className="border p-2">{tutorial.language}</td>
              <td className="border p-2">{tutorial.price}</td>
              <td className="border p-2">{tutorial.description}</td>
              <td className="border p-2">{tutorial.review}</td>
              <td className="border p-2 flex space-x-2">
                <Button onClick={() => handleUpdate(tutorial._id)}>
                  Update
                </Button>
                <Button onClick={() => handleDelete(tutorial._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTutorials;
