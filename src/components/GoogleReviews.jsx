import React, { useMemo } from "react";
import { FaStar, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

/* Google G */
const GoogleG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

/* Reviews Data */
const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent financial solution services! Their team helped me plan retirement effectively.",
    avatar: "RK",
    color: "bg-[#4285F4]",
  },
  {
    id: 2,
    name: "Priya Sharma",
    rating: 5,
    date: "1 month ago",
    text: "Returns have been consistent and the advisory is top-notch.",
    avatar: "PS",
    color: "bg-[#EA4335]",
  },
  {
    id: 3,
    name: "Amit Patel",
    rating: 5,
    date: "3 weeks ago",
    text: "Best financial advisors in Gujarat! Very knowledgeable team.",
    avatar: "AP",
    color: "bg-[#FBBC05]",
  },
  {
    id: 4,
    name: "Sneha Desai",
    rating: 5,
    date: "2 months ago",
    text: "Trustworthy and professional. They manage our family investments.",
    avatar: "SD",
    color: "bg-[#34A853]",
  },
  {
    id: 5,
    name: "Vikram Singh",
    rating: 5,
    date: "1 week ago",
    text: "Impressed with customer service and financial expertise.",
    avatar: "VS",
    color: "bg-[#4285F4]",
  },
  {
    id: 6,
    name: "Meera Joshi",
    rating: 5,
    date: "3 months ago",
    text: "Professional, reliable and client-focused portfolio advice.",
    avatar: "MJ",
    color: "bg-[#EA4335]",
  },
];

const GOOGLE_REVIEW_LINK = "https://g.page/r/CUFzgFupG-ycEAE/review";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/search?q=We+Care+Freedom+Wealth+Pvt.+Ltd.+Anand";

const GoogleReviews = () => {
  const row1 = useMemo(() => {
    const half = Math.ceil(reviews.length / 2);
    return [...reviews.slice(0, half), ...reviews.slice(0, half)];
  }, []);

  const ReviewCard = ({ review }) => (
    <div className="group relative w-[300px] sm:w-[360px] lg:w-[410px] shrink-0 rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 transition-opacity duration-500 border border-orange-400 opacity-0 rounded-3xl group-hover:opacity-100" />

      <div className="absolute top-4 right-4 opacity-10">
        <GoogleG size={40} />
      </div>

      {/* Stars */}
      <div className="relative z-10 flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>

      {/* Text */}
      <p className="relative z-10 text-sm italic leading-7 text-gray-700 mb-7 sm:text-base line-clamp-4">
        "{review.text}"
      </p>

      {/* Footer */}
      <div className="relative z-10 flex items-center pt-6 mt-auto border-t border-gray-100">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${review.color}`}
        >
          {review.avatar}
        </div>

        <div>
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-gray-900">{review.name}</h4>
            <FaCheckCircle className="text-xs text-blue-500" />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{review.date}</span>

            <div className="flex items-center gap-1">
              <GoogleG size={10} />
              <span>Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden">
      {/* Top Summary */}
      <div className="mb-14">
        <div className="relative flex flex-col items-center justify-between max-w-5xl gap-8 p-6 mx-auto overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl sm:p-8 md:flex-row">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex items-center justify-center w-20 h-20 bg-white border shadow-lg rounded-2xl">
              <GoogleG size={40} />
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="text-4xl font-extrabold text-gray-900">
                  4.7
                </span>

                <div className="flex text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-gray-200" />
                </div>
              </div>

              <h3 className="flex items-center justify-center gap-2 mt-1 text-xl font-bold text-gray-900 sm:justify-start">
                Google Business Rating
                <FaCheckCircle className="text-blue-500" />
              </h3>

              <p className="text-sm text-gray-500">
                Based on <span className="font-bold text-blue-600">373+</span>{" "}
                verified client reviews
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 sm:flex-row md:w-auto">
            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-bold text-white transition bg-blue-500 rounded-xl hover:bg-blue-600"
            >
              Write Review
            </a>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 font-bold text-gray-700 transition bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50"
            >
              View All
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Testimonials */}
      <div className="space-y-8 sm:space-y-10">
        {/* Row 1 */}
        <div className="relative py-1 overflow-hidden mask-edge">
          <div className="flex gap-6 p-5 w-max sm:gap-8 marquee">
            {row1.map((review, index) => (
              <ReviewCard key={`r1-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-14">
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-blue-600"
        >
          View all 373 reviews on Google Maps
          <FaExternalLinkAlt className="text-xs" />
        </a>

        <p className="mt-6 text-sm italic text-gray-400">
          "Transparency and trust have guided our commitment to investors since
          1990."
        </p>
      </div>
    </section>
  );
};

export default GoogleReviews;
