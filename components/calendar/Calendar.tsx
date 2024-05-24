"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import AddEventForm from "../forms/AddEventForm";
import { useSession } from "next-auth/react";
import { fetchGoogleCalendarEvents } from "@/app/lib/calenderApi";

export default function Calendar() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();

  let eventGuid = 0;

  async function events (){
    const data= await fetchGoogleCalendarEvents(session?.access_token as string)
    const eventsArray = data.map((event:any) => {
      const eventObj = {
        title:event.summary,
        start:event.start.dateTime,
        end:event.end.dateTime
      }
      return eventObj
    })
    console.log(data);
    
    setCurrentEvents(eventsArray)
  }

  useEffect(() => {
    if(session?.access_token){
      events()
    }
    console.log(session);
  }, [session]);

  function createEventId() {
    return String(eventGuid++);
  }

  function handleDateSelect(selectInfo: any) {
    console.log(selectInfo);

    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo: any) {
    console.log(clickInfo);

    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  const handleDateClick = (arg: any) => {
    onOpen();
    // alert(arg.dateStr)
  };
  return (
    <div className="calender-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "prev,next",
          // center: "title",
          // right: "dayGridMonth,timeGridWeek",
        }}
        events={currentEvents}
        expandRows={true}
        editable={true}
        selectable={true}
        select={() => {}}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
      <Button size="sm" onPress={onOpen} color="primary" className="hidden">
        + Add event
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
      >
        <ModalContent className="py-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex pb-1 flex-col gap-1">
                Add event
              </ModalHeader>
              <ModalBody>
                <AddEventForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
