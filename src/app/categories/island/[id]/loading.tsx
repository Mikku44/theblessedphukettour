import { Spinner } from "flowbite-react";

export default function Loading() {
    return <>
        <div className="flex justify-center items-center w-full min-h-screen ">

            <Spinner aria-label="Alternate spinner button example" size="xl" />

        </div>
    </>
}