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
  distance?: number;
};

export default function EventCard({ event, distance }: Props) {
  return (
    <div
      className="p-4 rounded-xl bg-slate-900 border border-slate-800 
                 hover:bg-slate-800 hover:border-slate-600 
                 hover:-translate-y-1 hover:shadow-lg 
                 transition duration-200"
    >
      <p className="text-sm text-slate-400">{event.category}</p>
      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p className="text-slate-300">{event.place}</p>
      {distance && (
        <p className="text-sm text-slate-400">
           {distance.toFixed(1)} km away
        </p>
        )}
      <p className="text-sm text-slate-400">{event.time}</p>
    </div>
  );
}