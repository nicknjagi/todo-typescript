import { createEvent } from '@/app/lib/actions';
import {Input} from '@nextui-org/input'
import {Button} from '@nextui-org/button'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NewEvent } from "@/types";

interface AddEventFormProps {
  onClose: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onClose}) => {
  const [event, setEvent] = useState<NewEvent>({
    title: "",
    start:'',
    end:''
  });

  const queryClient = useQueryClient()

  const newEventMutation = useMutation({
    mutationFn: async (newEvent: NewEvent): Promise<void>  => createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['events']})
      onClose()
    }
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventObj = Object.fromEntries(formData);
    if(Object.values(eventObj).includes('')){
      // console.log();
    }
    console.log(eventObj);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        autoFocus
        size="sm"
        type="text"
        label="Title"
        name="title"
        isRequired
        onChange={handleChange}
        variant="underlined"
      />
      <div className="flex gap-4">
        <Input
          size="sm"
          type="date"
          label="Start date"
          name="startDate"
          isRequired
          onChange={handleChange}
          variant="underlined"
        />
        <Input
          size="sm"
          type="date"
          label="End date"
          name="endDate"
          isRequired
          onChange={handleChange}
          variant="underlined"
        />
        
      </div>
      <Button
        type="submit"
        disabled={newEventMutation.isPending}
        color="primary"
        className="mb-2"
      >
        Create
      </Button>
    </form>
  );
};
export default AddEventForm;
