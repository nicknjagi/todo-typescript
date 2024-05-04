import {  Modal,   ModalContent,   ModalHeader,   ModalBody, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import EditTodoForm from "./EditTodoForm";
import { Todo } from "@/types";
import { EditIcon } from "./icons";

const EditTodoModal: React.FC<{ todo: Todo }>  = ({todo}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly className="h-7" onPress={onOpen} size="sm" color="primary" variant="flat">
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit todo
              </ModalHeader>
              <ModalBody>
                <EditTodoForm onClose={onClose} todo={todo}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditTodoModal;
