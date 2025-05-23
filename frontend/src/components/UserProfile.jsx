import { Mail, Calendar, Shield } from "lucide-react";
import { SpotifyLikedSongs } from "./SpotifyLikedSongs";

export function UserProfile({ user }) {
  if (!user) return null;

  // Format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get the proper provider ID based on the user's provider
  const getProviderAccount = () => {
    if (user.googleId) return { name: "Google ID", value: user.googleId };
    if (user.githubId) return { name: "GitHub ID", value: user.githubId };
    if (user.linkedinId) return { name: "LinkedIn ID", value: user.linkedinId };
    if (user.twitterId) return { name: "Twitter ID", value: user.twitterId };
    if (user.facebookId) return { name: "Facebook ID", value: user.facebookId };
    if (user.spotifyId) return { name: "Spotify ID", value: user.spotifyId };
    return { name: "Provider ID", value: "Not available" };
  };

  const providerAccount = getProviderAccount();

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800"></div>
        <div className="px-6 py-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 -mt-16 mb-6">
            <img
              src={user.picture || "/placeholder.svg?height=200&width=200"}
              alt={user.displayName || "User"}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md object-cover"
            />
            <div className="text-center sm:text-left mt-4 sm:mt-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {user.displayName || "Anonymous User"}
              </h2>
              {user.email && (
                <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.email && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                    Email
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {user.email}
                  </span>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  Authentication Provider
                </span>
                <span className="text-gray-800 dark:text-gray-200 capitalize">
                  {user.provider || "Unknown"}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  {providerAccount.name}
                </span>
                <span className="text-gray-800 dark:text-gray-200 text-sm font-mono">
                  {providerAccount.value}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  User Since
                </span>
                <span className="text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spotify Liked Songs - only shown for Spotify logins */}
      {user.provider === "spotify" && <SpotifyLikedSongs user={user} />}
    </div>
  );
}
