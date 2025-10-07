import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/movies?query=${encodeURIComponent(searchTerm)}`);
        if (isMenuOpen) {
            closeMenu();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setHasInteracted(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setHasInteracted(true);
    };
    useEffect(() => {
        setSearchTerm("");
    }, [location.pathname]);

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
            <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                    type="text"
                    placeholder="Tìm kiếm phim..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-4 pr-10 py-2 rounded-full bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_11775_10840)">
                            <path d="M15.8483 15.1295L11.7174 11.0646C12.7991 9.8893 13.4638 8.33495 13.4638 6.62455C13.4633 2.96568 10.4496 0 6.7317 0C3.01382 0 0.00012207 2.96568 0.00012207 6.62455C0.00012207 10.2834 3.01382 13.2491 6.7317 13.2491C8.33808 13.2491 9.81141 12.6935 10.9687 11.7697L15.1157 15.8507C15.3177 16.0498 15.6458 16.0498 15.8478 15.8507C16.0504 15.6517 16.0504 15.3286 15.8483 15.1295ZM6.7317 12.2299C3.58597 12.2299 1.03587 9.72029 1.03587 6.62455C1.03587 3.52881 3.58597 1.01923 6.7317 1.01923C9.87745 1.01923 12.4275 3.52881 12.4275 6.62455C12.4275 9.72029 9.87745 12.2299 6.7317 12.2299Z" fill="currentColor" />
                        </g>
                        <defs>
                            <clipPath id="clip0_11775_10840">
                                <rect width="20" height="20" fill="currentColor" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </form>
            {/* tablet mobile */}
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
                        <form
                            onSubmit={handleSearch}
                            className="relative w-full max-w-xs mb-5"
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 rounded-full bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15.8483 15.1295L11.7174 11.0646C12.7991 9.8893 13.4638 8.33495 13.4638 6.62455C13.4633 2.96568 10.4496 0 6.7317 0C3.01382 0 0.00012207 2.96568 0.00012207 6.62455C0.00012207 10.2834 3.01382 13.2491 6.7317 13.2491C8.33808 13.2491 9.81141 12.6935 10.9687 11.7697L15.1157 15.8507C15.3177 16.0498 15.6458 16.0498 15.8478 15.8507C16.0504 15.6517 16.0504 15.3286 15.8483 15.1295ZM6.7317 12.2299C3.58597 12.2299 1.03587 9.72029 1.03587 6.62455C1.03587 3.52881 3.58597 1.01923 6.7317 1.01923C9.87745 1.01923 12.4275 3.52881 12.4275 6.62455C12.4275 9.72029 9.87745 12.2299 6.7317 12.2299Z" />
                                </svg>
                            </button>
                        </form>
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
