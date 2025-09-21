import { useState, useEffect } from "react";
import axios from "axios";
import DealCard from "../components/deals/DealCard";

interface Store {
  _id: string;
  name: string;
  logo: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Deal {
  _id: string;
  title: string;
  description: string;
  discountPrice: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  dealUrl: string;
  expiryDate: string;
  store: Store;
  category: Category;
  createdAt: string;
}

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/deals");
        setDeals(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch deals");
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
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
  );
}
