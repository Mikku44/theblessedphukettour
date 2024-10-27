import { Button } from "flowbite-react";
import Link from "next/link";

export default function Page() {
    return <>
        <section className="relative h-screen flex items-center justify-center mt-[-100px] bg-gray-800">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.pexels.com/photos/17422289/pexels-photo-17422289.jpeg?cs=srgb&dl=pexels-aykutekinci-17422289.jpg&fm=jpg" // Replace with the path to your hero image
                    alt="Luxury Car"
                    className="opacity-60 w-full h-full object-cover"
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl font-bold mb-4">
                    Discover Your Perfect Beach in Phuket!
                </h1>
                <p className="text-lg mb-8">
                    Luxury, comfort, and adventure – find the perfect beach for every journey.
                </p>

            </div>
        </section>


        <section className="grid justify-items-center py-10 text-center mx-auto w-[80vw]">
            <div className="text-3xl font-bold">Explore our recommendations</div>
            <div className="text-xl">Start planning your unforgettable beach adventure today!</div>
        </section>


        <section className="mx-auto py-10 w-[70vw] gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {[1,2,3,4,5].map(item => <Link key={item} href="/categories/beach/someid">
                <div  className="shadow-sm group overflow-clip">
                    <div className="bg-black h-[200px] overflow-clip">
                        <img src="https://i2.pickpik.com/photos/417/944/1012/phi-phi-island-tour-phuket-thailand-beach-preview.jpg" className="group-hover:scale-105 duration-150 h-full object-cover" alt="" />
                    </div>
                    <div className="p-5">
                        <div className="flex gap-2 justify-between">
                            <div className="text-xl font-bold">Patong beach</div>
                            <Button>See</Button>
                        </div>
                        <div className="text-sm line-clamp-2 text-ellipsis">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde ad consectetur reprehenderit, eum libero quibusdam perspiciatis exercitationem sunt iusto molestiae.</div>
                    </div>
                </div>
            </Link>)}
        </section>

    </>
}