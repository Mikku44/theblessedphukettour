'use client'

import React from 'react'

import { StarIcon, UserIcon } from 'lucide-react'
import { Avatar, Card, FooterDivider } from 'flowbite-react'
import { Button } from '@nextui-org/button'

export default function CustomerReview() {
  return (
    <Card className=" w-full">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar
            // icon={<UserIcon className="w-6 h-6" />}
            // src="/placeholder.svg?height=40&width=40"
            alt="Sarah D."
            className="w-10 h-10"
          />
          <div>
            <h5 className="text-lg font-semibold">Sarah D.</h5>
            <p className="text-sm text-default-500">Visited June 2023</p>
          </div>
        </div>
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-5 h-5 ${
                i < 4 ? "text-warning fill-warning" : "text-default-300"
              }`}
            />
          ))}
        </div>
        <h6 className="text-lg font-bold mb-2">
          Amazing experience in Bali!
        </h6>
        <p className="text-default-700 mb-3">
          Our trip to Bali was unforgettable. The beaches were pristine, the local cuisine was delicious, and the people were incredibly friendly. I highly recommend visiting the rice terraces and the monkey forest.
        </p>
      </div>
      <FooterDivider />
      <div className="px-6 py-3">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-default-500">Was this review helpful?</span>
          <div className="space-x-2">
            <Button size="sm" variant="flat">Yes</Button>
            <Button size="sm" variant="flat">No</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}