"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import {getDistance, isHappeningNow} from "../utils/eventUtils";

type EventItem = {
  id: number;
  title: string;
  place: string;
  time: string;
  category: string;
  latitude: number;
  longitude: number;
};

const events: EventItem[] = [
  {
    id: 1,
    title: "Live Jazz Night",
    place: "Blue Cafe",
    time: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
    category: "Music",
    latitude: 46.61,
    longitude: -122.30,
  },
  {
    id: 2,
    title: "Soccer Watch Party",
    place: "Downtown Bar",
    time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    category: "Sports",
    latitude: 46.89,
    longitude: -122.78,
  },
  {
    id: 3,
    title: "Open Mic Night",
    place: "River Lounge",
    time: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
    category: "Social",
    latitude: 46.98,
    longitude: -122.12,
  },
  {
    id: 4,
    title: "Street Food Pop-Up",
    place: "Central Square",
    time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    category: "Food",
    latitude: 45.89,
    longitude: -122.34,
  },
  {
    id: 5,
    title: "Drop-in party",
    place: "Juicivana",
    time: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    category: "Popular",
    latitude: 46.78,
    longitude: -122.52,
  },
];

const categories = ["All", "Popular", "Music", "Sports", "Social", "Food"];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hasMounted, setHasMounted] = useState(false);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    setHasMounted(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const filteredEvents = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? events
        : events.filter((event) => event.category === selectedCategory);

    if (!location) return filtered;

    return [...filtered].sort((a, b) => {
      const distA = getDistance(
        location.latitude,
        location.longitude,
        a.latitude,
        a.longitude
      );

      const distB = getDistance(
        location.latitude,
        location.longitude,
        b.latitude,
        b.longitude
      );

      return distA - distB;
    });
  }, [selectedCategory, location]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Nearby Now</h1>
          <h2 className="text-slate-300">Fun is a click away</h2>

          {location && (
            <p className="mt-3 text-sm text-slate-400">
              Your location: {location.latitude.toFixed(4)},{" "}
              {location.longitude.toFixed(4)}
            </p>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-slate-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const distance =
              location &&
              getDistance(
                location.latitude,
                location.longitude,
                event.latitude,
                event.longitude
              );

              const isLive = hasMounted ? isHappeningNow(event.time) : false;

            return (
              <EventCard
                key={event.id}
                event={event}
                distance={distance}
                isLive={isLive}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}