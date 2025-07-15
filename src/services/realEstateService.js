// Real Estate Data Service - Sample data for NFT marketplace
const sampleProperties = [
  {
    id: 1,
    name: "Luxury Downtown Penthouse",
    description: "Exclusive penthouse with panoramic city views, modern amenities, and premium finishes",
    price: "2.5",
    bedrooms: 3,
    bathrooms: 3,
    yearBuilt: 2022,
    units: 1,
    propertyAddress: "123 Luxury Tower, Floor 25",
    propertyCity: "New York",
    propertyState: "NY",
    zipCode: "10001",
    squareFootage: 2800,
    propertyType: "Penthouse",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    features: ["City View", "Balcony", "Gym", "Pool", "Concierge"],
    status: "For Sale"
  },
  {
    id: 2,
    name: "Modern Beachfront Villa",
    description: "Stunning beachfront property with private access, infinity pool, and ocean views",
    price: "4.2",
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2021,
    units: 1,
    propertyAddress: "456 Coastal Paradise Drive",
    propertyCity: "Miami",
    propertyState: "FL",
    zipCode: "33139",
    squareFootage: 4500,
    propertyType: "Villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    features: ["Beach Access", "Infinity Pool", "Garden", "Garage", "Smart Home"],
    status: "For Sale"
  },
  {
    id: 3,
    name: "Urban Industrial Loft",
    description: "Converted warehouse space with high ceilings, exposed brick, and modern industrial design",
    price: "1.8",
    bedrooms: 2,
    bathrooms: 2,
    yearBuilt: 2020,
    units: 1,
    propertyAddress: "789 Industrial District",
    propertyCity: "Los Angeles",
    propertyState: "CA",
    zipCode: "90012",
    squareFootage: 2200,
    propertyType: "Loft",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    features: ["High Ceilings", "Exposed Brick", "Open Plan", "Rooftop Deck"],
    status: "For Sale"
  },
  {
    id: 4,
    name: "Mountain Retreat Cabin",
    description: "Cozy cabin nestled in the mountains with stunning views and modern amenities",
    price: "1.5",
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2019,
    units: 1,
    propertyAddress: "321 Mountain View Road",
    propertyCity: "Denver",
    propertyState: "CO",
    zipCode: "80202",
    squareFootage: 1800,
    propertyType: "Cabin",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    features: ["Mountain View", "Fireplace", "Deck", "Hiking Trails"],
    status: "For Sale"
  },
  {
    id: 5,
    name: "Suburban Family Estate",
    description: "Spacious family home with large backyard, pool, and modern kitchen",
    price: "2.8",
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2018,
    units: 1,
    propertyAddress: "555 Family Circle",
    propertyCity: "Austin",
    propertyState: "TX",
    zipCode: "78701",
    squareFootage: 3200,
    propertyType: "Single Family",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    features: ["Pool", "Large Backyard", "Modern Kitchen", "Garage", "Playroom"],
    status: "For Sale"
  },
  {
    id: 6,
    name: "Historic Townhouse",
    description: "Beautifully restored historic townhouse with period details and modern updates",
    price: "3.1",
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 1890,
    units: 1,
    propertyAddress: "777 Heritage Street",
    propertyCity: "Boston",
    propertyState: "MA",
    zipCode: "02108",
    squareFootage: 2600,
    propertyType: "Townhouse",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    features: ["Historic Details", "Garden", "Fireplace", "Hardwood Floors"],
    status: "For Sale"
  }
];

// Function to get all properties
export const getAllProperties = () => {
  return sampleProperties;
};

// Function to get property by ID
export const getPropertyById = (id) => {
  return sampleProperties.find(property => property.id === parseInt(id));
};

// Function to search properties
export const searchProperties = (query) => {
  return sampleProperties.filter(property => 
    property.name.toLowerCase().includes(query.toLowerCase()) ||
    property.propertyCity.toLowerCase().includes(query.toLowerCase()) ||
    property.propertyState.toLowerCase().includes(query.toLowerCase()) ||
    property.propertyType.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to filter properties by type
export const filterByType = (type) => {
  return sampleProperties.filter(property => 
    property.propertyType.toLowerCase() === type.toLowerCase()
  );
};

// Function to filter properties by price range
export const filterByPriceRange = (minPrice, maxPrice) => {
  return sampleProperties.filter(property => {
    const price = parseFloat(property.price);
    return price >= minPrice && price <= maxPrice;
  });
};

// Function to get featured properties
export const getFeaturedProperties = () => {
  return sampleProperties.slice(0, 3); // Return first 3 properties as featured
};

export default {
  getAllProperties,
  getPropertyById,
  searchProperties,
  filterByType,
  filterByPriceRange,
  getFeaturedProperties,
  sampleProperties
}; 