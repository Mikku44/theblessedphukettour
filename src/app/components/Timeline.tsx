'use client'
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function TimelineTrip({program}: any) {
  return <div className="px-5">
   
    {program.length && <Timeline className="">
      {program?.map((item,index)=><Timeline.Item key={index}>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>{item?.time ||"February 2022"}</Timeline.Time>
          <Timeline.Title>Activity</Timeline.Title>
          <Timeline.Body>
           {item?.activity ||"Program description"}
          </Timeline.Body>
          {/* <Button color="gray">
            Learn More
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button> */}
        </Timeline.Content>
      </Timeline.Item>)}

    </Timeline>}
  </div>
}