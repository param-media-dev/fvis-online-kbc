import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { UserProfile, CertificateConfig } from './types';
import { getCertConfig } from './storeService';
import { saveResult } from './services/api';


const App: React.FC = () => {
  const [step, setStep] = useState<
    'welcome' | 'quiz' | 'result' | 'admin-login' | 'admin'
  >('welcome');

  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [quizResult, setQuizResult] = useState<{
    answers: number[];
    score: number;
    total: number;
  } | null>(null);

  const [certConfig, setCertConfig] = useState<CertificateConfig>(
    getCertConfig()
  );

  /* ================= START QUIZ ================= */
  const startQuiz = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setQuizResult(null);
    setStep('quiz');
  };

  /* ================= COMPLETE QUIZ ================= */
const handleQuizComplete = async (result: {
  answers: number[];
  score: number;
  total: number;
}) => {
  setQuizResult(result);

  // 🔹 SAVE RESULT TO BACKEND
  try {
    if (profile?.studentId) {
      await saveResult({
        student_id: profile.studentId,
        score: result.score,
        total: result.total,
        grade: profile.grade,
      });
    }
  } catch (err) {
    console.error('Failed to save quiz result', err);
  }

  setStep('result');
};

  /* ================= ADMIN ================= */
  const handleAdminAuth = () => {
    setIsAdminAuth(true);
    setStep('admin');
  };

  const handleLogout = () => {
    setIsAdminAuth(false);
    setStep('welcome');
  };

  const resetQuiz = () => {
    setProfile(null);
    setQuizResult(null);
    setStep('welcome');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center font-sans antialiased text-slate-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="cursor-pointer" onClick={resetQuiz}>
            <img src="/var/www/html/logo.png" alt="Logo" className="h-10" />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep(isAdminAuth ? 'admin' : 'admin-login')}
              className="text-sm font-semibold text-slate-500 hover:text-blue-600"
            >
              Admin
            </button>

            {isAdminAuth && (
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full max-w-5xl mt-20 mb-10 px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
          {step === 'welcome' && (
            <WelcomeScreen
              onStart={startQuiz}
              onAdmin={() => setStep('admin-login')}
              initialError={null}
            />
          )}

          {step === 'admin-login' && (
            <AdminLogin
              onLogin={handleAdminAuth}
              onCancel={() => setStep('welcome')}
            />
          )}

          {step === 'admin' && (
            <AdminPanel
              onBack={() => setStep('welcome')}
              onLogout={handleLogout}
            />
          )}

          {step === 'quiz' && profile && (
            <QuizScreen
              grade={profile.grade}
              onComplete={handleQuizComplete}
            />
          )}

          {step === 'result' && profile && quizResult && (
            <ResultScreen
              score={quizResult.score}
              total={quizResult.total}
              profile={profile}
              onReset={resetQuiz}
              certConfig={certConfig}
            />
          )}
        </div>
      </main>

      <footer className="w-full text-center py-8 text-slate-400 text-sm">
        <p>Product By Param Media</p>
      </footer>
    </div>
  );
};

export default App;
