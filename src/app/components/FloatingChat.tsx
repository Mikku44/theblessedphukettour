'use client'
import { Button } from "@nextui-org/button";
import { MessageCircle } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Textarea } from "flowbite-react";

export default function FloatingChat() {
  return <div className="fixed bottom-5 right-5">
    <Popover placement={"top-end"}  backdrop="opaque">
      <PopoverTrigger>
        <Button isIconOnly={true} radius="full" className="p-3 w-[56px] h-[56px] border-[1px]  shadow-md bg-[--primary] text-white"><MessageCircle /></Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-lg font-bold">Assistant</div>
          <Chat />
          <div className="text-[14px] py-2">
              <Textarea name="" className="rounded-xl" id=""/>
          </div>
          <Button className="float-end bg-[--primary] text-white" >Send</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
}

function Chat(){
  return <div className="min-h-[300px] py-2">
        <div className="bg-[--primary] rounded-[10px] w-fit max-w-[70%] py-1 px-3 text-white">Hello,Do you have any questions?</div>
  </div>
}
