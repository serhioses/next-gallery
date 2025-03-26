import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { UploadButton } from '~/app/_components/UploadButton';

export default function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div>gallery</div>

            <div className="flex">
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
