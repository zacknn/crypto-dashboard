// app/ui/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}