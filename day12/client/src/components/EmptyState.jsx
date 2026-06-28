export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="text-center py-8 text-gray-500">
      {Icon && <Icon className="w-12 h-12 mx-auto text-gray-300 mb-2" />}
      <p className="text-sm">{title}</p>
      <p className="text-xs">{message}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}