import { type Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
    title: 'Next gallery App',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${geist.variable}`}>
                <body className="flex h-dvh items-center justify-center">{children}</body>
            </html>
        </ClerkProvider>
    );
}
