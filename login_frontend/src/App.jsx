import { useState } from "react";
import {
  ArrowRight, BrainCircuit, Building2, CheckCircle2, Eye, EyeOff,
  GraduationCap, LockKeyhole, Mail, ShieldCheck, Sparkles, TrendingUp
} from "lucide-react";

const roles = [
  { name: "Student", Icon: GraduationCap },
  { name: "Admin", Icon: ShieldCheck },
  { name: "Company", Icon: Building2 },
];

function Feature({ Icon, title, description }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-white/10 p-3"><Icon size={21} className="text-violet-300" /></div>
      <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-indigo-200">{description}</p></div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`Frontend demo: ${role} login form submitted for ${email}. No account has been authenticated.`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="grid min-h-[650px] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-100 lg:grid-cols-2">

        {/* Left branding panel; hidden on small screens */}
        <section className="brand-pattern relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-800 p-10 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 top-36 h-52 w-52 rounded-full border border-white/10" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><BrainCircuit size={28} /></div>
            <div><h1 className="text-2xl font-bold tracking-tight">PlaceSense</h1><p className="text-xs text-indigo-200">Smarter Placements. Brighter Futures.</p></div>
          </div>

          <div className="relative z-10 my-10 max-w-md">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-indigo-100"><Sparkles size={16} /> Your career journey starts here</div>
            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">Turn your skills into<span className="block text-violet-300">opportunities.</span></h2>
            <p className="mt-5 text-base leading-7 text-indigo-100/80">Discover placement drives, understand your skill gaps, and take the next step toward your dream career.</p>

            <div className="mt-9 space-y-5">
              <Feature Icon={CheckCircle2} title="Smart Eligibility Check" description="Know which placement drives match your profile." />
              <Feature Icon={BrainCircuit} title="AI Resume Insights" description="Discover your strengths and missing skills." />
              <Feature Icon={TrendingUp} title="Career Readiness" description="Find ways to improve your placement readiness." />
            </div>

            <div className="glass-card mt-10 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-sm text-indigo-200">Your next opportunity</p><p className="mt-1 text-xl font-bold">Starts with one step.</p></div>
                <div className="rounded-xl bg-violet-400/20 p-3"><GraduationCap size={28} /></div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-300 to-cyan-300" /></div>
              <p className="mt-3 text-xs text-indigo-200">Understand your strengths. Work on what comes next.</p>
            </div>
          </div>
          <p className="relative z-10 text-xs text-indigo-200/70">© 2026 PlaceSense · Campus Placement Management</p>
        </section>

        {/* Right login panel */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white"><BrainCircuit size={25} /></div>
              <div><h1 className="text-xl font-bold text-slate-900">PlaceSense</h1><p className="text-xs text-slate-500">Smarter Placements. Brighter Futures.</p></div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-bold tracking-widest text-blue-600">WELCOME BACK</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">Enter your details to access your PlaceSense workspace.</p>
            </div>

            <div className="mb-7">
              <label className="mb-3 block text-sm font-bold text-slate-800">Select your role</label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {roles.map(({ name, Icon }) => (
                  <button key={name} type="button" onClick={() => { setRole(name); setMessage(""); }}
                    aria-pressed={role === name}
                    className={`role-button flex flex-col items-center justify-center gap-3 rounded-2xl px-2 py-4 text-sm font-medium sm:py-5 ${role === name ? "active" : ""}`}>
                    <Icon size={23} />{name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-800">Email address</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                  <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email}
                    onChange={e => setEmail(e.target.value)} required
                    className="form-input w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-800 placeholder:text-slate-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-bold text-slate-800">Password</label>
                  <button type="button" onClick={() => setMessage("Demo only: add a password-reset page later.")} className="text-xs font-semibold text-blue-600 hover:text-blue-800 sm:text-sm">Forgot password?</button>
                </div>
                <div className="relative">
                  <LockKeyhole size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                  <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password}
                    onChange={e => setPassword(e.target.value)} required
                    className="form-input w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-800 placeholder:text-slate-400" />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 rounded accent-blue-600" />
                  Remember me
                </label>
                <span className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm"><ShieldCheck size={16} />Secure sign-in</span>
              </div>

              <button type="submit" className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:from-blue-700 hover:to-blue-600 active:scale-[0.99]">
                Sign in as {role}<ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>

              {message && <p role="status" className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">{message}</p>}
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" /><span className="whitespace-nowrap text-xs font-medium text-slate-400">NEW TO PLACESENSE?</span><div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="text-center text-sm text-slate-500">Don't have an account?{" "}
              <button type="button" onClick={() => setMessage("Demo only: create a separate registration page for this link.")} className="font-bold text-blue-600 hover:text-blue-800">Create account</button>
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400"><ShieldCheck size={16} />Your information deserves to stay protected.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
