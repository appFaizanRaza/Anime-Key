export default function Loading() {
  return (
    <div className="items-center h-screen w-full gap-3 flex flex-col justify-center">
      <div className="h-20 w-20 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin flex items-center justify-center">
        <img src="/icons/loading.svg" alt="Loading" className="h-10 w-10" />
      </div>

      <p className="text-gray-500 text-2xl">Loading...</p>
    </div>
  );
}