
import { useState,useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
const Contact = ({listing}) => {
  const [landlord,setLandlord]=useState(null);
  const [message,setMessage]=useState('')
  useEffect(()=>{
const fetchLandlord=async()=>{
try {
  const response=await axios.get(`/api/user/${listing.userRef}`);
  console.log(response);
  setLandlord(response.data)
} catch (error) {
  console.log(error)
}
}
fetchLandlord();
  },[listing.userRef])
  
  const onChangeMessage=(e)=>{
    setMessage(e.target.value)
    //console.log(message)
  }
  return (
    <>
   {landlord && (
    <div className=" flex flex-col gap-3">
      <p>Contact <span className="font-semibold">{landlord.username}</span> for {" "}
      <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
      <textarea className="mt-2 w-full border p-3 rounded-lg" onChange={onChangeMessage} placeholder="Enter Your Message" name="message" id="message"  rows="2"></textarea>
        {/* You Can Directly send the message(email) to the Landlord */}
      <Link
  to={`mailto:${landlord.email}?subject=Regarding ${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}
  className="text-semibold text-center text-white bg-blue-600 p-2 rounded-lg"
>
  Send Message
</Link>
    </div>
   )}
    </>
  )
}

export default Contact