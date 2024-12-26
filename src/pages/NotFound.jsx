import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import notFound from "../assets/404.json";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md text-center">
        <Lottie animationData={notFound}></Lottie>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          variant="default"
          size="lg"
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
