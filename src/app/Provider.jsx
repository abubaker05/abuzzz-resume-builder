"use client";

import { SessionProvider } from 'next-auth/react';

// This component wraps our entire application, allowing all pages to use
// session data (like signIn, signOut, and checking if a user is logged in).
export default function Provider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}