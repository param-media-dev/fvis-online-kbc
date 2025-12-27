const API = 'https://fvacentre.param.club';

/* =========================
   TYPES
========================= */
export interface QuestionResponse {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface StudentResponse {
  success: boolean;
  student_id: number;
}

/* =========================
   FETCH QUESTIONS (GET)
========================= */
export const fetchQuestions = async (
  grade: string
): Promise<QuestionResponse[]> => {
  const res = await fetch(
    `${API}/wp-json/kbc/v1/questions?grade=${encodeURIComponent(grade)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch questions');
  }

  return res.json();
};

/* =========================
   VALIDATE ANSWER (POST)
========================= */
export const validateAnswer = async (
  questionId: number,
  answer: 'A' | 'B' | 'C' | 'D'
): Promise<{ correct: boolean }> => {
  const res = await fetch(`${API}/wp-json/kbc/v1/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: questionId, answer }),
  });

  if (!res.ok) {
    throw new Error('Failed to validate answer');
  }

  return res.json();
};

/* =========================
   SAVE STUDENT (POST)
========================= */
export const saveStudent = async (student: {
  name: string;
  mobile: string;
  dob: string;
  grade: string;
}): Promise<StudentResponse> => {
  const res = await fetch(`${API}/wp-json/kbc/v1/student`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });

  if (!res.ok) {
    throw new Error('Failed to save student');
  }

  return res.json();
};
/* =========================
   resuat (POST)
========================= */


export const saveResult = async (data: {
  student_id: number;
  score: number;
  total: number;
  grade: string;
}) => {
  const res = await fetch(`${API}/wp-json/kbc/v1/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to save result');
  }

  return res.json();
};
