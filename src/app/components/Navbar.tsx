"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar } from "flowbite-react";
import { ChevronDown, ShoppingBag } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  displayName?: string;
  email?: string;
  image?: string;
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const menuItems = [
    "Home",
    "Explore Categories",
    "Car",
    "Tour",
    "Add-Ons",
    "Log Out",
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const categories = [
    { name: "Island", description: "Explore island" },
    { name: "Beach", description: "Relax at beautiful beaches" },
    { name: "Activities", description: "Enjoy exciting activities" },
    { name: "Animal", description: "Discover wildlife and animals" },
    { name: "Shopping", description: "Shop for unique items and souvenirs" },
    { name: "Restaurant", description: "Dine at the best restaurants" },
    { name: "Spa", description: "Rejuvenate with spa and wellness" },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-black/80 text-white"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <img
              src="/icons/logoonly.png"
              alt="Jalanista Logo"
              className="h-[100px]"
            />
          </Link>
          <Link href="/" className="font-bold text-inherit">
            Home
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/">
            <img
              src="/icons/logoonly.png"
              alt="Jalanista Logo"
              className="h-[100px]"
            />
          </Link>
          <Link href="/" className="font-bold text-inherit">
            Home
          </Link>
        </NavbarBrand>
        <NavbarItem isActive>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent text-white"
                  endContent={<ChevronDown className="stroke-[1px]" />}
                  radius="sm"
                  variant="light"
                >
                  Explore Categories
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu className="w-[340px]" itemClasses={{ base: "gap-4" }}>
              {categories.map((category, index) => (
                <DropdownItem
                  key={index}
                  description={category.description}
                  as={Link}
                  href={`/${category.name.toLowerCase()}`}
                >
                  {category.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link href="/car">Car</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/tour">Tour</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/add-on">Add Ons</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button as={Link} href="/login" className="text-white" variant="light">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                className="bg-[--primary] text-white"
                href="/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button isIconOnly={true} className="text-white" variant="light">
                <ShoppingBag />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly={true}
                    radius="full"
                    className="text-white"
                    variant="light"
                  >
                    <Avatar
                      img={user.image || "/default-avatar.png"}
                      className="rounded-full overflow-hidden"
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {user.displayName && (
                    <DropdownItem>
                      <span>{user.displayName}</span>
                    </DropdownItem>
                  )}
                  {user.email && (
                    <DropdownItem>
                      <span>{user.email}</span>
                    </DropdownItem>
                  )}
                  <DropdownItem
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                    }}
                    className="bg-red-500 hover:bg-red-800 w-full text-white text-center"
                  >
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={item === "Log Out" ? "#" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
