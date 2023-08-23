"use client";
import React from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  return (
    <div className="flex justify-between">
      {!isSignedIn && (
        <SignInButton mode="modal">
          <button className="bg-black text-white py-2 px-5 font-semibold">
            Sign In
          </button>
        </SignInButton>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
