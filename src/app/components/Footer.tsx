import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 pt-10">
            <div className="lg:container mx-auto lg:px-4 md:px-2 px-5 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
               

                <div>
                    <h4 className="font-semibold mb-2">Customer support</h4>
                    <div>
                        <div className="mb-1 hover:underline">Help center</div>
                        <div className="mb-1 hover:underline">Refund policy</div>
                        <div className="mb-1 hover:underline">Rate us</div>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">About jalanista</h4>
                    <div>
                        <div className="mb-1 hover:underline">About us</div>
                        <div className="mb-1 hover:underline">Coordonate with us</div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Follow us on</h4>
                    <div className="grid gap-2">
                        <div className="mb-1 hover:underline"><Facebook className="inline mr-1"/>Facebook</div>
                        <div className="mb-1 hover:underline"><Instagram className="inline mr-1" />Instagram</div>
                        <div className="mb-1 hover:underline"><img src="/icons/tiktok.png" alt="tiktok icon" className="mr-2 size-6 inline"/>TikTok</div>
                        <div className="mb-1 hover:underline"><img src="/icons/snapchat.png" alt="snapchat icon" className="mr-2 size-6 inline"/>Snapchat</div>
             
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Get <span className="text-red-700">Jalanista </span>on</h4>
                    <div className="flex flex-col gap-2">
                        <Link href="#" className="" ><Image src={"/images/googleplay.svg"} alt="Google play" width={200} height={300} /></Link >
                        <Link href="#" className="" ><Image src={"/images/appstore.svg"} alt="App store" width={200} height={300} /></Link >
                    </div>
                    <div className="py-5">
                        <div className="text-sm font-bold">Payment Method</div>
                        <Image src={"/images/paymentmethods.png?data=1"} alt="stripe payment" className="ml-[-10px] py-2 px-1" width={300} height={300} />
                        {/* <Image src={"/images/stripe.png"} alt="stripe payment" className="ml-[-10px]" width={200} height={300} /> */}
                    </div>
                </div>


            </div>

            <div className="bg-[--primary] text-white py-4">
                <div className="lg:container mx-auto px-4 flex lg:flex-row flex-col justify-between">
                    <span>&copy; 2025 Jalanista Trip Manager. All rights reserved.</span>
                    <div className="flex lg:flex-row flex-col gap-4 lg:py-0 py-4">
                        <a href="#" className="hover:underline">Terms of Service</a>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}