import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const LanguageCategories = () => {
  const categories = [
    {
      id: 1,
      title: "English",
      logo: "🇬🇧",
      route: "english",
      color: "bg-red-100 dark:bg-red-900",
    },
    {
      id: 2,
      title: "Spanish",
      logo: "🇪🇸",
      route: "spanish",
      color: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      id: 3,
      title: "French",
      logo: "🇫🇷",
      route: "french",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: 4,
      title: "German",
      logo: "🇩🇪",
      route: "german",
      color: "bg-orange-100 dark:bg-orange-900",
    },
    {
      id: 5,
      title: "Chinese",
      logo: "🇨🇳",
      route: "chinese",
      color: "bg-red-100 dark:bg-red-900",
    },
    {
      id: 6,
      title: "Japanese",
      logo: "🇯🇵",
      route: "japanese",
      color: "bg-pink-100 dark:bg-pink-900",
    },
    {
      id: 7,
      title: "Korean",
      logo: "🇰🇷",
      route: "korean",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: 8,
      title: "Arabic",
      logo: "🇸🇦",
      route: "arabic",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      id: 9,
      title: "Hindi",
      logo: "🇮🇳",
      route: "hindi",
      color: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="py-16 px-4 xl:px-0">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Language Categories
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={`/find-tutors/${category.route}`}
                className={`flex items-center justify-between ${category.color} rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{category.logo}</span>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <ArrowRight />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageCategories;
