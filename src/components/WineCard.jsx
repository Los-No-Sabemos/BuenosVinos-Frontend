export default function WineCard({ wine }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold">{wine.name} ({wine.year})</h2>
      <p><strong>Rating:</strong> {wine.rating}/5</p>
      <p className="italic text-gray-600">{wine.notes}</p>
    </div>
  );
}