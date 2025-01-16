import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "./ModeToggle";
import { IoLanguage } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/user" className="text-2xl font-bold text-gray-800 dark:text-white">
                    SovchiConnect
                </Link>

                {/* Hamburger Menu (for smaller screens) */}
                <button
                    className="md:hidden text-gray-600 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                {/* Center Sections (Hidden on small screens) */}
                <div className="hidden md:flex space-x-8">
                    <Link
                        to="/user/dashboard"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                    >
                        {t("navbar.main_feed")}
                    </Link>
                    <Link
                        to="/user/messenger"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                    >
                        {t("navbar.chat")}
                    </Link>
                    <Link
                        to="/user/profile"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                    >
                        {t("navbar.profile")}
                    </Link>
                </div>

                {/* Right Section */}
                <div className="hidden md:flex items-center space-x-4">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                                <IoLanguage />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => changeLanguage("en")}>
                                {t("language.english")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeLanguage("ru")}>
                                {t("language.russian")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeLanguage("uz")}>
                                {t("language.uzbek")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col space-y-2 p-4">
                        {/* Center Sections */}
                        <Link
                            to="/user/dashboard"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("navbar.main_feed")}
                        </Link>
                        <Link
                            to="/user/messenger"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("navbar.chat")}
                        </Link>
                        <Link
                            to="/user/profile"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("navbar.profile")}
                        </Link>

                        {/* Right Section */}
                        <div className="flex items-center justify-between mt-4">
                            <ModeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                                        <IoLanguage />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => changeLanguage("en")}>
                                        {t("language.english")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("ru")}>
                                        {t("language.russian")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("uz")}>
                                        {t("language.uzbek")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
