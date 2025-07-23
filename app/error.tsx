'use client';

export default function Error({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div>
        <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
        <p className="text-gray-500 mt-2">Try refreshing the page or come back later.</p>
      </div>
    </div>
  );
}
