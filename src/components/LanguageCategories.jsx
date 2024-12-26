import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const LanguageCategories = () => {
  const categories = [
    { id: 1, title: "English", logo: "📘", route: "english" },
    { id: 2, title: "Spanish", logo: "📗", route: "spanish" },
    { id: 3, title: "French", logo: "📙", route: "french" },
    { id: 4, title: "German", logo: "📕", route: "german" },
    { id: 5, title: "Chinese", logo: "📓", route: "chinese" },
    { id: 6, title: "Japanese", logo: "📔", route: "japanese" },
    { id: 7, title: "Korean", logo: "📒", route: "korean" },
    { id: 8, title: "Arabic", logo: "📖", route: "arabic" },
    { id: 9, title: "Hindi", logo: "📘", route: "hindi" },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Language Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            to={`/find-tutors/${category.route}`}
            key={category.id}
            className="flex items-center justify-between shadow-md rounded-lg p-4 hover:shadow-lg transition-all border"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{category.logo}</span>
              <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguageCategories;
