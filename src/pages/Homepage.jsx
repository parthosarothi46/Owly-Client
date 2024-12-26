import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import LanguageCategories from "@/components/LanguageCategories";
import Newsletter from "@/components/Newsletter";
import Stats from "@/components/Stats";
import UserReviews from "@/components/UserReviews";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <Stats />
      <LanguageCategories />
      <AboutUs />
      <UserReviews />
      <Newsletter />
    </div>
  );
};

export default Homepage;
