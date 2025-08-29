import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setHasInteracted(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setHasInteracted(true);
    };

    return (
        <header className="header flex items-center justify-between py-5 px-5 md:px-10 bg-white dark:bg-slate-900 text-black dark:text-white">
            <div className="w-[120px]">
                <Link to="/">
                    <img src="/logo.png" alt="" className="w-full" />
                </Link>
            </div>
            <nav className="hidden md:flex gap-x-5">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-primary transition-all' : 'text-black dark:text-white'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        isActive ? 'text-primary transition-all' : 'text-black dark:text-white'
                    }
                >
                    Movies
                </NavLink>
            </nav>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-black dark:text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-10"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div
                    className={`absolute min-h-60 right-0 left-0 top-0 p-5 bg-slate-200 dark:bg-slate-800 rounded-b-md shadow-md flex flex-col items-center justify-center
                        ${!hasInteracted
                            ? 'hidden'
                            : isMenuOpen
                                ? 'animate-slideUp z-10'
                                : 'animate-slideDown z-0'
                        }`}
                >
                    <button
                        onClick={closeMenu}
                        className="absolute top-6 right-6 text-black dark:text-white text-2xl hover:text-primary transition"
                    >
                        ✕
                    </button>
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? 'block text-primary transition-all py-2'
                                : 'block py-2 text-black dark:text-white'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/movies"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? 'block text-primary transition-all py-2'
                                : 'block py-2 text-black dark:text-white'
                        }
                    >
                        Movies
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;