import { useState, useEffect } from "react";

const Stats = () => {
  const [stats, setStats] = useState({
    tutorsCount: 0,
    reviewsCount: 0,
    languagesCount: 0,
    usersCount: 0,
  });

  // Mock API call (replace with actual data fetching)
  useEffect(() => {
    // Simulating an API response
    setTimeout(() => {
      setStats({
        tutorsCount: 125,
        reviewsCount: 580,
        languagesCount: 25,
        usersCount: 3000,
      });
    }, 1000); // Simulate loading delay
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tutors Count */}
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-blue-500">
            {stats.tutorsCount}
          </h3>
          <p className="mt-2 text-gray-700">Tutors</p>
        </div>

        {/* Reviews Count */}
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-green-500">
            {stats.reviewsCount}
          </h3>
          <p className="mt-2 text-gray-700">Reviews</p>
        </div>

        {/* Languages Count */}
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-purple-500">
            {stats.languagesCount}
          </h3>
          <p className="mt-2 text-gray-700">Languages</p>
        </div>

        {/* Users Count */}
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-orange-500">
            {stats.usersCount}
          </h3>
          <p className="mt-2 text-gray-700">Users</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
