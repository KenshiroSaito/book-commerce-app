"use client";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { HeaderProps } from "../types/types";

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href={user ? "/profile" : "/login"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {user ? "Profile" : "Log In"}
          </Link>

          {user ? (
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/login";
              }}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              LogOut
            </button>
          ) : (
            ""
          )}

          <Link href={`/profile`}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={user?.image || "/default_icon.png"}
              className="rounded-full object-cover"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
