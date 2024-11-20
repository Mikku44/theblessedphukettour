'use client'

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Avatar } from "flowbite-react";
import { ChevronDown, ShoppingBag } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";



export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>();
    const menuItems = [
        "Home",
        "Explore Categories",
        "Car",
        "Tour",
        "Add-Ons",
        "Log Out",
    ];

    async function getUserInfo() {
        const user = await localStorage.getItem('user');
        user && setUser(JSON.parse(user))
    }

    useEffect(() => {
        getUserInfo();
       
    }, []);

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
                    <Link href="/"><img src="/icons/logoonly.png" alt="Jalanista Logo" className="h-[100px] " /></Link>

                    <Link href="/" className="font-bold text-inherit">Home</Link>

                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    {/* <AcmeLogo /> */}
                    <Link href="/"><img src="/icons/logoonly.png" alt="Jalanista Logo" className="h-[100px] " /></Link>
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
                           
                            className="w-[340px]"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >

                            <DropdownItem
                                href={`/${categories[0]?.name.toLowerCase()}`}
                                key="1"
                                description={categories[0]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[0]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[1]?.name.toLowerCase()}`}
                                key="2"
                                description={categories[1]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[1]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[2]?.name.toLowerCase()}`}
                                key="3"
                                description={categories[2]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[2]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[3]?.name.toLowerCase()}`}
                                key="4"
                                description={categories[3]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[3]?.name}
                            </DropdownItem>
                            <DropdownItem
                                href={`/${categories[4]?.name.toLowerCase()}`}
                                key="5"
                                description={categories[4]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[4]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[5]?.name.toLowerCase()}`}
                                key="6"
                                description={categories[5]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[5]?.name}
                            </DropdownItem>

                            <DropdownItem
                                href={`/${categories[6]?.name.toLowerCase()}`}
                                key="7"
                                description={categories[6]?.description}
                            // endContent={<>TO</>}
                            >
                                {categories[6]?.name}
                            </DropdownItem>


                        </DropdownMenu>
                       
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
                {!user ? 
                <>
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
                </>:
                <>
                <NavbarItem>
                    <Button isIconOnly={true} className="text-white" variant="light">
                        <ShoppingBag />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly={true} radius="full" className="text-white" variant="light">
                                <Avatar img={user?.image} className="rounded-full overflow-hidden"></Avatar>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                           {user?.displayName && <DropdownItem>
                                <Link href="#">{user?.displayName}</Link>
                            </DropdownItem>}
                            <DropdownItem>
                                <Link href="#">{user?.email}</Link>
                            </DropdownItem>
                            <DropdownItem onClick={()=>{
                                    localStorage.removeItem("user")
                                }} className="bg-red-500 hover:bg-red-800 w-full text-white text-center" >
                               Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                </>
                }
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
