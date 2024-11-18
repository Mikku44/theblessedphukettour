import {
    Autocomplete,
    AutocompleteItem
  } from "@nextui-org/autocomplete";

export default function PlaceSelector() {
  return (
    <Autocomplete
      defaultItems={places}
      label="Pick up place"
      placeholder="Search the place to pick up"
      className=""
      classNames={{
        base:"border-none my-2 focus:border-none active:border-none ring-none rounded-xl"
      }}
    >
      {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
    </Autocomplete>
  );
}


const places = [
    {label: "Phuket Fantasy", value: "Phuket Fantasy", description: "The second most popular pet in the world"},
    {label: "Surin Beach", value: "Surin Beach", description: "The most popular pet in the world"},
    
  ];