export function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.picture}
          alt={user.displayName}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Account Information
        </h3>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Authentication Provider:</span>{" "}
            {user.provider || "Google"}
          </p>
          {user.googleId && (
            <p className="text-gray-600">
              <span className="font-medium">Google ID:</span> {user.googleId}
            </p>
          )}
          {user.githubId && (
            <p className="text-gray-600">
              <span className="font-medium">GitHub ID:</span> {user.githubId}
            </p>
          )}
          {user.linkedinId && (
            <p className="text-gray-600">
              <span className="font-medium">LinkedIn ID:</span> {user.linkedinId}
            </p>
          )}
          {user.twitterId && (
            <p className="text-gray-600">
              <span className="font-medium">Twitter ID:</span> {user.twitterId}
            </p>
          )}
          {user.facebookId && (
            <p className="text-gray-600">
              <span className="font-medium">Facebook ID:</span> {user.facebookId}
            </p>
          )}
          <p className="text-gray-600">
            <span className="font-medium">User Since:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
