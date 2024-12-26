import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md text-center">
        <img
          src="https://via.placeholder.com/300x200?text=404+Illustration"
          alt="404 Not Found"
          className="mb-8 w-full"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
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
