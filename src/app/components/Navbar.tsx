'use client'

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Avatar, Badge } from "flowbite-react";
import { ChevronDown, Minus, Plus, ShoppingBag, Variable, X } from "lucide-react";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../variants/context";



export default function Navigation() {
    const store = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
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
        <>
            <Navbar

                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className="bg-black/50 text-white"
                classNames={
                    {
                        wrapper: "px-0 w-full justify-between",
                        content: "w-full px-2"
                    }
                }
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>
                <NavbarContent className="sm:hidden " justify="center">
                    <NavbarBrand>
                        <Link href="/"><img src="/icons/logofill.png" alt="Jalanista Logo" className="h-[50px] " /></Link>

                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        {/* <AcmeLogo /> */}
                        <Link href="/"><img src="/icons/logoonly.png" alt="Jalanista Logo" className="h-[100px] " /></Link>
                        <Link href="/" className="font-bold text-inherit">Jalanista</Link>
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
                                    href={`/categories/${categories[0]?.name.toLowerCase()}`}
                                    key="1"
                                    description={categories[0]?.description}
                                // endContent={<>TO</>}
                                >
                                    {categories[0]?.name}
                                </DropdownItem>
                                <DropdownItem
                                    href={`/categories/${categories[1]?.name.toLowerCase()}`}
                                    key="2"
                                    description={categories[1]?.description}
                                // endContent={<>TO</>}
                                >
                                    {categories[1]?.name}
                                </DropdownItem>
                                <DropdownItem
                                    href={`/categories/${categories[2]?.name.toLowerCase()}`}
                                    key="3"
                                    description={categories[2]?.description}
                                // endContent={<>TO</>}
                                >
                                    {categories[2]?.name}
                                </DropdownItem>
                                <DropdownItem
                                    href={`/categories/${categories[3]?.name.toLowerCase()}`}
                                    key="4"
                                    description={categories[3]?.description}
                                // endContent={<>TO</>}
                                >
                                    {categories[3]?.name}
                                </DropdownItem>
                                <DropdownItem
                                    href={`/categories/${categories[4]?.name.toLowerCase()}`}
                                    key="5"
                                    description={categories[4]?.description}
                                // endContent={<>TO</>}
                                >
                                    {categories[4]?.name}
                                </DropdownItem>
                                <DropdownItem
                                    href={`/categories/${categories[5]?.name.toLowerCase()}`}
                                    key="6"
                                    description={categories[5]?.description}
                                // endContent={<>TO</>}
                                >
                                    {categories[5]?.name}
                                </DropdownItem>
                                <DropdownItem
                                    href={`/categories/${categories[6]?.name.toLowerCase()}`}
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
                        </> :
                        <>
                            <NavbarItem className="relative">

                                <Button onClick={() => setShowCart(prev => !prev)} isIconOnly={true} className="text-white relative" variant="light">
                                    <Badge className="absolute top-0 right-0 rounded-full">{JSON.stringify(store.cart.listItems.length)}</Badge>
                                    <ShoppingBag />
                                </Button>
                                <div className={`lg:w-[500px] w-[80vw] h-[400px] flex flex-col justify-between  bg-white text-black rounded-xl p-2 border  shadow-sm absolute right-0 overflow-hidden duration-200 ${!showCart ? 'z-[-10] h-0 lg:w-0 w-0 opacity-0' : 'z-0 '}`}>

                                    <div className="">
                                        {store.cart.listItems.map((item, index) => <div key={index} className="flex justify-between items-center mb-2">
                                            <div className="flex gap-3 items-center">
                                                <div className="rounded-lg size-20 overflow-hidden">
                                                    <img className="h-full object-cover" src={item?.image || "https://images.unsplash.com/photo-1731570225640-7ddad4231679?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                                                </div>
                                                <div className="grid">
                                                    <div className="text-xl font-semibold">{item?.name}</div>
                                                    <div className="text-sm">x{item?.quantity}</div>
                                                </div>
                                            </div>
                                            <div className="">฿ <span className="font-bold text-xl">{item?.price}</span></div>
                                        </div>)}
                                    </div>
                                    {store.cart.listItems.length <= 0 &&
                                        <>
                                            <div className="flex flex-col justify-center items-center min-h-[300px]">
                                                <Variable className="size-14 text-[--primary]" />
                                                <div className="">No item in cart.</div>
                                            </div>
                                        </>}

                                        <Button href="/checkout" className="w-full h-[50px] text-white bg-[--primary] hover:bg-[--primary-50] duration-150">Checkout</Button>
                                </div>
                                {/* <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly={true} className="text-white relative" variant="light">
                                            <Badge className="absolute top-0 right-0 rounded-full">{JSON.stringify(store.cart.listItems.length)}</Badge>
                                            <ShoppingBag />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>

                                        <DropdownItem className="hover:bg-white lg:w-[500px] w-[80vw]">
                                            {store.cart.listItems.map((item,index) => <div key={index} className="flex justify-between items-center mb-2">
                                                <div className="flex gap-3 items-center">
                                                    <div className="rounded-lg size-20 overflow-hidden">
                                                        <img src={item?.image || "https://images.unsplash.com/photo-1731570225640-7ddad4231679?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                                                    </div>
                                                    <div className="grid">
                                                        <div className="text-xl font-semibold">{item?.name}</div>
                                                        <div className="text-sm">x{item?.quantity}</div>
                                                    </div>
                                                </div>
                                                <div className="">฿ <span className="font-bold text-xl">{item?.price}</span></div>
                                            </div>)}
                                            {store.cart.listItems.length <= 0 && 
                                            <>
                                            <div className="flex flex-col justify-center items-center min-h-[300px]">
                                            <Variable className="size-14 text-[--primary]" />
                                                <div className="">No item in cart.</div>
                                            </div>
                                            </>}
                                        </DropdownItem>

                                     

                                        <DropdownSection>
                                            <DropdownItem className="text-center py-4 bg-[--primary] text-white hover:text-white">
                                                Check out
                                            </DropdownItem>
                                        </DropdownSection>
                                    </DropdownMenu>
                                </Dropdown> */}
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
                                        <DropdownItem onClick={() => {
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
        </>
    );
}
