import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Star, Globe, UserCheck } from "lucide-react";

const Stats = () => {
  const [stats, setStats] = useState({
    tutorsCount: 0,
    reviewsCount: 0,
    languagesCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    const targetStats = {
      tutorsCount: 125,
      reviewsCount: 580,
      languagesCount: 25,
      usersCount: 3000,
    };

    const interval = setInterval(() => {
      setStats((prevStats) => {
        const newStats = { ...prevStats };
        let allReached = true;

        for (const key in targetStats) {
          if (newStats[key] < targetStats[key]) {
            newStats[key] += Math.ceil((targetStats[key] - newStats[key]) / 10);
            allReached = false;
          }
        }

        if (allReached) {
          clearInterval(interval);
        }

        return newStats;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    { label: "Tutors", value: stats.tutorsCount, icon: Users, color: "blue" },
    {
      label: "Reviews",
      value: stats.reviewsCount,
      icon: Star,
      color: "yellow",
    },
    {
      label: "Languages",
      value: stats.languagesCount,
      icon: Globe,
      color: "green",
    },
    {
      label: "Users",
      value: stats.usersCount,
      icon: UserCheck,
      color: "purple",
    },
  ];

  return (
    <div className="py-16 px-4 xl:px-0">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 border"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-full ${
                    item.color === "blue"
                      ? "bg-blue-100"
                      : item.color === "yellow"
                      ? "bg-yellow-100"
                      : item.color === "green"
                      ? "bg-green-100"
                      : "bg-purple-100"
                  } dark:bg-${item.color}-900`}
                >
                  <item.icon
                    className={`w-6 h-6 text-${item.color}-500 dark:text-${item.color}-400`}
                  />
                </div>
                <h3
                  className={`text-3xl font-bold text-${item.color}-500 dark:text-${item.color}-400`}
                >
                  {item.value.toLocaleString()}
                </h3>
              </div>
              <p className="font-medium">{item.label}</p>
              <div className="mt-4 h-2 rounded-full">
                <motion.div
                  className={`h-full ${
                    item.color === "blue"
                      ? "bg-blue-500"
                      : item.color === "yellow"
                      ? "bg-yellow-500"
                      : item.color === "green"
                      ? "bg-green-500"
                      : "bg-purple-500"
                  } rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
