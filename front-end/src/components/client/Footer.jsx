import React from 'react'
import { PiCopyright } from "react-icons/pi";
import { LiaWhatsapp } from "react-icons/lia";
import { PiFigmaLogoLight } from "react-icons/pi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";


const Footer = () => {
    return (
        <div className='bg-[#fff3e5]'>

            <div>

                <div className='flex justify-center items-center space-x-52'>

                    <div>
                        <h1 className='text-2xl font-bold ml-4'>The</h1>
                        <h1 className='text-2xl font-bold'>Groove</h1>
                        <div className='mt-32 mb-8'>
                            <p>(+254)758 012 249</p>
                            <p>info@The.Groove.co.ke</p>
                        </div>

                    </div>

                    <div>
                        <h1 className='font-bold ml-24'>Address</h1>
                        <div className='mt-32 mb-8'>
                            <p className='ml-14'>P.O.BOX 10253-00400</p>
                            <p>4th Floor Royal Offices, Mogotio Road,</p>
                            <p className='ml-12'>Westlands,Nairobi,Kenya</p>
                        </div>

                    </div>

                    <div>
                        <h1 className='font-bold mt-5'>Quick Links</h1>
                        <div className='mt-32 mb-8'>
                            <ul>
                                <li>Home</li>
                                <li>About</li>
                                <li>listings</li>
                                <li>Terms and Conditions</li>
                            </ul>
                        </div>

                    </div>

                </div>

                <div className='mt-8 mb-11 flex'>
                    <div className='flex ml-20 mb-8 mt-5'>
                        <PiCopyright className='mt-1' />
                        <p className='mb-11'> 2024 The Groove. All Rights Reserved.</p>
                    </div>

                    <div className='mt-1 ml-[500px]'>
                        <p className='font-semibold'>Follow Us</p>
                        <div className='flex space-x-4 mt-3'>
                            <CiFacebook />
                            <PiYoutubeLogoLight />
                            <PiFigmaLogoLight />
                            <LiaWhatsapp />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Footer