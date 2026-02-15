import React, { useState, useEffect } from "react";
import { User } from "@/types";
import {
  User as UserIcon,
  Save,
  Trash2,
  Camera,
  CheckCircle2,
  LogOut,
  AlertTriangle,
} from "lucide-react";

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState<User>(user);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "done">(
    "idle"
  );
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  // ✅ Sync form when user prop updates
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = () => {
    setSaveStatus("saving");

    setTimeout(() => {
      onUpdate(formData);
      setSaveStatus("done");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 800);
  };

  const handleDeactivate = () => {
    onLogout?.();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Account Settings
        </h2>

        <div className="flex gap-4">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border
            border-slate-300 dark:border-slate-700
            bg-white dark:bg-slate-900
            text-slate-600 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <LogOut size={16} /> Logout
          </button>

          <button
            onClick={handleSave}
            disabled={saveStatus !== "idle"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              saveStatus === "done"
                ? "bg-green-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "done"
              ? (
                <>
                  <CheckCircle2 size={16} /> Saved
                </>
              )
              : (
                <>
                  <Save size={16} /> Save Changes
                </>
              )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-xl bg-indigo-600 flex items-center justify-center text-2xl font-semibold text-white">
                {formData?.name?.charAt(0) || "U"}
              </div>

              <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-indigo-600 transition">
                <Camera size={14} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {formData?.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {formData?.role}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <UserIcon size={18} className="text-indigo-500" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData?.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData?.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-2">
                Professional Bio
              </label>

              <textarea
                rows={4}
                value={formData?.bio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
              <Trash2 size={18} />
              Danger Zone
            </h3>

            {!showDeactivateConfirm ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Deactivate Account
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This action cannot be undone.
                  </p>
                </div>

                <button
                  onClick={() => setShowDeactivateConfirm(true)}
                  className="px-4 py-2 text-sm border border-red-400 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Deactivate
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                  <AlertTriangle size={16} />
                  <p className="text-sm">
                    Are you sure? This will permanently remove your account.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeactivateConfirm(false)}
                    className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDeactivate}
                    className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm"
                  >
                    Yes, Deactivate
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;