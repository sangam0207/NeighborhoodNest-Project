
import { useEffect,useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import 'swiper/css/bundle';
export const Listing = () => {
  const {currentUser}=useSelector((state)=>state.user);
  console.log(currentUser);
  SwiperCore.use([Navigation]);
  const {listingId}=useParams();
  const [listingInfo,setListingInfo]=useState(null);
  console.log(listingInfo)
  const[loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [contact,setContact]=useState(false)
  console.log(listingId)
  useEffect(()=>{
    const fetchListing=async()=>{
      try {
        setLoading(true)
        let response=await axios.get(`/api/listing/getListing/${listingId}`);
     console.log(response.data);
     if(response.data.success===false){
      console.log(response.data.message);
      return;
     }
     setListingInfo(response.data)
     setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true)
      }
     
    }
    fetchListing();
    },[listingId])
  return (
   <>
   <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listingInfo && !loading && !error && (
        <div>
          <Swiper navigation>
            {listingInfo.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[450px]  mx-auto'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                    backgroundPosition:'center',
                    opacity:0.9,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listingInfo.name} - ${' '}
              {listingInfo.offer
                ? listingInfo.discountPrice.toLocaleString('en-US')
                : listingInfo.regularPrice.toLocaleString('en-US')}
              {listingInfo.Infotype === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listingInfo.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listingInfo.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listingInfo.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listingInfo.regularPrice - +listingInfo.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listingInfo.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listingInfo.bedrooms > 1
                  ? `${listingInfo.bedrooms} beds `
                  : `${listingInfo.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listingInfo.bathrooms > 1
                  ? `${listingInfo.bathrooms} baths `
                  : `${listingInfo.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listingInfo.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listingInfo.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listingInfo.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listingInfo} />}
            
             
          
        </div>
        </div>
      )}
    </main>
  </>
  )
}

