'use client'
// import LangSwitch from './langSwitch'
// import Link from 'next/link'
// import { Button } from '@nextui-org/button'
// import { useTranslations } from 'next-intl';
// import { getSession } from '../../ultilities/lib';

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { ChevronDown } from "lucide-react";

import Link from "next/link";
import { useState } from "react";


// export default function Navbar(){
//     const t = useTranslations();

//     const session = getSession();
//     return <div className="w-full flex justify-between sticky top-0 py-5 px-10  text-white z-10 bg-black/50 ">
//         <div>LOGO

//             {JSON.stringify(session)}
//         </div>



//         <ul className='lg:grid md:hidden hidden grid-cols-5 gap-5 justify-center items-center justify-items-center duration-150 '>
//             <Link className=' w-full text-center duration-150' href="/" >
//                 <li  className="hover:border-[--primary] border-b-2 border-transparent">{t('Home')}</li>
//             </Link>
//             <Link className=' w-full text-center duration-150' href="/categories">
//                 <li className="hover:border-[--primary] border-b-2 border-transparent">{t('Explore Categories')}</li>
//             </Link>
//             <Link className=' w-full text-center duration-150' href="/car">
//                 <li className="hover:border-[--primary] border-b-2 border-transparent">{t('Car')}</li>
//             </Link>
//             <Link className=' w-full text-center duration-150' href="/tour">
//                 <li className="hover:border-[--primary] border-b-2 border-transparent">{t('Tour')}</li>
//             </Link>
//             <Link className=' w-full text-center duration-150' href="/add-on">
//                 <li className="hover:border-[--primary] border-b-2 border-transparent">{t('AddOns')}</li>

//             </Link>
//         </ul>
//         <div className="w-10"></div>
//         <div className="lg:grid md:hidden hidden grid-flow-col gap-2 absolute right-5 top-3">
//             <LangSwitch />
//             <Link href="/register"><Button variant="light" className='text-white'>Sign Linkp </Button></Link>
//             <Link href="/login"><Button className='bg-[--primary] text-white'>Sign In</Button></Link>
//         </div>
//     </div>
// }





export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Home",
        "Explore Categories",
        "Car",
        "Tour",
        "Add-Ons",

        "Log Out",
    ];

    const categories = [
        {
            name: "Island",
            description: "Explore island"
        },
        {
            name: "Beach",
            description: "Relax at beautiful beaches"
        },
        {
            name: "Activities",
            description: "Enjoy exciting activities"
        },
        {
            name: "Animal",
            description: "Discover wildlife and animals"
        },
        {
            name: "Shopping",
            description: "Shop for unique items and souvenirs"
        },
        {
            name: "Restaurant",
            description: "Dine at the best restaurants"
        },
        {
            name: "Spa",
            description: "Rejuvenate with spa and wellness"
        }
    ];


    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-black/80 text-white"
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    {/* <AcmeLogo /> */}

                    <Link href="/" className="font-bold text-inherit">Home</Link>

                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    {/* <AcmeLogo /> */}

                    <Link href="/" className="font-bold text-inherit">Home</Link>

                </NavbarBrand>
                <NavbarItem isActive>
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                                    endContent={<ChevronDown className="stroke-[1px]" />}
                                    radius="sm"
                                    variant="light"
                                >
                                    Explore Categories
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            // key={index}
                            className="w-[340px]"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >

                            <DropdownItem
                                href={`/${categories[0]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[0]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[0]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[1]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[1]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[1]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[2]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[2]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[2]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[3]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[3]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[3]?.name}
                            </DropdownItem>
                            <DropdownItem
                                href={`/${categories[4]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[4]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[4]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[5]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[5]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[5]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[6]?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={categories[6]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[6]?.name}
                            </DropdownItem>


                        </DropdownMenu>
                        {/* {categories && categories?.map((item, index) => <DropdownMenu
                            key={index}
                            className="w-[340px]"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >

                            <DropdownItem
                                // href={`${item?.name.toLowerCase()}`}
                                key="autoscaling"
                                description={item?.description}
                            // endContent={<>TO</>}
                            >
                                {item?.name}
                            </DropdownItem>


                        </DropdownMenu>)} */}
                    </Dropdown>
                </NavbarItem>
                <NavbarItem >
                    <Link href="/car" aria-current="page">
                        Car
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/tour">
                        Tour
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/add-on">
                        Add Ons
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex" >
                    <Button as={Link} href="/login" className="text-white" variant="light">
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" className="bg-[--primary] text-white" href="/register" variant="flat">
                        Sign Up
                    </Button>

                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
