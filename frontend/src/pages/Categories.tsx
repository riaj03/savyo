import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories`);
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };
    fetchCategories();
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
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="card flex flex-col items-center p-6"
          >
            <img
              src={category.icon}
              alt={category.name}
              className="h-16 w-16 rounded-lg object-contain mb-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/64";
              }}
            />
            <h2 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 text-center mt-2">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
