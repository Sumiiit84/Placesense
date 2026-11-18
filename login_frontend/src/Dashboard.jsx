import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, LogOut, GraduationCap, ShieldCheck, Building2 } from "lucide-react";

const roleIcon = {
  student: GraduationCap,
  admin: ShieldCheck,
  company: Building2,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("placesense_user");
    if (!stored) {
      navigate("/login", { replace: true });
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("placesense_token");
    sessionStorage.removeItem("placesense_token");
    sessionStorage.removeItem("placesense_user");
    navigate("/login", { replace: true });
  }

  if (!user) return null;

  const RoleIcon = roleIcon[user.role] ?? GraduationCap;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl shadow-indigo-100 text-center">

        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <BrainCircuit size={34} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">Welcome back! 🎉</h1>
        <p className="mt-2 text-sm text-slate-500">You are signed in to PlaceSense</p>

        <div className="mt-8 flex items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <RoleIcon size={26} />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Signed in as</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900 capitalize">{user.role}</p>
            <p className="text-sm text-slate-500">{user.email ?? user.full_name ?? ""}</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Your dashboard is coming soon. This page confirms your login is working correctly.
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </main>
  );
}
