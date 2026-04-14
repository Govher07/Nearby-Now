type EventItem = {
  id: number;
  title: string;
  place: string;
  time: string;
  category: string;
  latitude: number;
  longitude: number;
};

type Props = {
  event: EventItem;
  distance?: number | null;
  isLive?: boolean;
};

export default function EventCard({ event, distance, isLive }: Props) {
  return (
    <div
      className="p-4 rounded-xl bg-slate-900 border border-slate-800 
                 hover:bg-slate-800 hover:border-slate-600 
                 hover:-translate-y-1 hover:shadow-lg 
                 transition duration-200"
    >
      <div className="mb-1 flex items-center gap-2">
        <p className="text-sm text-slate-400">{event.category}</p>

        {isLive && (
          <span className="rounded bg-green-500 px-2 py-1 text-xs text-black">
            Happening Now
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p className="text-slate-300">{event.place}</p>

      <p className="text-sm text-slate-400">
        {new Date(event.time).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>

      {distance != null && (
        <p className="text-sm text-slate-400">{distance.toFixed(1)} km away</p>
      )}
    </div>
  );
}