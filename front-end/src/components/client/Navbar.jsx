import React from 'react'
import { FaBars } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>

            <div name='navbar' className='flex justify-between items-center w-full h-14 fixed text-black px-4 bg-[#FCE8CF] shadow-md p-8'>
                <div>
                    <h1 className='text-4xl font-signature ml-2'>The Groove</h1>
                </div>
                <div className='flex justify-center space-x-4 font-bold '>

                    <NavLink
                        to="/"
                        /* add styling to Navlink */
                        className="cursor-pointer hover:scale-105 duration-200"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className='cursor-pointer hover:scale-105 duration-200'
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/listing"
                        className="nav-link cursor-pointer hover:scale-105 duration-200"
                    >
                        Listing
                    </NavLink>
                    <NavLink
                        to="/agents"
                        className="nav-link cursor-pointer hover:scale-105 duration-200"
                    >
                        Agents
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="nav-link cursor-pointer hover:scale-105 duration-200"
                    >
                        Contact
                    </NavLink>

                </div>
                <div className=' flex cursor-pointer pr-4 z-10'>
                    <ul className='flex space-x-4'>
                        <li> <VscAccount size={30} /></li>
                        <li><FaBars size={30} /></li>
                    </ul>
                </div>
            </div>

        </header>

    )
}

export default Navbar