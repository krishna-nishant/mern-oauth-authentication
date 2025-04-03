import { useState, useEffect } from "react";
import { Music, RefreshCw } from "lucide-react";
import { API_URL } from "../utils/constants";

export function SpotifyLikedSongs({ user }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch liked songs on component mount
  useEffect(() => {
    if (user?.provider === "spotify") {
      fetchLikedSongs();
    }
  }, [user]);

  // Fetch liked songs from the API
  const fetchLikedSongs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/spotify/liked-songs`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch liked songs");
      }

      const data = await response.json();
      setLikedSongs(data.tracks || []);
    } catch (err) {
      console.error("Error fetching liked songs:", err);
      setError("Failed to load your Spotify liked songs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format milliseconds to mm:ss
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // If user didn't login with Spotify
  if (user?.provider !== "spotify") {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <Music className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Spotify Integration Not Available
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          To view your liked songs, please log in with your Spotify account.
        </p>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="animate-spin mr-2">
          <RefreshCw className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Loading your Spotify liked songs...
        </p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchLikedSongs}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <Music className="h-5 w-5 mr-2 text-green-500" />
          Your Spotify Liked Songs
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Showing the most recent {likedSongs.length} songs you've liked on
          Spotify.
        </p>
      </div>

      {/* Song List */}
      <div className="overflow-y-auto max-h-96">
        {likedSongs.length === 0 ? (
          <p className="text-center p-6 text-gray-500 dark:text-gray-400">
            You haven't liked any songs on Spotify yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {likedSongs.map((track) => (
              <li
                key={track.id}
                className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 h-12 w-12 mr-4">
                  {track.albumArt ? (
                    <img
                      src={track.albumArt}
                      alt={track.album}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <Music className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {track.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {track.artist}
                  </p>
                </div>

                <div className="ml-4 flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDuration(track.duration)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
