
import {  Modal,   ModalContent,   ModalHeader,   ModalBody, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import AddForm from "./AddForm";

const AddTodoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" onPress={onOpen} color="primary">
        + Add Todo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create todo
              </ModalHeader>
              <ModalBody>
                <AddForm onClose={onClose}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddTodoModal;
