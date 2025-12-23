import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import { updatePassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import useTheme from "../../../hooks/useTheme";

const Profile = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [role, isRoleLoading] = useRole();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      const auth = getAuth();

      // Update password
      await updatePassword(auth.currentUser, newPassword);

      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please use a stronger password");
      } else if (error.code === "auth/requires-recent-login") {
        toast.error("Please log in again before changing your password");
      } else {
        toast.error("Failed to change password. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(role, isRoleLoading);

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div
        className={`shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-purple-500 rounded-full">
            {role}
          </p>
          <p
            className={`mt-2 text-xl font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div
              className={`flex flex-wrap items-center justify-between text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p className="flex flex-col">
                Name
                <span
                  className={`font-bold ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span
                  className={`font-bold ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {user?.email}
                </span>
              </p>

              <div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="bg-purple-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-purple-600 transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-96 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Change Password
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter current password"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  disabled={isLoading}
                  className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
