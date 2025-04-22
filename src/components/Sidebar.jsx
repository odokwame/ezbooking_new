import React from 'react'
import { FaHome, FaUser, FaCog,FaSettings,FaInbox } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='w-46 bg-gray-800 fixed h-full'>
    <div className='my-2 mb-4'>
        <h1 className='text-2x tex-white font-bold'>dashboard</h1>
        <hr /> 
        <ul className='mt-3 text-white font-bold'>
            <li className='text-2x text-white font-bold py-2 px-4 hover:bg-ble-300'>
                <a href="" className='px-3'>
                    <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'/> Home
                </a>
            </li>
            <li className='text-2x text-white font-bold py-2 px-4 hover:bg-ble-300'>
                <a href="" className='px-3'>
                    <FaUser className='inline-block w-6 h-6 mr-2 -mt-2'/> Home
                </a>
            </li>
            <li className='text-2x text-white font-bold py-2 px-4 hover:bg-ble-300'>
                <a href="" className='px-3'>
                    <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'/> Bookings 
                </a>
            </li>
            <li className='text-2x text-white font-bold py-2 px-4 hover:bg-ble-300'>
                <a href="" className='px-3'>
                    <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'/> Facilities
                </a>
            </li>
            <li className='text-2x text-white font-bold py-2 px-4 hover:bg-ble-300'>
                <a href="" className='px-3'>
                    <FaInbox className='inline-block w-6 h-6 mr-2 -mt-2'/> Inbox
                </a>
            </li>
            <li className='text-2x text-white font-bold py-2 px-4 hover:bg-ble-300'>
                <a href="" className='px-3'>
                    <FaSettings className='inline-block w-6 h-6 mr-2 -mt-2'/> Settings
                </a>
            </li>
        </ul>
    </div>
    </div>
  )
}

export default Sidebar
