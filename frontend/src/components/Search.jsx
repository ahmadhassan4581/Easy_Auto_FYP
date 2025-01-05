import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from '@/Shared/Data';

const Search = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    seating: "",
    carMake: "",
    pricing: "",
    fuelType: "",
  });

  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className='p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
      
      <Select onValueChange={(value) => handleChange('seating', value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Seating Capacity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">2 Seats</SelectItem>
          <SelectItem value="4">4 Seats</SelectItem>
          <SelectItem value="7">7 Seats</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(value) => handleChange('carMake', value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {Data.CarMakes.map((maker) => (
            <SelectItem key={maker.id} value={maker.name}>{maker.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(value) => handleChange('pricing', value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((pricing) => (
            <SelectItem key={pricing.id} value={pricing.amount}>{pricing.amount}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(value) => handleChange('fuelType', value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Fuel Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Petrol">Petrol</SelectItem>
          <SelectItem value="Diesel">Diesel</SelectItem>
          <SelectItem value="Electric">Electric</SelectItem>
          <SelectItem value="CNG">CNG</SelectItem>
          <SelectItem value="Hybrid">Hybrid</SelectItem>
        </SelectContent>
      </Select>

      <div>
        <CiSearch className='text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer' />
      </div>
    </div>
  );
};

export default Search;
