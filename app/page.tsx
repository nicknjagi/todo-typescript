'use client'
import {  Modal,   ModalContent, ModalBody,  useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import TodoList from "@/components/TodoList";
import { useState } from "react";
import ActiveTask from "@/components/ActiveTask"

export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");

	return (
		<section className="py-8 md:py-10 max-w-xl mx-auto">
			<Button size="sm" onPress={onOpen} color="primary">
        Todos
      </Button>
      <Modal id="" className="w-full max-w-xl"  scrollBehavior={scrollBehavior as "inside"} isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <TodoList onClose={onClose}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <ActiveTask />
		</section>
	);
}
