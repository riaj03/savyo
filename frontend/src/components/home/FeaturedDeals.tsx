import { API_BASE_URL } from "../../config";
import DealCard from "../deals/DealCard";
import { useEffect, useState } from "react";

interface Deal {
  _id: string;
  title: string;
  description: string;
  store: {
    _id: string;
    name: string;
    logo: string;
  };
  category: {
    _id: string;
    name: string;
  };
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  expiryDate: string;
  imageUrl: string;
  dealUrl: string;
  createdAt: string;
}

export default function FeaturedDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/deals`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched deals:", data);
        if (Array.isArray(data)) {
          setDeals(data);
        } else if (Array.isArray(data.data)) {
          setDeals(data.data);
        } else {
          setDeals([]);
          setError("API did not return an array of deals");
          console.error("API did not return an array of deals:", data);
        }
      })
      .catch((err) => {
        setDeals([]);
        setError("Failed to fetch deals");
        console.error(err);
      });
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Deals</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(deals) &&
            deals.map((deal) => (
              <DealCard
                key={deal._id}
                _id={deal._id}
                title={deal.title}
                description={deal.description}
                discountPrice={deal.discountPrice}
                originalPrice={deal.originalPrice}
                discountPercentage={deal.discountPercentage}
                imageUrl={deal.imageUrl}
                dealUrl={deal.dealUrl}
                expiryDate={deal.expiryDate}
                store={deal.store}
                category={deal.category}
                createdAt={deal.createdAt}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
