'use client'
import { fetchTodos } from "@/api/actions";
import AddTodoModal from "@/components/AddTodoModal";
import Todo from "@/components/Todo";
import { Todo as TodoAlias } from "@/types";
import { Divider } from "@nextui-org/divider";
import { useQuery } from "@tanstack/react-query";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import TodoList from "@/components/TodoList";
import { useState } from "react";

export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");

	return (
		<section className="py-8 md:py-10 max-w-xl mx-auto">
			<Button size="sm" onPress={onOpen} color="primary">
        Todos
      </Button>
      <Modal className="w-full max-w-xl"  scrollBehavior={scrollBehavior as "inside"} isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
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
		</section>
	);
}
