import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { formatDate } from "../../utils/dateUtils";

interface Store {
  _id: string;
  name: string;
  logo: string;
}

interface Category {
  _id: string;
  name: string;
}

interface DealCardProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  store: Store;
  category: Category;
  startDate: string;
  endDate: string;
  url: string;
  isActive: boolean;
}

const DealCard = ({
  _id,
  title,
  description,
  price,
  originalPrice,
  discount,
  image,
  store,
  category,
  startDate,
  endDate,
  url,
  isActive,
}: DealCardProps) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(() => {
    const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
    return savedDeals.includes(_id);
  });
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSaveDeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedDeals = JSON.parse(localStorage.getItem("savedDeals") || "[]");
    if (isSaved) {
      const updatedDeals = savedDeals.filter((id: string) => id !== _id);
      localStorage.setItem("savedDeals", JSON.stringify(updatedDeals));
      setIsSaved(false);
    } else {
      savedDeals.push(_id);
      localStorage.setItem("savedDeals", JSON.stringify(savedDeals));
      setIsSaved(true);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: title,
        text: `Check out this deal: ${title}`,
        url: window.location.origin + `/deals/${_id}`,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleVisitDeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  const handleViewDeal = () => {
    navigate(`/deals/${_id}`);
  };

  // Get relevant dummy image based on category
  const getDummyImage = () => {
    const categoryName = category.name.toLowerCase();
    if (categoryName.includes("electronics")) {
      return "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop";
    } else if (
      categoryName.includes("fashion") ||
      categoryName.includes("clothing")
    ) {
      return "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop";
    } else if (
      categoryName.includes("food") ||
      categoryName.includes("restaurant")
    ) {
      return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop";
    } else if (categoryName.includes("travel")) {
      return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop";
    } else {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop";
    }
  };

  // Get store logo placeholder
  const getStoreLogoPlaceholder = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      store.name
    )}&background=random&size=32`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleViewDeal}
    >
      <div className="relative">
        <img
          src={imageError ? getDummyImage() : image}
          alt={title}
          className="w-full h-48 object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
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
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={logoError ? getStoreLogoPlaceholder() : store.logo}
              alt={store.name}
              className="w-8 h-8 rounded-full object-cover mr-2"
              onError={() => setLogoError(true)}
            />
            <span className="text-sm text-gray-600">{store.name}</span>
          </div>
          <span className="text-sm text-gray-500">{category.name}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xl font-bold text-primary">
              ${price?.toFixed(2)}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <button onClick={handleVisitDeal} className="w-full btn btn-primary">
          Visit Deal
        </button>
      </div>
    </div>
  );
};

export default DealCard;
