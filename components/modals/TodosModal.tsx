'use client'

import { useState } from "react";
import {  Modal,   ModalContent, ModalBody,  useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import TodoList from "@/components/TodoList";

const TodosModal = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  return (
    <>
      <Button size="sm" onPress={onOpen} color="primary">
        Todos
      </Button>
      <Modal id="todos" className="w-full max-w-xl"  scrollBehavior={scrollBehavior as "inside"} isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
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
    </>
  )
}
export default TodosModal