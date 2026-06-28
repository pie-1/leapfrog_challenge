export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-rose-600">{message}</div>
    </div>
  );
}