import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface NewTodo{
  title: string;
  details: string;
  priority: "Low" | "Medium" | "High";
  complete: boolean;
  timeTaken: number;
  dueDate: string;
  isActive: boolean;  createdAt: string | Date;
}

export interface Todo extends NewTodo {
  id: string;
}