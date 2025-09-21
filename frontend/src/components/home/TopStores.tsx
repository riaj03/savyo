import { useNavigate } from "react-router-dom";

const topStores = [
  {
    id: "1",
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    dealCount: 1245,
    category: "Everything",
  },
  {
    id: "2",
    name: "Walmart",
    logo: "https://logo.clearbit.com/walmart.com",
    dealCount: 987,
    category: "Everything",
  },
  {
    id: "3",
    name: "Best Buy",
    logo: "https://logo.clearbit.com/bestbuy.com",
    dealCount: 756,
    category: "Electronics",
  },
  {
    id: "4",
    name: "Target",
    logo: "https://logo.clearbit.com/target.com",
    dealCount: 654,
    category: "Everything",
  },
  {
    id: "5",
    name: "Nike",
    logo: "https://logo.clearbit.com/nike.com",
    dealCount: 432,
    category: "Fashion",
  },
  {
    id: "6",
    name: "Macy's",
    logo: "https://logo.clearbit.com/macys.com",
    dealCount: 321,
    category: "Fashion",
  },
];

export default function TopStores() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Top Stores
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Discover amazing deals from your favorite retailers
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topStores.map((store) => (
            <div
              key={store.id}
              className="card flex items-center space-x-4 transition-transform hover:scale-105"
            >
              <img
                src={store.logo}
                alt={store.name}
                className="h-16 w-16 rounded-lg object-contain"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {store.name}
                </h3>
                <p className="text-sm text-gray-500">{store.category}</p>
                <p className="mt-1 text-sm font-medium text-primary-600">
                  {store.dealCount} active deals
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/deals/${store.id}`)}
              >
                View Deals
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn btn-secondary">Browse All Stores</button>
        </div>
      </div>
    </section>
  );
}
