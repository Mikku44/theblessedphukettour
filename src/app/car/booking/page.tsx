'use client'
import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button, Datepicker } from 'flowbite-react';

const BookingForm = () => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    passportNumber: '',
    phoneNumber: '',
    email: '',
    otherContact: '',
    pickupTime: '',
    placePickup: '',
    note: '',
    date: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Number of Adults:', numAdults);
    console.log('Number of Children:', numChildren);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 grid gap-4 lg:w-[50vw] md:w-[70vw] w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Car Booking Form</h2>

      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
      <input
        id="firstname"
        name="firstname"
        type="text"
        placeholder="Enter your first name"
        value={formData.firstname}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
      <input
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Enter your last name"
        value={formData.lastname}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">Passport Number</label>
      <input
        id="passportNumber"
        name="passportNumber"
        type="text"
        placeholder="E.g., A12345678"
        value={formData.passportNumber}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="yourname@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        placeholder="+1 234 567 890"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="otherContact" className="block text-sm font-medium text-gray-700">
        Other Contact (e.g., WhatsApp, LINE)
      </label>
      <input
        id="otherContact"
        name="otherContact"
        type="text"
        placeholder="Enter additional contact method if any"
        value={formData.otherContact}
        onChange={handleChange}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <div className="mt-4">
        <label>Pickup Time</label>
        <input
          id="pickupTime"
          name="pickupTime"
          type="time"
          value={formData.pickupTime}
          onChange={handleChange}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
        />
      </div>

      <div className="mt-4">
        <label>Date</label>
        <Datepicker onChange={(date) => handleDateChange(date as unknown as Date)} />
      </div>

      <label htmlFor="placePickup" className="block text-sm font-medium text-gray-700">Place of Pickup</label>
      <input
        id="placePickup"
        name="placePickup"
        type="text"
        placeholder="E.g., Hotel Lobby, Airport Terminal"
        value={formData.placePickup}
        onChange={handleChange}
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
      <input
        id="note"
        name="note"
        type="text"
        placeholder="Additional details or requirements"
        value={formData.note}
        onChange={handleChange}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[--primary] focus:border-[--primary] sm:text-sm"
      />

      <Button type="submit" className="mt-6 bg-[--primary]">
        Submit
      </Button>
    </form>
  );
};

export default BookingForm;
