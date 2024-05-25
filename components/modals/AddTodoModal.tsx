
import {  Modal,   ModalContent,   ModalHeader,   ModalBody, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import AddForm from "../forms/AddForm";

const AddTodoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" onClick={onOpen} color="primary">
        + Add Todo
      </Button>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create todo
              </ModalHeader>
              <ModalBody>
                <AddForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddTodoModal;
