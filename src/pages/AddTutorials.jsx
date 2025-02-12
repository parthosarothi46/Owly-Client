import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddTutorials() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    image: "",
    language: "",
    price: "",
    description: "",
    review: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sanitizedData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_apiKey}/tutorials`,
        sanitizedData
      );
      console.log("Tutorial added successfully:", response.data);
      navigate("/my-tutorials");
    } catch (err) {
      console.error("Error adding tutorial:", err);
      setError("Failed to add tutorial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <h1 className="text-3xl font-bold text-center mb-8">Add Tutorial</h1>
      {error && (
        <div className="text-center mb-4">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 border border-gray-200 rounded-md shadow-sm space-y-4"
      >
        <div>
          <label htmlFor="name" className="block mb-2">
            Name :
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">
            Email :
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="image" className="block mb-2">
            Image URL :
          </label>
          <Input
            id="image"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div>
          <label htmlFor="language" className="block mb-2">
            Language :
          </label>
          <Input
            id="language"
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Enter the language"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-2">
            Price : ($)
          </label>
          <Input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter the price"
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            required
          />
        </div>

        <div>
          <label htmlFor="review" className="block mb-2">
            Review
          </label>
          <Input
            id="review"
            type="number"
            name="review"
            value={formData.review}
            readOnly
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding" : "Add Tutorial"}
        </Button>
      </form>
    </div>
  );
}

export default AddTutorials;
