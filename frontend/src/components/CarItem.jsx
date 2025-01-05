import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { TbAutomaticGearbox } from "react-icons/tb";
import { MdOpenInNew } from "react-icons/md";

const CarItem = ({ car }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/cars/${car._id}`);  
    };

    return (
        <div onClick={handleClick} className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
            <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">new</h2>
            <img src={car?.imagePath} alt={`${car.make} ${car.model}`} width={'100%'} height={250} className='rounded-t-xl' />
            <div className='p-4'>
                <h2 className='font-bold text-black text-lg mb-2'>
                    {car.make} {car.model} ({car.year})
                </h2>
                <Separator />
                <div className='grid grid-cols-3 mt-5'>
                    <div className='flex flex-col items-center'>
                        <LuFuel className='text-lg mb-2' />
                        <h2>{car.fuelEconomyCity}</h2>
                    </div>

                    <div className='flex flex-col items-center'>
                        <MdOutlineSpeed className='text-lg mb-2' />
                        <h2>{car.fuelType}</h2>
                    </div>

                    <div className='flex flex-col items-center'>
                        <TbAutomaticGearbox className='text-lg mb-2' />
                        <h2>{car.bodyType}</h2>
                    </div>
                </div>
                <Separator className="my-2" /> 
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl">PKR {car.price}</h2>
                    <h2 className="text-primary text-sm flex gap-2 items-center">
                        View Details <MdOpenInNew />
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default CarItem;
