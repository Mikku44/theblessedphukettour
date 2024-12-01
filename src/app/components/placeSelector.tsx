'use client'
import {
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { useState } from "react";


const defaultPlaces = [
  { label: "Phuket Fantasy", value: "Phuket Fantasy", description: "The second most popular pet in the world" },
  { label: "Surin Beach", value: "Surin Beach", description: "The most popular pet in the world" },

];
export default function PlaceSelector({ onChange }: any) {
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState('');
  const searchPlaces = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      
      setPlaces(convertToItems(result));
      console.log(result); // List of matching places
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const convertToItems = (places) =>{
    return places.map(place => ({
      label:place.display_name,
      value:place.name
    })) || []
  }

  return (
    <div className="relative">
      <Input

        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          searchPlaces(e.target.value)}}
        placeholder="Search for places..."
        classNames={{ input: "border-none" }}
        className="p-2 border-none border-gray-300 rounded-xl w-full "
      />

      {places.length > 0 &&(
        <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto z-10">
          {places.map((item, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setPlaces([])
                setValue(item.value)
                onChange(item.value)}}  // Assuming item has a 'name' property
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <Autocomplete
      defaultItems={places}
      label="Pick up place"
      placeholder="Search the place to pick up"
      className="border-none"
      classNames={{

        base: "border-none my-2 focus:border-none active:border-none ring-none rounded-xl"
      }}
      style={{ border: "none" }}
      onInputChange={value => searchPlaces(value)}
      onSelectionChange={(e) => {

        onChange(e)
      }}
    >
      {(item) => <AutocompleteItem key={item.value} >{item.label}</AutocompleteItem>}
    </Autocomplete>
  );
}


