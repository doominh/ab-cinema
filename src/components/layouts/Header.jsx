import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="header flex items-center justify-between py-5 px-5 md:px-10 md:justify-evenly bg-gray-900 text-white">
            <div className='w-[120px]'>
                <Link to="/">
                    <img src="/logo.png" alt="" className='w-full' />
                </Link>
            </div>
            <nav className="hidden md:flex gap-x-5">
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary transition-all' : ''}>Home</NavLink>
                <NavLink to='/movies' className={({ isActive }) => isActive ? 'text-primary transition-all' : ''}>Movies</NavLink>
            </nav>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                        <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 left-0 z-10 p-5 bg-slate-800 rounded-b-md shadow-md flex flex-col items-center">
                        <NavLink to='/' className={({ isActive }) => isActive ? 'block text-primary transition-all py-2' : 'block py-2'}>
                            Home
                        </NavLink>
                        <NavLink to='/movies' className={({ isActive }) => isActive ? 'block text-primary transition-all py-2' : 'block py-2'}>
                            Movies
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;