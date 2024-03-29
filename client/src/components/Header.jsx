import { FaSearch } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm,setSearchTerm]=useState('');
  const navigate=useNavigate()


  const handleSearchTerm=(e)=>{
    setSearchTerm(e.target.value);
  }
  const handleSubmit=(e)=>{
e.preventDefault();
//This method  allows you to easily parse and manipulate query parameters from a URL.
// we can directly handle the query of the url eaisly

const urlParams = new URLSearchParams(window.location.search);
urlParams.set('searchTerm', searchTerm);
const searchQuery = urlParams.toString();
navigate(`/search?${searchQuery}`);
  }
useEffect(()=>{
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  if (searchTermFromUrl) {
    setSearchTerm(searchTermFromUrl);
  }
},[location.search])

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-600'>Neighborhood</span>
            <span className='text-slate-700'>Nest</span>
          </h1>
        </Link>
        <form
          
          className='bg-slate-100 p-3 rounded-lg flex items-center'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            onChange={handleSearchTerm}
            value={searchTerm}
          />
          <button type='submit'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}