import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

function AddTutorials() {
  const { user } = useAuth();

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
        price: Number.parseFloat(formData.price),
      };

      await axios.post(
        `${import.meta.env.VITE_apiURL}/tutorials`,
        sanitizedData
      );

      toast.success("Tutorial added successfully! 🎉");

      setFormData({
        name: user?.displayName || "",
        email: user?.email || "",
        image: "",
        language: "",
        price: "",
        description: "",
        review: 0,
      });
    } catch (err) {
      console.error("Error adding tutorial:", err);
      toast.error("Failed to add tutorial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: "name", label: "Name", type: "text", readOnly: true },
    { name: "email", label: "Email", type: "email", readOnly: true },
    {
      name: "image",
      label: "Image URL",
      type: "url",
      placeholder: "Enter the image URL",
    },
    {
      name: "language",
      label: "Language",
      type: "text",
      placeholder: "Enter the language",
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      placeholder: "Enter the price",
      min: "0",
    },
    { name: "review", label: "Review", type: "number", readOnly: true },
  ];

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Add Tutorial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={!field.readOnly}
                    readOnly={field.readOnly}
                    min={field.min}
                    className={field.readOnly ? "bg-gray-100" : ""}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a description"
                  required
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Tutorial
                  </>
                ) : (
                  "Add Tutorial"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddTutorials;
