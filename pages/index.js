import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 text-center">
          Elli Beans Dashboard
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Welcome! Choose a section below to manage your shop.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/inventory"
            className="p-6 bg-amber-100 hover:bg-amber-200 rounded-xl text-center font-medium"
          >
            ☕ Inventory
          </Link>
          <Link
            href="/products"
            className="p-6 bg-amber-100 hover:bg-amber-200 rounded-xl text-center font-medium"
          >
            📋 Recipes & COGS
          </Link>
          <Link
            href="/kds"
            className="p-6 bg-amber-100 hover:bg-amber-200 rounded-xl text-center font-medium"
          >
            📟 KDS Display
          </Link>
        </div>
      </div>
    </div>
  );
}
