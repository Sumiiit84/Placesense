import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

const roles = [
  { name: "Student", Icon: GraduationCap },
  { name: "Admin", Icon: ShieldCheck },
  { name: "Company", Icon: Building2 },
];

export default function Register() {
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setMessage(
      "Registration form validated! Backend integration is required to create your account."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:min-h-[700px] lg:grid-cols-2">

        {/* Left branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-800 p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-20 top-24 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <BrainCircuit size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PlaceSense</h1>
              <p className="text-xs text-indigo-200">
                Smarter Placements. Brighter Futures.
              </p>
            </div>
          </div>

          <div className="relative z-10 my-10 max-w-md">
            <p className="mb-4 text-sm font-semibold text-violet-300">
              JOIN THE PLACESENSE COMMUNITY
            </p>
            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
              Your future starts with{" "}
              <span className="text-violet-300">one account.</span>
            </h2>
            <p className="mt-5 leading-7 text-indigo-100/80">
              Create your account to explore placement opportunities,
              discover skill gaps, and prepare for your dream career.
            </p>

            <div className="mt-10 space-y-6">
              {[
                "Discover relevant placement drives",
                "Understand your resume and skill gaps",
                "Build your career readiness",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-2">
                    <ArrowRight size={18} className="text-violet-300" />
                  </div>
                  <p className="text-sm text-indigo-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-indigo-200/70">
            © 2026 PlaceSense
          </p>
        </section>

        {/* Registration form */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="rounded-xl bg-indigo-600 p-3 text-white">
                <BrainCircuit size={25} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  PlaceSense
                </h1>
                <p className="text-xs text-slate-500">
                  Smarter Placements. Brighter Futures.
                </p>
              </div>
            </div>

            <div className="mb-7">
              <p className="mb-3 text-sm font-bold tracking-widest text-blue-600">
                GET STARTED
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details to join PlaceSense.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Full name
                </label>
                <div className="relative">
                  <UserRound
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Role selection */}
              <div>
                <label className="mb-3 block text-sm font-bold text-slate-800">
                  Register as
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map(({ name, Icon }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setRole(name)}
                      aria-pressed={role === name}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-sm font-medium transition ${
                        role === name
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={22} />
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirm ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowConfirm((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:from-blue-700 hover:to-blue-600"
              >
                Create {role} Account
                <ArrowRight size={20} />
              </button>

              {message && (
                <p
                  role="status"
                  className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700"
                >
                  {message}
                </p>
              )}
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="whitespace-nowrap text-xs text-slate-400">
                ALREADY REGISTERED?
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-700 hover:text-blue-900"
              >
                Sign in
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} />
              Your information deserves to stay protected.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}