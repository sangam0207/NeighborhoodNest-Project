import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import axios from "axios";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";
const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        // const res = await fetch('/api/listing/get?offer=true&limit=4');
        // const data = await res.json();
        const response = await axios.get("/api/listing/get?offer=true&limit=4");
        setOfferListings(response.data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        // const res = await fetch('/api/listing/get?type=rent&limit=4');
        // const data = await res.json();
        const response = await axios.get("/api/listing/get?type=rent&limit=4");

        setRentListings(response.data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        // const res = await fetch('/api/listing/get?type=sale&limit=4');
        // const data = await res.json();
        const response = await axios.get("/api/listing/get?type=sale&limit=4");
        setSaleListings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  SwiperCore.use([Navigation]);
  return (
    <>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-700 text-xs sm:text-sm">
          NeighborhoodNest is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets get started...
        </Link>
      </div>
      {/* Swiper Slide */}
      <div>
        {offerListings.length > 0 && (
          <Swiper navigation>
            {offerListings.map((listing) => (
              <SwiperSlide key={listing.id}>
                <div
                  className="h-[500px]  mx-auto"
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.9,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
<Footer/>
    </>
  );
};

export default Home;
