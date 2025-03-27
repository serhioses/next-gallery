import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { Toaster } from '~/components/ui/sonner';
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

export default function RootLayout({
    children,
    modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${geist.variable} dark`}>
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                <body>
                    <div className="grid h-screen grid-rows-[auto_1fr]">
                        <TopNav />
                        <main className="overflow-y-auto">{children}</main>
                    </div>
                    {modal}
                    <div id="modal-root" />
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
