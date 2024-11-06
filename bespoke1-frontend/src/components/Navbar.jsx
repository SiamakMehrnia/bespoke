import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'garden'
  );
  const { userData, setUserData } = useAuth();
  const [isCookieAvailable, setIsCookieAvailable] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getCookieValue = (name) => {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
    setIsCookieAvailable(false);
    setUserData(null);
    navigate('/');
  };

  useEffect(() => {
    const token = getCookieValue('token');

    if (token) {
      setIsCookieAvailable(true);
    } else {
      setIsCookieAvailable(false);
      setUserData(null);
      navigate('/');
    }
  }, [userData]);

  const handleChange = (e) => {
    setTheme(e.target.checked ? 'dark' : 'garden');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className='navbar bg-base-300'>
        {/* Links - Theme-Toggle und optionale Begrüßung */}
        <div className='flex-1 flex items-center'>
          <label className='swap swap-rotate mr-4'>
            <input
              type='checkbox'
              onChange={handleChange}
              checked={theme === 'dark'}
            />
            {/* Sonne für dunkles Theme */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='swap-on size-6 text-[#67817d]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
              />
            </svg>
            {/* Mond für helles Theme */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='swap-off size-6 text-[#67817d]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
              />
            </svg>
          </label>
          {isCookieAvailable && userData && (
            <div className='flex'>
              <h2 className='xs:text-xs text-lg font-semibold text-[#67817d] '>
                Welcome {userData.firstName}
              </h2>
            </div>
          )}
        </div>
        {/* Logo nur anzeigen, wenn die aktuelle Route nicht "/" ist */}
        {location.pathname !== '/' && (
          <div className='flex-none'>
            <Link to='/home'>
              {' '}
              <img
                src='/Bespoke!Logo.webp' // Logo aus dem public Ordner
                alt='Logo'
                className='h-20 w-auto mx-auto'
              />
            </Link>
          </div>
        )}
        <div className='flex-1 flex justify-end'>
          <ul className='menu menu-horizontal px-1'>
            {isCookieAvailable ? (
              <>
                <li>
                  <Link
                    to='/home'
                    className=' transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/Profile'
                    className=' transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/search'
                    className='transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                  >
                    Search
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => deleteCookie('token')}
                    className=' btn btn-sm transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li></li>
            )}
          </ul>
        </div>
        <Link to='Profile'>
          <img
            className='w-12 h-12 rounded-full ml-4 hover:opacity-50'
            alt='profileImage'
            src={userData.image}
          />
        </Link>
      </div>
      {userData && isCookieAvailable && (
        <div className='navbar bg-base-300'>
          <div className='flex-1 flex items-center'>
            <label className='swap swap-rotate mr-4'>
              <input
                type='checkbox'
                onChange={handleChange}
                checked={theme === 'dark'}
              />
              {/* Sonne für dunkles Theme */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='swap-on size-6 text-[#67817d]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                />
              </svg>
              {/* Mond für helles Theme */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='swap-off size-6 text-[#67817d]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
                />
              </svg>
            </label>
            <h2 className='xs:text-xs text-lg font-semibold text-[#67817d] '>
              Welcome {userData.firstName}
            </h2>
          </div>

          {location.pathname !== '/' && (
            <div className='flex-none'>
              <Link to='/home'>
                <img
                  src='/Bespoke!Logo.webp'
                  alt='Logo'
                  className='h-20 w-auto mx-auto'
                />
              </Link>
            </div>
          )}

          <div className='flex-1 flex justify-end'>
            <ul className='menu menu-horizontal px-1 font-semibold'>
              <li>
                <Link
                  to='/home'
                  className='transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/Profile'
                  className='transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to='/search'
                  className='transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                >
                  Search
                </Link>
              </li>
              <li>
                <button
                  onClick={() => deleteCookie('token')}
                  className='btn btn-sm transition transform duration-200 text-[#67817d] hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded'
                >
                  Logout
                </button>
              </li>
            </ul>
            <Link to='Profile'>
              <img
                src={
                  userData.image && userData.image.trim() !== ''
                    ? userData.image
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt='Profile'
                className='rounded-full h-10'
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
