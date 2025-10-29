"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-amber-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-2xl font-bold tracking-wide">
        ☕ Elli Beans
      </Link>
      <nav className="space-x-4 text-sm">
        <Link href="/inventory" className="hover:underline">
          Inventory
        </Link>
        <Link href="/recipes" className="hover:underline">
          Recipes
        </Link>
        <Link href="/kds" className="hover:underline">
          KDS
        </Link>
      </nav>
    </header>
  );
}
