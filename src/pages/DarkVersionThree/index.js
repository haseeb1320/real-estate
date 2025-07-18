import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { FiArrowRight, FiSearch, FiMapPin, FiHome, FiDollarSign } from "react-icons/fi";
import Countdown from "react-countdown";
import nftData from "../../utils/Nft.json";
import marketplaceData from "../../utils/Marketplace.json";
import { ethers } from "ethers";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ItemDetail from "../../components/ItemDetail";
import StyleSwitcher from "../../components/StyleSwitcher";
import { getAllProperties, getFeaturedProperties, searchProperties, filterByType } from "../../services/realEstateService";
import {
  client01,
  client02,
  client03,
  client04,
  client05,
  client06,
  client07,
  client08,
  client09,
  client10,
  client11,
  client12,
  client13,
  bgImage,
  bg1,
  bg2,
  bg3,
  home3,
  home4,
  home5,
  home6,
  home7,
  home8,
  home9,
  home10,
} from "../../components/imageImport";

const DarkVersionThree = () => {
  const [items, setItems] = useState([]);
  const [marketplace2, setMarketplace2] = useState({});
  const [nft2, setNft2] = useState({});
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState({});
  const [realEstateItems, setRealEstateItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    console.log({ items });
    // Load real estate data
    const properties = getAllProperties();
    const featured = getFeaturedProperties();
    setRealEstateItems(properties);
    setFeaturedProperties(featured);
  }, []);

  //

  const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const nftABI = nftData.abi;
  const marketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const marketplaceABI = marketplaceData.abi;

  const loadMarketplaceItems = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // setMarketplace1(marketplace);
        // setNft1(nft);
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const nft2 = new ethers.Contract(nftAddress, nftABI, signer);
        setNft2(nft2);
        const marketplace2 = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );
        setMarketplace2(marketplace2);
        // console.log("this is marketplace1", marketplace1);
        console.log("this is marketplace2", marketplace2);

        const itemCount = await marketplace2.itemCount();

        console.log("ITEM COUNT => ", itemCount);

        let items = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await marketplace2.items(i);
          if (!item.sold) {
            // get uri url from nft contract
            const uri = await nft2.tokenURI(item.tokenId);
            // use uri to fetch the nft metadata stored on ipfs
            const response = await fetch(uri);
            const metadata = await response.json();
            // get total price of item (item price + fee)
            const totalPrice = await marketplace2.getTotalPrice(item.itemId);
            // Add item to items array
            items.push({
              totalPrice,
              itemId: item.itemId,
              seller: item.seller,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
              bedrooms: metadata.bedrooms,
              bathrooms: metadata.bathrooms,
              yearBuilt: metadata.yearBuilt,
              units: metadata.units,
              propertyAddress: metadata.propertyAddress,
              propertyCity: metadata.propertyCity,
              propertyState: metadata.propertyState,
              zipCode: metadata.zipCode,
              increment: metadata.increment,
              endTime: metadata.endTime,
            });
          }
        }

        setItems(items);
        console.log("these are items", items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleProp = (item) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  // Real estate search and filter functions
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setRealEstateItems(getAllProperties());
    } else {
      const results = searchProperties(query);
      setRealEstateItems(results);
    }
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    if (type === "All") {
      setRealEstateItems(getAllProperties());
    } else {
      const filtered = filterByType(type);
      setRealEstateItems(filtered);
    }
  };

 
  const buyMarketItem = async (item) => {
    await (await marketplace2.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }
  
  const navigate = useNavigate();

  const toggleSwitcher = () => {
    var i = document.getElementById("style-switcher");
    if (i) {
      if (i.style.left === "-189px") {
        i.style.left = "0px";
      } else {
        i.style.left = "-189px";
      }
    }
  };

  const bestCreator = [
    {
      profileIcon: true,
      image: client01,
      name: "StreetBoy",
      usdt: "20.5 ETH",
    },
    {
      profileIcon: false,
      image: client13,
      name: "FunnyGuy",
      eth: "20.5 ETH",
    },
    {
      profileIcon: true,
      image: client02,
      name: "CutieGirl",
      eth: "20.5 ETH",
    },
    {
      profileIcon: true,
      image: client09,
      name: "PandaOne",
      eth: "20.5 ETH",
    },
    {
      profileIcon: false,
      image: client03,
      name: "NorseQueen",
      eth: "20.5 ETH",
    },
    {
      profileIcon: false,
      image: client04,
      name: "BigBull",
      eth: "20.5 ETH",
    },
    {
      profileIcon: true,
      image: client10,
      name: "KristyHoney",
      eth: "20.5 ETH",
    },
    {
      profileIcon: false,
      image: client05,
      name: "Angel",
      eth: "20.5 ETH",
    },
    {
      profileIcon: true,
      image: client11,
      name: "ButterFly",
      eth: "20.5 ETH",
    },
    {
      profileIcon: true,
      image: client06,
      name: "CrazyAnyone",
      eth: "20.5 ETH",
    },
    {
      profileIcon: false,
      image: client07,
      name: "LooserBad",
      eth: "20.5 ETH",
    },
    {
      profileIcon: true,
      image: client12,
      name: "Princess",
      eth: "20.5 ETH",
    },
  ];

  const HomeData = [
    {
      image: home10,
      title: "8999 Franklin Trenton Rd, Franklin, OH 45005",
      type: "Rental",
      filter: ["all", "rental"],
      payment: "$1,426/month",
    },
    {
      image: home9,
      title: "112 Cottage St, Camden, OH 45311",

      filter: ["all", "mortgage"],
      payment: "$2,426/month",
    },
    {
      image: home3,
      title: "310 Donna Dr, Camden, OH 45311",

      filter: ["all", "mortgage"],
      payment: "$3,426/month",
    },
    {
      image: home4,
      title: "31 S Lafayette St, Camden, OH 45311",
      type: "Homes",
      filter: ["all", "homes"],
      payment: "$4,426/month",
    },
    {
      image: home5,
      title: "4820 Hollywreath Ct, Dayton, OH 45424",
      type: "Rental",
      filter: ["all", "rental"],
      payment: "$5,426/month",
    },
    {
      image: home6,
      title: "2276 Cobblestone Ct, Beavercreek, OH 45431",
      type: "Homes",
      filter: ["all", "homes"],
      payment: "$6,426/month",
    },
    {
      image: home7,
      title: "4754 Fox Run, Fairborn, OH 45324",
      type: "Rental",
      filter: ["all", "rental"],
      payment: "$10,426/month",
    },
    {
      image: home8,
      title: "9755 Olde Park Dr, Tipp City, OH 45371Contemporary Abstract",
      type: "Rental",
      filter: ["all", "rental"],
      payment: "$11,426/month",
    },
  ];

  const blogList = [
    {
      image: bg1,
      title: "Mindfulness Activities for Kids & Toddlers with NFT",
      createdBy: "@callyjoe",
      type: "Arts",
    },
    {
      image: bg2,
      title: "Save Thousands Of Lives Through This NFT",
      createdBy: "@kristyhoney",
      type: "Illustration",
    },
    {
      image: bg3,
      title: "A place where technology meets craftsmanship",
      createdBy: "@pandaone",
      type: "Music",
    },
  ];
  const liveAuctions = [
    {
      image: home10,
      title: "9755 Olde Park Dr, Tipp City, OH 45371Contemporary Abstract",
      id: "July 01, 2022 1:6:6",

      client: client11,
      author: "Butterfly",
    },
    {
      image: home8,
      title: "4754 Fox Run, Fairborn, OH 45324",
      id: "July 15, 2022 2:5:5",

      client: client04,
      author: "BigBull",
    },
    {
      image: home4,
      title: "2276 Cobblestone Ct, Beavercreek, OH 45431",
      id: "Aug 08, 2022 5:1:4",

      client: client12,
      author: "Princess",
    },
    {
      image: home9,
      title: "31 S Lafayette St, Camden, OH 45311",
      id: "Aug 20, 2022 1:6:3",

      client: client13,
      author: "KristyHoney",
    },
  ];
  const [allData, setAllData] = useState(HomeData);
  const [type, setType] = useState("all");
  const location = useLocation();

  useEffect(() => {
    loadMarketplaceItems();
    setTimeout(() => {
      if (location?.pathname === "/index-three-dark-rtl") {
        document.getElementById("theme-opt").href =
          "./css/style-dark-rtl.min.css";
      } else if (location?.pathname === "/index-three") {
        document.getElementById("theme-opt").href = "./css/style.min.css";
      } else if (location?.pathname === "/index-three-rtl") {
        document.getElementById("theme-opt").href = "./css/style-rtl.min.css";
      } else {
        document.getElementById("theme-opt").href = "./css/style-dark.min.css";
      }
      toggleSwitcher(false);
    }, 100);
  }, [location?.pathname]);

  const setFilter = (type) => {
    setType(type);
    const newOne = HomeData?.filter((data) => data?.filter?.includes(type));
    setAllData(newOne);
  };
  return (
    <>
      {/* Start Home */}
      <section
        className="bg-half-260 d-flex align-items-center bg-dark"
        style={{
          background: `url(${bgImage})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="container z-index-1">
          <div className="background-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h4 className="heading text-white mb-4 title-dark fw-bold">
                  The Biggest <br /> Collections of Digital Art Assets
                </h4>
                <p className="text-white title-dark mb-0 para-desc mx-auto">
                  Welcome to DIGIMINT
                </p>

                <div className="mt-4 pt-2">
                  <a
                    href="/aboutus"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/aboutus");
                    }}
                    className="btn btn-primary rounded-md"
                  >
                    Discover Now
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End Home */}

      {/* Start */}
      <section className="section">
        {/*end container*/}

        {/*end container*/}

        <div className="container mt-100 mt-60">
          <div className="row align-items-end mb-5 pb-3">
            <div className="col-lg-4">
              <div className="section-title mb-4 mb-lg-0">
                <h4 className="title mb-2">Art Recommendations</h4>
                <p className="text-muted mb-0">Best Art Recommendations</p>
              </div>
            </div>
            {/*end slide*/}

           
          </div>
          {/*end row*/}

          {items?.length ? (
            <div
              className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4"
              id="grid"
              style={{ justifyContent: "left" }}
            >
              {items.map((item, idx) => {
                console.log("this is sis item",item)
                console.log("itemId",ethers.utils.formatEther(item?.itemId))

                return (
                  <div className="col picture-item" key={idx}>
                    <div className="card bg-white nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                      <div className="nft-image position-relative overflow-hidden">
                        {/* <a  onClick={() => toggleProp(item)} key={idx}>
                          <img src={item.image} className="img-fluid" alt="" />
                        </a> */}
                        <Link to={`/item/${ethers.utils.formatEther(item?.itemId)}`}   key={idx}>
                          <img src={item.image} className="img-fluid" alt="" />
                        </Link>
                      </div>

                      <div className="card-body content position-relative">
                        <p
                         
                          className="title text-dark h6"
                        >
                          {item.name}
                        </p>

                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <div className="">
                            <small className="mb-0 d-block fw-semibold">
                              Current Price:
                            </small>
                            <small className="rate fw-bold">
                              {ethers.utils.formatEther(item.totalPrice)}  ETH
                            </small>
                          </div>
                         
                          <button className="btn btn-icon btn-pills btn-primary">
                          <i onClick={() => buyMarketItem(item)} className="uil uil-shopping-bag"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/*end col*/}
            </div>
          ) : (
            <main style={{ padding: "1rem 0" }}>
              <h2>No listed art works yet.....</h2>
            </main>
          )}

          {toggle && (
            <ItemDetail
              item={item}
              marketplace={marketplace2}
              toggleProp={toggleProp}
              setItems={setItems}
              nft={nft2}
            />
          )}
          {/*end row*/}

          <div className="row">

          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

       
        

        <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col">
              <div className="section-two rounded-md shadow bg-gradient-primary px-md-5 px-4">
                <div className="row align-items-end">
                  <div className="col-md-8">
                    <div className="section-title text-md-start text-center">
                      <h6 className="text-white-50 mb-1">
                        Join with Rethestate Community
                      </h6>
                      <h4 className="title text-white title-dark mb-4">
                        Real Estate Valuation Tool!
                      </h4>

                      <p className="text-white-50 para-desc mb-0">
                        ‘I must create a system or be enslaved by another man’s;
                        I will not reason and compare: my business is to
                        create.’ -William Blake
                      </p>
                    </div>
                  </div>
                  {/*end col*/}

                 
                </div>
                {/*end row*/}
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

       

        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End */}
      {/* footer */}
      {/* <Footer /> */}

      {/* Style switcher  */}
      <StyleSwitcher />
    </>
  );
};

export default DarkVersionThree;
