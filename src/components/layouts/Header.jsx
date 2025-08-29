import { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isMenuOpen]);

    return (
        <header className="header flex items-center justify-between py-5 px-5 md:px-10 bg-slate-900 text-white">
            <div className="w-[120px]">
                <Link to="/">
                    <img src="/logo.png" alt="" className="w-full" />
                </Link>
            </div>
            <nav className="hidden md:flex gap-x-5">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-primary transition-all' : 'text-white'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        isActive ? 'text-primary transition-all' : 'text-white'
                    }
                >
                    Movies
                </NavLink>
            </nav>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white">
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
                    className={`fixed inset-0 flex flex-col transition-all duration-300
                        ${!hasInteracted
                            ? 'hidden'
                            : isMenuOpen
                                ? 'translate-y-0 z-10'
                                : '-translate-y-full z-0'
                        }`}
                >
                    <div className="flex-[2] bg-slate-800 rounded-b-md shadow-md flex flex-col items-center justify-center relative">
                        <button
                            onClick={closeMenu}
                            className="absolute top-6 right-6 text-white text-2xl hover:text-primary transition"
                        >
                            ✕
                        </button>
                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isActive
                                    ? 'block text-primary transition-all py-2'
                                    : 'block py-2 text-white'
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
                                    : 'block py-2 text-white'
                            }
                        >
                            Movies
                        </NavLink>
                    </div>

                    <div
                        className="flex-[3] bg-black/50"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
