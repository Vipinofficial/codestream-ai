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

interface RecruiterProfile {
  profilePicture?: string;
  name: string;
  designation: "HR" | "Recruiter" | "Talent Partner";
  companyName: string;
  email: string;
  phoneNumber: string;
  status: "Active" | "Restricted";
  recruiterId: string;
}

const RecruiterProfile: React.FC = () => {
  const { showToast } = useToast();
  const { currentUser} = useAuth();
  console.log("currentuserinprofile",currentUser)
  const recruiterId = currentUser.recruiterId;
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await recruiterApi.getProfile(recruiterId);
      setProfile(res);
    } catch {
      showToast("Failed to load profile", "error");
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      await recruiterApi.updateProfile(recruiterId, profile);
      fetchProfile();
      showToast("Profile updated successfully", "success");
      setIsEditing(false);
    } catch {
      showToast("Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Recruiter Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your professional information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-500"
          >
            <Edit3 size={14} />
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-500"
            >
              <Save size={14} />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-widest"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* PROFILE CARD */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-10 backdrop-blur-xl shadow-2xl">
        <div className="flex gap-10 items-start">
          {/* AVATAR */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 text-3xl font-black">
              {profile?.name?.charAt(0)}
            </div>

            <span
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                profile.status === "Active"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {profile.status}
            </span>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            <ProfileField
              label="Full Name"
              icon={User}
              value={profile.name}
              editable={isEditing}
              onChange={(v) => setProfile({ ...profile, name: v })}
            />

            <ProfileField
              label="Designation"
              icon={ShieldCheck}
              value={profile.designation}
              editable={isEditing}
              select
              options={["HR", "Recruiter", "Talent Partner"]}
              onChange={(v) =>
                setProfile({ ...profile, designation: v as any })
              }
            />

            <ProfileField
              label="Company"
              icon={Building2}
              value={profile.companyName}
              editable={isEditing}
              onChange={(v) => setProfile({ ...profile, companyName: v })}
            />

            <ProfileField
              label="Email"
              icon={Mail}
              value={profile.email}
              disabled
            />

            <ProfileField
              label="Phone"
              icon={Phone}
              value={profile.phoneNumber}
              editable={isEditing}
              onChange={(v) => setProfile({ ...profile, phoneNumber: v })}
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

/* ---------------------------------- */
/* Reusable Field Component            */
/* ---------------------------------- */

interface FieldProps {
  label: string;
  icon: any;
  value: string;
  editable?: boolean;
  disabled?: boolean;
  select?: boolean;
  options?: string[];
  onChange?: (v: string) => void;
}

const ProfileField: React.FC<FieldProps> = ({
  label,
  icon: Icon,
  value,
  editable,
  disabled,
  select,
  options,
  onChange,
}) => {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <div className="mt-2 relative">
        <Icon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        {editable && !disabled ? (
          select ? (
            <select
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            >
              {options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          )
        ) : (
          <div className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            {value}
          </div>
        )}
      </div>
    </div>
  );
};
