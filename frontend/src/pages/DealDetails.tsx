import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaShare, FaHeart, FaRegHeart } from "react-icons/fa";
import { formatDate } from "../utils/dateUtils";

interface Deal {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  store: {
    _id: string;
    name: string;
    logo: string;
  };
  category: {
    _id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/deals/${id}`
        );
        if (response.data.success) {
          setDeal(response.data.data);
          // Check if deal is saved
          const savedDeals = JSON.parse(
            localStorage.getItem("savedDeals") || "[]"
          );
          setIsSaved(savedDeals.includes(response.data.data._id));
        } else {
          setError("Failed to load deal details");
        }
      } catch (err) {
        setError("Failed to load deal details");
        console.error("Error fetching deal:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDeal();
    }
  }, [id]);

  const handleSaveDeal = () => {
    if (!deal) return;

    const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
    if (isSaved) {
      const updatedDeals = savedDeals.filter((id: string) => id !== deal._id);
      localStorage.setItem("savedDeals", JSON.stringify(updatedDeals));
      setIsSaved(false);
    } else {
      savedDeals.push(deal._id);
      localStorage.setItem("savedDeals", JSON.stringify(savedDeals));
      setIsSaved(true);
    }
  };

  const handleShare = async () => {
    if (!deal) return;

    try {
      await navigator.share({
        title: deal.title,
        text: `Check out this deal: ${deal.title}`,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleVisitDeal = () => {
    if (!deal) return;
    window.open(deal.url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {error || "Deal not found"}
          </h2>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Deals
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleSaveDeal}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                {isSaved ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-600 text-xl" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <FaShare className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={deal.store.logo}
                  alt={deal.store.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {deal.store.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {deal.category.name}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${deal.price?.toFixed(2)}
                </div>
                {deal.originalPrice > deal.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ${deal.originalPrice?.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {deal.title}
            </h1>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">{deal.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  Start Date
                </h4>
                <p className="text-gray-800">{formatDate(deal.startDate)}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">
                  End Date
                </h4>
                <p className="text-gray-800">{formatDate(deal.endDate)}</p>
              </div>
            </div>

            <button
              onClick={handleVisitDeal}
              className="w-full btn btn-primary"
            >
              Visit Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
