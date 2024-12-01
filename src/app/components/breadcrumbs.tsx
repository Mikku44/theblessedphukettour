
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";



type Props = {
  className?:string,
  items: {
    label?: string;
    href?: string;
    icon?: any;
  }[];
};

export function Breadcrumbs({ items,className }: Props) {
  return (
    <Breadcrumb aria-label="breadcrumbs" className={className}>
      <BreadcrumbItem href="/" icon={HiHome}>
        Home
      </BreadcrumbItem>
      {items.map((item,index) =><BreadcrumbItem key={index} href={item?.href || "#"} icon={item?.icon}>{item?.label}</BreadcrumbItem>)}

    </Breadcrumb>
  );
}
