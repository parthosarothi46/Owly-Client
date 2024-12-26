const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="loader border-t-4 border-black dark:border-white rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
