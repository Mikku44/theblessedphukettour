
"use client";

import { Card } from "flowbite-react";

export default function CarCard({imageUrl,title}:any) {
  return (
    <Card
      className="max-w-sm group duration-150 "
      imgAlt="Meaningful alt text for an image that is not purely decorative"
  
      imgSrc={imageUrl || "/images/blog/image-1.jpg"}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
  );
}
