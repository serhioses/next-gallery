'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { usePostHog } from 'posthog-js/react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useUser } from '@clerk/nextjs';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            // api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
            api_host: '/ingest',
            ui_host: 'https://eu.posthog.com',
            person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
            capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        });
    }, []);

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView />
            {children}
        </PHProvider>
    );
}

function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    // const { isSignedIn, userId } = useAuth();
    const { isLoaded, isSignedIn, user } = useUser();

    // Track pageviews
    useEffect(() => {
        if (pathname && posthog) {
            let url = window.origin + pathname;
            if (searchParams.toString()) {
                url = url + '?' + searchParams.toString();
            }

            posthog.capture('$pageview', { $current_url: url });
        }
    }, [pathname, searchParams, posthog]);

    // Track sign in/out
    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (isSignedIn && user?.id && !posthog._isIdentified()) {
            posthog.identify(user.id, {
                email: user.primaryEmailAddress?.emailAddress,
                username: user.username,
            });
        } else if (!isSignedIn && posthog._isIdentified()) {
            // Reset the user if they sign out
            posthog.reset();
        }
    }, [isLoaded, isSignedIn, posthog, user]);

    return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
    return (
        <Suspense fallback={null}>
            <PostHogPageView />
        </Suspense>
    );
}
