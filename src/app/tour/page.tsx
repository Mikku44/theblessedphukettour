'use client'
import { Button } from "flowbite-react";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Tour() {
    return <>
        <section className="relative h-screen flex items-center justify-center mt-[-100px] bg-gray-800">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.pexels.com/photos/5057066/pexels-photo-5057066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with the path to your hero image
                    alt="Luxury Car"
                    className="opacity-60 w-full h-full object-cover"
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-5xl font-bold mb-4">
                    Explore Phuket Like Never Before!
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }} className="text-lg mb-8">
                    Book your unforgettable Phuket adventure today!
                </motion.p>

            </div>
        </section>


        <section className="grid justify-items-center py-10 text-center mx-auto w-[80vw]">
            <div className="text-3xl font-bold">Explore our recommendations</div>
            <div className="text-xl">Start planning your unforgettable beach adventure today!</div>
        </section>


        <section className="mx-auto py-10 w-[70vw] gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {[1, 2, 3, 4, 5].map(item => <Link key={item} href="/tour/someid">
                <div className="shadow-md group overflow-clip">
                    <div className="bg-black h-[200px]  overflow-clip">
                        <img src="https://images.pexels.com/photos/18289698/pexels-photo-18289698/free-photo-of-emerald-lagoon-of-thailand.jpeg" className="group-hover:scale-105 duration-150 h-full w-full object-cover" alt="" />
                    </div>
                    <div className="p-5">
                        <div className="flex gap-2 justify-between">
                            <div className="text-xl font-bold">Emerald Lagoon</div>
                            <Button>See</Button>
                        </div>
                        <div className="text-sm line-clamp-2 text-ellipsis">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde ad consectetur reprehenderit, eum libero quibusdam perspiciatis exercitationem sunt iusto molestiae.</div>
                    </div>
                </div>
            </Link>)}
        </section>

    </>
}