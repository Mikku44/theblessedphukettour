'use client'

import { Button } from "@nextui-org/button";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react"


export default function Collapse({children}:{children:ReactNode}){
    const [isCollapsed,setIsCollapsed] = useState(false);
    const collapsedClass = "h-[50vh] "
    return <div className="relative  p-2" >
        <div className={`${!isCollapsed && collapsedClass } duration-700  overflow-clip rounded-xl p-4 overlay-1`} >
            {children}
        </div>
        <Button onClick={e => setIsCollapsed(prev => !prev)} className="text-[--primary] my-2" variant="light">{isCollapsed ? "Collapsed" :"See more"} <ChevronDown className={`${isCollapsed && "rotate-180"} duration-200`}/></Button>
    </div>
}