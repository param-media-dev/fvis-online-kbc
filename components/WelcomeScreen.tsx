import React, { useState } from 'react';
import { GradeLevel, UserProfile } from '../types';
import { motion } from 'framer-motion';


interface WelcomeScreenProps {
  onStart: (profile: UserProfile) => void;
  onAdmin: () => void;
  initialError: string | null;
}

const GRADES: GradeLevel[] = [
  'Class 1-2',
  'Class 3-4',
  'Class 5-6',
  'Class 7-8',
  'Class 9',
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onAdmin,
  initialError,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Class 1-2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && mobile.length === 10 && dob) {
      onStart({
        name,
        grade,
        mobile,
        dob,
      });
    }
  };

  return (
    <>
      {/* ================= HERO + FORM ================= */}
      <div className="flex flex-col flex-1">
        <section className="flex flex-col md:flex-row flex-1">
        {/* LEFT – POSTER STYLE (ULTRA ANIMATED) */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="md:w-1/2 bg-white p-12 flex flex-col items-center justify-center text-center border-r border-slate-200 overflow-hidden"
>

  {/* TOP TAGLINE – SLIDE + FADE */}
  <motion.p
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="text-xs tracking-widest text-slate-500 mb-8"
  >
    EMPOWERING YOUNG MINDS THROUGH KNOWLEDGE
  </motion.p>

  {/* BIG LOGO – FLOAT + PULSE */}
<motion.img
  src="/kbc-logo.jpeg"
  alt="FVIS KBC Logo"
  className="w-40 md:w-48 mb-6 object-contain"
  initial={{ scale: 0.6, opacity: 0 }}
  animate={{
    scale: 1,
    opacity: 1,
    y: [0, -10, 0],
  }}
  transition={{
    scale: { duration: 0.8 },
    opacity: { duration: 0.8 },
    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  }}
/>

  {/* TITLE – DRAMATIC ENTRANCE */}
<div className="overflow-hidden text-center">
  <motion.h1
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="font-extrabold leading-tight"
  >
    {/* Sub Title */}
    <span
      className="
        block
        text-2xl md:text-3xl
        tracking-wide
        text-gray-700
      "
    >
      KAUN BANEGA
    </span>

    {/* Highlighted Title */}
    <motion.span
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        block
        mt-1
        text-5xl md:text-6xl
        tracking-wide
        bg-gradient-to-r
        from-yellow-500 via-amber-500 to-yellow-600
        bg-clip-text text-transparent
        drop-shadow-sm
      "
    >
      CHAMPION
    </motion.span>
  </motion.h1>
</div>


  {/* SUBTITLE – FADE IN */}
<motion.h2
  initial={{ opacity: 0, y: 10 }}
  animate={{
    opacity: [0, 1, 1, 0],
    y: [10, 0, 0, -10],
  }}
  transition={{
    delay: 0.7,
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="text-lg font-semibold text-slate-700 mt-2 mb-6"
>
  Online KBC Challenge
</motion.h2>






  {/* DESCRIPTION – SOFT SLIDE */}
  <motion.p
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.9, duration: 0.7 }}
    className="text-sm text-slate-500 max-w-md mb-10"
  >
    An exclusive <strong>INSIGHT</strong>-based platform for
    curriculum-aligned assessment.
  </motion.p>

  {/* QUIZ FEATURES – STAGGER + HOVER */}
  <motion.h3
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.1 }}
    className="text-slate-700 font-bold mb-4 tracking-wide"
  >
    KBC Features
  </motion.h3>

  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: { staggerChildren: 0.2 },
      },
    }}
    className="grid grid-cols-1 gap-4 w-full max-w-sm mb-10"
  >
    {[
      ['Curriculum-Aligned Questions', 'Grade-appropriate, I.N.S.I.G.H.T.-based assessment'],
      ['10-Minute Smart Sprint', 'Test speed, accuracy, focus, and presence of mind'],
      ['Recognition', 'Certificate of Participation and Excellence in the Online KBC Quiz by FVIS Team'],
    ].map(([title, desc], i) => (
      <motion.div
        key={i}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        whileHover={{ scale: 1.06, y: -4 }}
        className="border rounded-xl p-4 text-sm text-slate-600 hover:shadow-xl transition"
      >
        <strong>{title}</strong>
        <br />
        {desc}
      </motion.div>
    ))}
  </motion.div>

  {/* INSIGHT FRAMEWORK – CASCADE */}
<motion.h3
  animate={{ opacity: [0.7, 1, 0.7] }}
  transition={{
    duration: 2.5,
    ease: "easeInOut",
    repeat: Infinity,
  }}
  className="text-slate-700 font-bold mb-3 tracking-wide"
