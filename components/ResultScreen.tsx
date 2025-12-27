import React from 'react';
import { UserProfile, CertificateConfig } from '../types';

interface ResultScreenProps {
  score: number;
  total: number;
  profile: UserProfile;
  onReset: () => void;
  certConfig: CertificateConfig;
}

export const ResultScreen: React.FC<ResultScreenProps> = () => {
  return (
    <div className="p-8 flex flex-col flex-1 items-center justify-center text-center">
      <div className="text-xl leading-relaxed space-y-4 max-w-2xl">
        <p>Thank you for your participation in the KBC Online Phase-1.</p>
        <p>Your performance has been recorded successfully.</p>
        <p>
          The school team will update you very soon regarding the next round.
        </p>
        <p>
          Best regards,<br />
          FVIS – KBC Team
        </p>
      </div>
    </div>
  );
};
