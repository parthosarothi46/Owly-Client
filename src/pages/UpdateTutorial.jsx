import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";

function UpdateTutorial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    image: "",
    language: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/tutorials/${id}`
        );
        setTutorial(response.data);
        setFormData({
          image: response.data.image,
          language: response.data.language,
          price: response.data.price,
          description: response.data.description,
        });
      } catch (error) {
        console.error("Error fetching tutorial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tutorials/${id}`, formData);
      navigate("/my-tutorials"); // Redirect after updating
    } catch (error) {
      console.error("Error updating tutorial:", error);
    }
  };

  if (loading) return <p>Loading tutorial...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Update Tutorial</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 border rounded-md"
      >
        <div>
          <label className="block mb-2">Name (Read-only)</label>
          <Input type="text" value={tutorial.name} readOnly />
        </div>
        <div>
          <label className="block mb-2">Email (Read-only)</label>
          <Input type="email" value={tutorial.email} readOnly />
        </div>
        <div>
          <label className="block mb-2">Image</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2">Language</label>
          <Input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTutorial;
