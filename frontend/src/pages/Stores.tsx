import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

interface Store {
  _id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  category: {
    _id: string;
    name: string;
  };
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/stores`);
        setStores(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stores");
        setLoading(false);
      }
    };
    fetchStores();
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
      <h1 className="text-3xl font-bold mb-8">All Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store._id} className="card flex flex-col items-center p-6">
            <img
              src={store.logo}
              alt={store.name}
              className="h-16 w-16 rounded-lg object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900">
              {store.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{store.category?.name}</p>
            <a
              href={store.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-2"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
