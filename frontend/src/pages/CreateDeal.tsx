import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaImage,
  FaLink,
  FaCalendarAlt,
  FaStore,
  FaTag,
  FaPercent,
} from "react-icons/fa";

const CreateDeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountPrice: "",
    originalPrice: "",
    imageUrl: "",
    dealUrl: "",
    startDate: "",
    expiryDate: "",
    category: "",
    store: "",
    discountPercentage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDiscountPercentage = () => {
    const original = parseFloat(formData.originalPrice);
    const discount = parseFloat(formData.discountPrice);
    if (original && discount && original > discount) {
      const percentage = ((original - discount) / original) * 100;
      return Math.round(percentage);
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const discountPercentage = calculateDiscountPercentage();
      const response = await fetch("http://localhost:5003/api/deals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          discountPercentage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create deal");
      }

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create deal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Create a New Deal
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Share your amazing deals with the community and help others save
              money! -DDDD
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deal Title + Description
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter deal title"
                />
              </div>

              <div>
                <label
                  htmlFor="store"
                  className="block text-sm font-medium text-gray-700"
                >
                  Store
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaStore className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="store"
                    id="store"
                    required
                    value={formData.store}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Store name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="discountPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deal Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="discountPrice"
                    id="discountPrice"
                    required
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="block w-full pl-7 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Original Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="originalPrice"
                    id="originalPrice"
                    required
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="block w-full pl-7 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date and Time
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="expiryDate"
                    id="expiryDate"
                    required
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTag className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="toys">Toys & Games</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="dealUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deal URL
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLink className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="dealUrl"
                    id="dealUrl"
                    required
                    value={formData.dealUrl}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://example.com/deal"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe the deal in detail..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Creating...
                  </>
                ) : (
                  "Create Deal"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDeal;
