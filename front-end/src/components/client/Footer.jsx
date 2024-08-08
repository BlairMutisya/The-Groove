import React from 'react'
import { LiaWhatsapp } from "react-icons/lia";
import { PiFigmaLogoLight } from "react-icons/pi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
    return (
        <footer className="bg-[#FAE5D3] py-12">
            <div className="max-w-screen-lg mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">The Groove</h3>
                    <p className="text-gray-700">(+254) 758 012 249</p>
                    <p className="text-gray-700">info@The-Groove.co.ke</p>
                </div>

                {/* Address */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">Address</h3>
                    <p className="text-gray-700">P.O.BOX 10253-00400</p>
                    <p className="text-gray-700">
                        4th Floor Royal Offices, 26 Mogotio Road, Westlands, Nairobi,
                        Kenya
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/"
                                className="text-gray-700 hover:text-purple-700 transition"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className="text-gray-700 hover:text-purple-700 transition"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="/listing"
                                className="text-gray-700 hover:text-purple-700 transition"
                            >
                                Listing
                            </a>
                        </li>
                        <li>
                            <a
                                href="/agents"
                                className="text-gray-700 hover:text-purple-700 transition"
                            >
                                Agents 
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto px-4 mt-8 flex justify-between items-center">
                <p className="text-gray-600">
                    © 2024 The Groove. All Rights Reserved.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="text-gray-700 hover:text-purple-700 transition"
                    >
                        <CiFacebook />
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 hover:text-purple-700 transition"
                    >
                        <PiYoutubeLogoLight />
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 hover:text-purple-700 transition"
                    >
                        <PiFigmaLogoLight />
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 hover:text-purple-700 transition"
                    >
                        <LiaWhatsapp />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer