import { Button } from "@/components/ui/button";

function AboutUs() {
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://i.ibb.co.com/JRtq51X/as.jpg"
              alt="About Us"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className=" text-lg mb-6 leading-relaxed">
              We are a dedicated team passionate about delivering top-notch
              services to our customers. Our mission is to make learning and
              skill development accessible, enjoyable, and impactful for
              everyone around the globe.
            </p>
            <p className=" text-lg mb-6 leading-relaxed">
              With a focus on innovation and excellence, we provide tailored
              solutions to meet your needs and help you achieve your goals.
            </p>
            <Button className=" px-6 py-3 rounded-md">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
