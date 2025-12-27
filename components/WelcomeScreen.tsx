import React, { useState } from 'react';
import { GradeLevel, UserProfile } from '../types';
import { motion } from 'framer-motion';
import { saveStudent } from '../services/api';

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

const getAgeFromDob = (dob: string) => {
  if (!dob) return null;

  const today = new Date();
  const birth = new Date(dob);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const getGradeFromAge = (age: number | null): GradeLevel | null => {
  if (age === null) return null;

  if (age === 6 || age === 7) return 'Class 1-2';
  if (age === 8 || age === 9) return 'Class 3-4';
  if (age === 10 || age === 11) return 'Class 5-6';
  if (age === 12 || age === 13) return 'Class 7-8';
  if (age === 14) return 'Class 9';

  return null;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onAdmin,
  initialError,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Class 1-2');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim() || mobile.length !== 10 || !dob || !grade) {
    setError('Please fill all details correctly');
    return;
  }

  try {
    setSubmitting(true);
    setError(null);

    const res = await saveStudent({
      name,
      mobile,
      dob,
      grade, // ✅ manual grade
    });

    onStart({
      name,
      mobile,
      dob,
      grade, // ✅ manual grade
      studentId: res.student_id,
    });
  } catch (err) {
    setError('Failed to save student. Please try again.');
  } finally {
    setSubmitting(false);
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

  <motion.p
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="text-xs tracking-widest text-slate-500 mb-8"
  >
    EMPOWERING YOUNG MINDS THROUGH KNOWLEDGE
  </motion.p>

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

<div className="overflow-hidden text-center">
  <motion.h1
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="font-extrabold leading-tight"
  >
    <span className="block text-2xl md:text-3xl tracking-wide text-gray-700">
      KAUN BANEGA
    </span>

    <motion.span
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="block mt-1 text-5xl md:text-6xl tracking-wide bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm"
    >
      CHAMPION
    </motion.span>
  </motion.h1>
</div>

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
    ease: 'easeInOut',
  }}
  className="text-lg font-semibold text-slate-700 mt-2 mb-6"
>
  Online KBC Challenge
</motion.h2>

<motion.p
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.9, duration: 0.7 }}
  className="text-sm text-slate-500 max-w-md mb-10"
>
  An exclusive <strong>INSIGHT</strong>-based platform for curriculum-aligned assessment.
</motion.p>

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
    ['Recognition', 'Certified Participation, Prize Money up to ₹25,000, Fastest Finger First Round, Hot Seat & Final Round Experience — a True KBC-Style Journey.'],
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

<motion.h3
  animate={{ opacity: [0.7, 1, 0.7] }}
  transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
  className="text-slate-700 font-bold mb-3 tracking-wide"
>
  SYLLABUS FRAMEWORK – I.N.S.I.G.H.T.
</motion.h3>

<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.12 } },
  }}
  className="text-sm text-slate-600 text-left space-y-1 max-w-md mb-8"
>
  {[
    { letter: 'I', text: 'Indian Ancient History & Heritage' },
    { letter: 'N', text: 'Numerical Aptitude & Mathematics' },
    { letter: 'S', text: 'Science, Sustainability & Environment' },
    { letter: 'I', text: 'Information Technology, Computer & AI' },
    { letter: 'G', text: 'General Knowledge & Current Affairs' },
    { letter: 'H', text: 'Human Languages (English • Hindi • Sanskrit • Gujarati)' },
    { letter: 'T', text: 'Thinking Skills (Logical & Reasoning Ability)' },
  ].map((item, i) => (
    <motion.p
      key={i}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <strong>{item.letter}</strong> – {item.text}
    </motion.p>
  ))}
</motion.div>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="font-semibold text-slate-700 tracking-wide"
>
  <motion.span
    animate={{ letterSpacing: ['0.05em', '0.12em', '0.05em'] }}
    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
  >
    Learn • Think • Win
  </motion.span>
</motion.p>

</motion.div>

{/* RIGHT SIDE FORM */}
<div className="md:w-1/2 bg-white p-12 flex flex-col justify-center">
  <div className="max-w-md mx-auto w-full">

    {/* Title */}
    <h2 className="text-3xl font-extrabold text-slate-800 mb-8">
      Ready to Play
    </h2>

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
        value={dob || ''}
        max={new Date().toISOString().split('T')[0]}
        onChange={(e) => {
          setDob(e.target.value);
          setError(null);
        }}
        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
      />
    </div>

  {/* Manual Grade Selection */}
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
      Select Grade
    </label>

    <div className="grid grid-cols-2 gap-3">
      {[
        'Class 1-2',
        'Class 3-4',
        'Class 5-6',
        'Class 7-8',
        'Class 9',
      ].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setGrade(item)}
          className={`px-4 py-3 rounded-xl border font-semibold transition
            ${
              grade === item
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
      <button
        disabled={submitting}
        className={`
          w-full py-5 rounded-2xl font-medium transition-all
          ${
            submitting
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-yellow-600 text-white hover:bg-yellow-700 active:scale-95'
          }
        `}
      >
        {submitting ? 'Saving...' : 'Online KBC Challenge – Phase 1'}
      </button>

    </form>
  </div>
</div>

        </section>
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

        <p className="relative text-slate-700 font-semibold text-sm leading-relaxed group-hover:text-slate-900 transition-colors">
          {branch.content}
        </p>
      </div>
    ))}
  </div>
  {/* ================= QUERY INFO (PROFESSIONAL STYLE) ================= */}
<div className="mt-14">
  <div className="bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm text-center">

    <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
      For any queries related to the
      <span className="mx-1 font-semibold text-slate-900">
        KBC Quiz
      </span>
      , feel free to call or WhatsApp us at the numbers below.
    </p>

    <div className="mt-5 flex flex-col sm:flex-row justify-center gap-4">
      <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-base">
        📞 7567663000
      </span>

      <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-base">
        📞 7698663000
      </span>
    </div>

    <p className="mt-4 text-slate-500 text-sm">
      We’ll be happy to assist you.
    </p>
  </div>
</div>

</section>

      </div>
    </>
  );
};
