'use client'

import { useState } from "react";
import {  Modal,   ModalContent, ModalBody,  useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Calendar } from "lucide-react";
import CustomCalendar from "../calendar/Calendar";

const CalendarModal = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  return (
    <>
      <Button size="sm" onPress={onOpen} variant="light">
        <Calendar />
      </Button>
      <Modal id="" className="w-full max-w-none mx-auto h-full max-h-fit sm:m-0 rounded-none"  scrollBehavior={scrollBehavior as "inside"} isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalBody className="w-full max-w-7xl mx-auto">
                <CustomCalendar />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default CalendarModal