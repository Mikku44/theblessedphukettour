'use client'
import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button, Datepicker, } from 'flowbite-react';
const BookingForm = () => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    passportNumber: '',
    phoneNumber: '',
    otherContact: '',
    note: '',
    transService: 'Yes',
    date: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date });
  };

  const handleIncrement = (setFunc: React.Dispatch<React.SetStateAction<number>>) => {
    setFunc((prev) => prev + 1);
  };

  const handleDecrement = (setFunc: React.Dispatch<React.SetStateAction<number>>) => {
    setFunc((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Number of Adults:', numAdults);
    console.log('Number of Children:', numChildren);
  };

  return (
    <div className="p-6 grid gap-4 lg:w-[50vw] md:w-[70vw] w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 ">Booking Island Form</h2>

      
      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
      <input
        id="firstname"
        name="firstname"
        type="firstname"
        autoComplete="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />
      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
      <input
        id="lastname"
        name="lastname"
        type="lastname"
        autoComplete="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">Passport Number</label>

      <input
        id="passportNumber"
        name="passportNumber"
        type="passportNumber"
        autoComplete="passportNumber"
        value={formData.passportNumber}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />
      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>

      <input
        id="phoneNumber"
        name="phoneNumber"
        type="phoneNumber"
        autoComplete="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />


      <label htmlFor="otherContact" className="block text-sm font-medium text-gray-700">Other Contact</label>
      <input
        id="otherContact"
        name="otherContact"
        type="otherContact"
        autoComplete="otherContact"
        value={formData.otherContact}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
      <input
        id="note"
        name="note"
        type="note"
        autoComplete="note"
        value={formData.note}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />


      <div className="mt-4 grid gap-4">
        <label>Trans Service</label>
        <select
          name="transService"
          value={formData.transService}
          //   onChange={handleChange}
          className=" p-2 border rounded-md"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="mt-4">
        <label>Date</label>
        <Datepicker onChange={(date) => handleDateChange(date as unknown as Date)} />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <label>Number of Adults</label>
        <div className="ml-4 flex items-center">
          <Button onClick={() => handleDecrement(setNumAdults)}>-</Button>
          <input className="mx-2 border border-gray-400 rounded-md w-[40px] h-[40px] text-center py-2" value={numAdults}></input>
          <Button onClick={() => handleIncrement(setNumAdults)}>+</Button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <label>Number of Children</label>
        <div className="ml-4 flex items-center">
          <Button onClick={() => handleDecrement(setNumChildren)}>-</Button>
          <input className="mx-2 border border-gray-400 rounded-md w-[40px] h-[40px] text-center py-2" value={numChildren}></input>
          <Button onClick={() => handleIncrement(setNumChildren)}>+</Button>
        </div>
      </div>

      <Button className="mt-6 bg-[--primary]" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default BookingForm;
