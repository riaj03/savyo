import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const categories = [
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👕" },
  { name: "Home & Garden", icon: "🏡" },
  { name: "Travel", icon: "✈️" },
  { name: "Food & Dining", icon: "🍽️" },
  { name: "Beauty", icon: "💄" },
];

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 mix-blend-multiply" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Find the Best Deals</span>
            <span className="block text-primary-200">
              Save More, Shop Smarter
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
            Discover exclusive discounts and offers from your favorite stores.
            Join thousands of savvy shoppers who save big every day.
          </p>
        </div>

        <div className="mt-12">
          <div className="relative mx-auto max-w-3xl">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border-0 py-4 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                placeholder="Search for deals, stores, or categories..."
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-center text-lg font-semibold text-white">
            Popular Categories
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-4 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="mt-2 text-sm font-medium">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
