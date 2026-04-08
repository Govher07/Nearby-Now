"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";

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
    time: "8:00 PM",
    category: "Music",
    latitude: 47.61,
    longitude: -122.30,
  },
  {
    id: 2,
    title: "Soccer Watch Party",
    place: "Downtown Bar",
    time: "7:30 PM",
    category: "Sports",
    latitude: 48.89,
    longitude: - 122.78,
  },
  {
    id: 3,
    title: "Open Mic Night",
    place: "River Lounge",
    time: "9:00 PM",
    category: "Social",
    latitude: 47.98,
    longitude: -122.12,
  },
  {
    id: 4,
    title: "Street Food Pop-Up",
    place: "Central Square",
    time: "6:00 PM",
    category: "Food",
    latitude: 45.89,
    longitude: -122.34,
  },
  {
    id: 5,
    title: "Drop-in party",
    place: "Juicivana",
    time: "8:00 PM",
    category: "Popular",
    latitude: 46.78,
    longitude: -122.52,
  },
];

const categories = ["All", "Popular", "Music", "Sports", "Social", "Food"];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
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
    if (selectedCategory === "All") return events;
    return events.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Nearby Now</h1>
          <h2 className="text-slate-300">Fun is a click away</h2>

          {location && (
            <p className="mt-3 text-sm text-slate-400">
              Your location: {location.latitude.toFixed(4)},{" "}
              {location.longitude.toFixed(4)}
            </p>
          )}
        </div>

        <div className="mb-6 flex gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
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

          return (
          <EventCard
          key={event.id}
          event={event}
          distance={distance}
          />
          );
          })}
        </div>
      </div>
    </main>
  );
}