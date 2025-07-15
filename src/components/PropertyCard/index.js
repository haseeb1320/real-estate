import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiHome, FiBed, FiBath, FiSquare } from "react-icons/fi";

const PropertyCard = ({ property, onBuy }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">
            {property.price} ETH
          </h3>
          <span className="text-sm text-gray-500">
            NFT #{property.id}
          </span>
        </div>

        {/* Property Name */}
        <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.name}
        </h4>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <FiMapPin className="mr-2" />
          <span className="text-sm">
            {property.propertyAddress}, {property.propertyCity}, {property.propertyState}
          </span>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <FiBed className="mr-2" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiBath className="mr-2" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiSquare className="mr-2" />
            <span className="text-sm">{property.squareFootage} sqft</span>
          </div>
        </div>

        {/* Property Features Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.features?.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onBuy(property)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Buy NFT
          </button>
          <Link
            to={`/property/${property.id}`}
            className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 