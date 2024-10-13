import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 pt-10">
            <div className="lg:container mx-auto lg:px-4 md:px-2 px-5 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        {/* Icon or logo */}
                        <div className="bg-[--primary] h-6 w-6 rounded-full mr-2"></div>
                        <span className="font-bold text-lg">The Blessed Trip Manager.</span>
                    </div>
                    <p></p>
                    <p className="text-gray-500 mt-2">The Blessed Trip , 2024.</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Platform</h4>
                    <ul>
                        <li className="mb-1 hover:underline">Plans & Pricing</li>
                        <li className="mb-1 hover:underline">Plans Manager</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Categories</h4>
                    <ul className="grid grid-cols-2">
                        <li className="mb-1 hover:underline">Island</li>
                        <li className="mb-1 hover:underline">Beach</li>
                        <li className="mb-1 hover:underline">Animals</li>
                        <li className="mb-1 hover:underline">Activities</li>
                        <li className="mb-1 hover:underline">Shopping</li>
                        <li className="mb-1 hover:underline">Restuarant</li>
                        <li className="mb-1 hover:underline">Spa</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Get the app</h4>
                    <div className="flex space-x-2">
                        <Link href="#" className="" ><Image src={"/images/googleplay.svg"} alt="Google play" width={200} height={300} /></Link >
                        <Link href="#" className="" ><Image src={"/images/appstore.svg"} alt="App store" width={200} height={300} /></Link >
                    </div>
                </div>
            </div>

            <div className="bg-[--primary] text-white py-4">
                <div className="lg:container mx-auto px-4 flex lg:flex-row flex-col justify-between">
                    <span>&copy; 2025 The Blessed Trip Manager. All rights reserved.</span>
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