import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { UploadButton } from '~/app/_components/UploadButton';

export default function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <Link href="/">Gallery</Link>

            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UploadButton />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}
