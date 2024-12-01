'use client'

import { Button } from "@nextui-org/button";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react"


export default function Collapse({children,className}:{children:ReactNode,className?:string}){
    const [isCollapsed,setIsCollapsed] = useState(false);
    const collapsedClass = className || ' '
    return <div className={`relative  p-2  overflow-clip bg-gray-100 rounded-[30px] mb-2`} >
        <div className={`duration-700  overflow-clip rounded-xl p-4 overlay-1  ${!isCollapsed && collapsedClass }`} >
            {children}
        </div>
        <Button onClick={e => setIsCollapsed(prev => !prev)} className="text-[--primary] my-2 mx-8" variant="light">{isCollapsed ? "Collapsed" :"Read more"} <ChevronDown className={`${isCollapsed && "rotate-180"} duration-200`}/></Button>
    </div>
}