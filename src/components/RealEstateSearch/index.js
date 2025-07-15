import React from 'react';
import { FiSearch, FiMapPin, FiHome, FiDollarSign } from "react-icons/fi";

const RealEstateSearch = ({ onSearch, onTypeFilter, selectedType }) => {
  const propertyTypes = ["All", "Penthouse", "Villa", "Loft", "Cabin", "Single Family", "Townhouse"];

  return (
    <section className="relative table w-full py-36 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container relative">
        <div className="grid grid-cols-1 pb-8 text-center mt-10">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-white">
            Discover Your Dream Real Estate NFT
          </h3>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Explore exclusive properties tokenized as NFTs. Own a piece of real estate in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8">
          {/* Search Box */}
          <div className="relative">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search properties..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Property Type Filter */}
          <div className="relative">
            <div className="relative">
              <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <select
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedType}
                onChange={(e) => onTypeFilter(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="relative">
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <select className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                <option>Price Range</option>
                <option>Under 1 ETH</option>
                <option>1-2 ETH</option>
                <option>2-5 ETH</option>
                <option>5+ ETH</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">150+</h4>
            <p className="text-white/80">Properties Listed</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">50+</h4>
            <p className="text-white/80">Happy Buyers</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">25+</h4>
            <p className="text-white/80">Cities Covered</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">100%</h4>
            <p className="text-white/80">Secure Transactions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateSearch; 