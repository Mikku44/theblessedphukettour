'use client'

import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function DraggableScroll({ items,className }: any): JSX.Element {
    // We will use React useRef hook to reference the wrapping div:
    const ref =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

    return (
        <div
            className={`flex w-full space-x-3 overflow-x-scroll scrollbar-hide ${className}`}
            {...events}
            ref={ref} // add reference and events to the wrapping div
        >
            {items}
        </div>
    );
}