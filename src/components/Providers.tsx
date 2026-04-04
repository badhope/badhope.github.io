'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { SettingsProvider } from '@/lib/settings/SettingsContext';
import NetworkStatus from './ui/NetworkStatus';

const ParticleRain = dynamic(
  () => import('./effects/ParticleRain'),
  { ssr: false }
);

const FloatingParticles = dynamic(
  () => import('./effects/FloatingParticles'),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <NetworkStatus />
        <ParticleRain color="rgba(212, 175, 55, 0.12)" count={40} />
        <FloatingParticles />
        {children}
      </LanguageProvider>
    </SettingsProvider>
  );
}