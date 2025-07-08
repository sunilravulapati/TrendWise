'use client';
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Welcome to TrendWise</h1>
      <button
        onClick={() => signIn('google')}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
