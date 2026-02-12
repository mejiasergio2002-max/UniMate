"use client";

import { useEffect, useMemo, useState } from "react";

type Profile = {
  displayName: string;
  username: string;
  bio: string;

  university: string;
  yearLevel: string;
  timezone: string;

  interests: string[];
  weeklyGoalHours: number;

  notifyTips: boolean;
  notifyComments: boolean;
  notifyNewTutors: boolean;
};

const STORAGE_KEY = "unimate_profile_v1";

const DEFAULT_PROFILE: Profile = {
  displayName: "Sergio",
  username: "student01",
  bio: "Here to learn fast. I like simple explanations and real examples.",

  university: "University of the Philippines (sample)",
  yearLevel: "1st Year",
  timezone: "Asia/Manila",

  interests: ["Math", "English"],
  weeklyGoalHours: 6,

  notifyTips: true,
  notifyComments: true,
  notifyNewTutors: false,
};

const SUBJECTS = ["Math", "English", "Science", "Programming", "History", "Business"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        // ignore broken storage
      }
    }
  }, []);

  const initials = useMemo(() => {
    const parts = profile.displayName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    const a = parts[0]?.[0] ?? "U";
    const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
    return (a + b).toUpperCase();
  }, [profile.displayName]);

  function toggleInterest(subject: string) {
    setProfile((p) => {
      const exists = p.interests.includes(subject);
      const interests = exists ? p.interests.filter((x) => x !== subject) : [...p.interests, subject];
      return { ...p, interests };
    });
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSavedMsg("Saved.");
    setTimeout(() => setSavedMsg(null), 1200);
  }

  function reset() {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    setSavedMsg("Reset.");
    setTimeout(() => setSavedMsg(null), 1200);
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold">My Account</div>
            <div className="text-white/60 text-sm">Profile settings (saved locally for now)</div>
          </div>

          <div className="flex items-center gap-2">
            {savedMsg && <div className="text-xs text-white/70 px-3 py-2 rounded-xl bg-white/5 border border-white/10">{savedMsg}</div>}
            <a className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5" href="/feed">
              Back to Feed
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-6">
        {/* LEFT: PROFILE CARD */}
        <div className="lg:col-span-4">
          <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-violet-600 grid place-items-center text-2xl font-extrabold">
                {initials}
              </div>
              <div>
                <div className="text-xl font-extrabold">{profile.displayName || "Your Name"}</div>
                <div className="text-white/60 text-sm">@{profile.username || "username"}</div>
              </div>
            </div>

            <div className="mt-5 text-sm text-white/70">
              {profile.bio || "Add a short bio so tutors know your learning style."}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/60">University</span>
                <span className="text-white/90">{profile.university || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Year</span>
                <span className="text-white/90">{profile.yearLevel || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Timezone</span>
                <span className="text-white/90">{profile.timezone || "—"}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={save} className="flex-1 px-4 py-3 rounded-xl bg-violet-600 font-semibold">
                Save
              </button>
              <button onClick={reset} className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold">
                Reset
              </button>
            </div>

            <div className="mt-3 text-xs text-white/50">
              Next step: connect this to Register/Login + database.
            </div>
          </div>
        </div>

        {/* RIGHT: EDIT FORM */}
        <div className="lg:col-span-8">
          <div className="border border-white/10 rounded-3xl p-6 bg-white/5">
            <div className="text-xl font-extrabold">Profile Details</div>
            <div className="text-sm text-white/60 mt-1">Keep it simple and clear.</div>

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Display name</label>
                <input
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
                  value={profile.displayName}
                  onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
                  placeholder="e.g. Sergio Mejia"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Username</label>
                <input
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
                  value={profile.username}
                  onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))}
                  placeholder="e.g. sergio.study"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white/70">Bio</label>
                <textarea
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10 min-h-[100px]"
                  value={profile.bio}
                  onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                  placeholder="How do you like to learn?"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">University</label>
                <input
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
                  value={profile.university}
                  onChange={(e) => setProfile((p) => ({ ...p, university: e.target.value }))}
                  placeholder="e.g. MSU-IIT"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Year level</label>
                <select
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
                  value={profile.yearLevel}
                  onChange={(e) => setProfile((p) => ({ ...p, yearLevel: e.target.value }))}
                >
                  {["SHS", "1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-white/70">Timezone</label>
                <input
                  className="mt-2 w-full p-3 rounded-xl bg-black/30 border border-white/10"
                  value={profile.timezone}
                  onChange={(e) => setProfile((p) => ({ ...p, timezone: e.target.value }))}
                  placeholder="Asia/Manila"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Weekly study goal (hours)</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={profile.weeklyGoalHours}
                    onChange={(e) => setProfile((p) => ({ ...p, weeklyGoalHours: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="w-12 text-right font-semibold">{profile.weeklyGoalHours}</div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-lg font-extrabold">Interests</div>
              <div className="text-sm text-white/60 mt-1">What subjects do you want to see more of?</div>

              <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SUBJECTS.map((s) => {
                  const checked = profile.interests.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleInterest(s)}
                      className={`text-left border rounded-2xl p-4 transition ${
                        checked ? "border-violet-500 bg-violet-600/20" : "border-white/10 bg-black/20 hover:bg-black/30"
                      }`}
                    >
                      <div className="font-semibold">{s}</div>
                      <div className="text-xs text-white/60 mt-1">{checked ? "Selected" : "Tap to select"}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notifications */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-lg font-extrabold">Notifications</div>
              <div className="text-sm text-white/60 mt-1">MVP toggles (local only)</div>

              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <label className="border border-white/10 rounded-2xl p-4 bg-black/20 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notifyTips}
                    onChange={(e) => setProfile((p) => ({ ...p, notifyTips: e.target.checked }))}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">Tips</div>
                    <div className="text-xs text-white/60">Notify me when I receive tips.</div>
                  </div>
                </label>

                <label className="border border-white/10 rounded-2xl p-4 bg-black/20 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notifyComments}
                    onChange={(e) => setProfile((p) => ({ ...p, notifyComments: e.target.checked }))}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">Comments</div>
                    <div className="text-xs text-white/60">Notify me when someone comments.</div>
                  </div>
                </label>

                <label className="border border-white/10 rounded-2xl p-4 bg-black/20 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notifyNewTutors}
                    onChange={(e) => setProfile((p) => ({ ...p, notifyNewTutors: e.target.checked }))}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">New Tutors</div>
                    <div className="text-xs text-white/60">Notify me when new tutors join.</div>
                  </div>
                </label>
              </div>

              <div className="mt-6 flex gap-2">
                <button onClick={save} className="px-4 py-3 rounded-xl bg-violet-600 font-semibold">
                  Save changes
                </button>
                <button onClick={reset} className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-semibold">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
