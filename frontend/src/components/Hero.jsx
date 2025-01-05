import React from 'react';
import Search from './Search';

const Hero = ({ onFilterChange }) => {
  return (
    <div>
      <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]'>
        <h2 className='text-lg'>Your Ultimate Destination for Trusted Car Information</h2>
        <h2 className='text-[60px] font-bold'>find your dream car</h2>
        <Search onFilterChange={onFilterChange} />
        <img src="/demo.png" alt="" className='mt-10' />
      </div>
    </div>
  );
};

export default Hero;
