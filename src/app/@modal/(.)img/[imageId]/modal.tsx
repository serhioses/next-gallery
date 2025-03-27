'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, type ComponentRef } from 'react';
import { createPortal } from 'react-dom';

type TModalProps = { children: React.ReactNode };

export function Modal({ children }: TModalProps) {
    const router = useRouter();
    const dialogRef = useRef<ComponentRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function handleDismiss() {
        router.back();
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className="h-dvh max-h-full w-screen max-w-full bg-zinc-900/50"
            onClose={handleDismiss}
        >
            {children}
            <button className="close-button" onClick={handleDismiss} />
        </dialog>,
        document.getElementById('modal-root')!,
    );
}
