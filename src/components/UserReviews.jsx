import { Star } from "lucide-react";

function UserReviews() {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://via.placeholder.com/100",
      rating: 5,
      review:
        "This platform has been a game changer for my learning journey. The tutors are highly professional and approachable!",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://via.placeholder.com/100",
      rating: 4,
      review:
        "Great experience! The lessons are tailored to my needs, and the support team is always helpful.",
    },
    {
      id: 3,
      name: "Michael Brown",
      image: "https://via.placeholder.com/100",
      rating: 5,
      review:
        "Excellent service! Highly recommend this platform for anyone looking to enhance their skills.",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              {/* User Image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full mb-4"
              />

              {/* User Name */}
              <h3 className="text-lg font-semibold">{review.name}</h3>

              {/* User Rating */}
              <div className="flex items-center justify-center gap-1 text-yellow-500 my-3">
                {Array.from({ length: review.rating }, (_, i) => (
                  <Star key={i} size={18} />
                ))}
                {review.rating < 5 &&
                  Array.from({ length: 5 - review.rating }, (_, i) => (
                    <Star
                      key={i + review.rating}
                      size={18}
                      className="text-gray-300"
                    />
                  ))}
              </div>

              {/* User Review */}
              <p className="text-gray-600 leading-relaxed">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserReviews;
