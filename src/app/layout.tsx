import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '~/app/api/uploadthing/core';
import TopNav from '~/app/_components/TopNav';

export const metadata: Metadata = {
    title: 'Next gallery App',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${geist.variable}`}>
                <body className="flex flex-col gap-4">
                    <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                    <TopNav />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