>
  SYLLABUS – I.N.S.I.G.H.T. FRAMEWORK
</motion.h3>



  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: { staggerChildren: 0.12 },
      },
    }}
    className="text-sm text-slate-600 text-left space-y-1 max-w-md mb-8"
  >
    {[
      'Indian Ancient History & Heritage',
      'Numerical Aptitude & Mathematics',
      'Science, Sports & Environment',
      'Information Knowledge, Computer & AI',
      'Human Languages (Eng • Hin • Skt • Guj)',
      'Thinking Skills (Logical & Reasoning)',
    ].map((text, i) => (
      <motion.p
        key={i}
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <strong>{'INSIGHT'[i]}</strong> – {text}
      </motion.p>
    ))}
  </motion.div>

  {/* FOOTER – FINAL FADE */}
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="font-semibold text-slate-700 tracking-wide"
>
  <motion.span
    animate={{ letterSpacing: ["0.05em", "0.12em", "0.05em"] }}
    transition={{
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  >
    Learn • Think • Win
  </motion.span>
</motion.p>
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    className="text-xs text-slate-500 mt-2"
  >
    Powered by FVIS Team <br />
    Flower Valley International School, Surat
  </motion.p>

</motion.div>

          {/* RIGHT */}
          <div className="md:w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
<motion.h2
  initial={{ opacity: 0, letterSpacing: "0.1em", color: "#334155" }} // slate-700
  animate={{
    opacity: 1,
    letterSpacing: "0em",
    color: ["#334155", "#0f172a", "#334155"], // slate-700 → slate-900 → slate-700
  }}
  transition={{
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
  }}
  className="text-3xl font-bold mb-2"
>
  Ready to Play?
</motion.h2>




              <p className="text-slate-500 mb-10">
               Enter your details and begin your KBC journey!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Registered Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ''))
                    }
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                    placeholder="10-digit number"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Your Grade
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {GRADES.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrade(g)}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-bold ${
                          grade === g
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-100 text-slate-500'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {initialError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl">
                    {initialError}
                  </div>
                )}
<button
  className="
    w-full
    bg-yellow-600
    text-white
    py-5
    rounded-2xl
    font-poppins
    font-medium
    transition-all
    hover:bg-yellow-700
    active:scale-95
  "
>
  Online KBC Challenge – Phase 1
</button>






              </form>
            </div>
          </div>
        </section>
      </div>

      {/* ================= FOOTER ================= */}
{/* ================= TRUST & FEATURES FOOTER ================= */}
<section className="bg-slate-50 py-12 px-6 border-t border-slate-200">

  {/* Section Title */}
<div className="flex justify-center">
  <h3 className="inline-block px-6 py-2 mb-10 text-sm font-bold tracking-widest uppercase rounded-full border border-blue-300 bg-blue-100 text-blue-700 shadow-sm">
    Our Branches
  </h3>
</div>
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      {
        content: (
          <>
            Flower Valley <br />
            International School, <br />
            Variyav, Surat
            <br />Mob: +91 7567663000 
            <br />Mob: +91 7698663000  
          </>
        ),
        color: 'from-red-500 to-rose-500',
      },
      {
        content: (
          <>
            Flower Valley <br />
            Pre-School, <br />
            Jahangirpura, Surat
            <br />Mob: +91 9316987188 
          </>
        ),
        color: 'from-lime-500 to-green-500',
      },
      {
        content: (
          <>
            Flower Valley <br />
            Pre-School, <br />
            Katargam, Surat
            <br />Mob: +91 6353900395
          </>
        ),
        color: 'from-sky-400 to-cyan-500',
      },
      {
        content: (
          <>
            Flower Valley <br />
            Pre-School, <br />
            Sarthana, Surat
<br />Mob: +91 9328177798         
 </>
        ),
        color: 'from-yellow-400 to-amber-400',
      },
    ].map((branch, i) => (
      <div
        key={i}
        className="
          group relative bg-white rounded-2xl px-6 py-6
          border border-slate-200 text-center overflow-hidden
          shadow-sm hover:shadow-xl hover:-translate-y-1
          transition-all duration-300
        "
      >
        {/* Hover glow */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100
            transition-opacity bg-gradient-to-br ${branch.color} opacity-10
          `}
        />

        {/* Top accent bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${branch.color}`}
        />

        <p
          className="
            relative text-slate-700 font-semibold text-sm leading-relaxed
            group-hover:text-slate-900 transition-colors
          "
        >
          {branch.content}
        </p>
      </div>
    ))}
  </div>
</section>
    </>
  );
};
