import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Building2,
  User,
  ShieldCheck,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { recruiterApi } from "@/services/api/recruiter.api";
import { useAuth } from "@/context/useAuth";

/* ---------------- API STRUCTURE ---------------- */
interface RecruiterProfile {
  _id: string;
  recruiterId: string;
  status: "ACTIVE" | "RESTRICTED";
  user: {
    _id: string;
    name: string;
    email: string;
    role: "RECRUITER" | "HR" | "TALENT_PARTNER";
  };
}

const RecruiterProfile: React.FC = () => {
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const recruiterId = currentUser?.recruiterId;

  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [originalProfile, setOriginalProfile] =
    useState<RecruiterProfile | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    if (recruiterId) fetchProfile();
  }, [recruiterId]);

  const fetchProfile = async () => {
    try {
      const res = await recruiterApi.getProfile(recruiterId);
      setProfile(res);
      setOriginalProfile(res);
    } catch {
      showToast("Failed to load profile", "error");
    }
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      await recruiterApi.updateProfile(recruiterId, {...profile.user});
      showToast("Profile updated successfully", "success");
      setIsEditing(false);
      fetchProfile();
    } catch {
      showToast("Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
        Loading profile…
      </div>
    );
  }

  /* ---------------- ROLE COLORS ---------------- */
  const roleColors: Record<string, string> = {
    RECRUITER:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    HR: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    TALENT_PARTNER:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };

  const statusColors: Record<string, string> = {
    ACTIVE:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    RESTRICTED:
      "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Recruiter Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage your professional information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold transition"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10">
          {/* AVATAR */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-3xl font-bold">
              {profile.user.name?.charAt(0) || "R"}
            </div>

            <span
              className={`text-xs font-semibold px-4 py-1 rounded-full ${statusColors[profile.status]}`}
            >
              {profile.status}
            </span>

            <span
              className={`text-xs font-semibold px-4 py-1 rounded-full ${roleColors[profile.user.role]}`}
            >
              {profile.user.role}
            </span>
          </div>

          {/* FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <ProfileField
              label="Full Name"
              icon={User}
              value={profile.user.name}
              editable={isEditing}
              onChange={(v) =>
                setProfile({
                  ...profile,
                  user: { ...profile.user, name: v },
                })
              }
            />

            <ProfileField
              label="Email"
              icon={Mail}
              value={profile.user.email}
              disabled
            />

            <ProfileField
              label="Recruiter ID"
              icon={ShieldCheck}
              value={profile.recruiterId}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

/* ---------------- FIELD COMPONENT ---------------- */

interface FieldProps {
  label: string;
  icon: any;
  value: string;
  editable?: boolean;
  disabled?: boolean;
  onChange?: (v: string) => void;
}

const ProfileField: React.FC<FieldProps> = ({
  label,
  icon: Icon,
  value,
  editable,
  disabled,
  onChange,
}) => {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </label>

      <div className="mt-2 relative">
        <Icon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        {editable && !disabled ? (
          <input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-indigo-500 outline-none transition"
          />
        ) : (
          <div className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            {value || "-"}
          </div>
        )}
      </div>
    </div>
  );
};