"use client";
import { useRef } from "react";
import { create } from "../action";
import { useFormStatus } from "react-dom";
import SaveButton from "./SaveButton";

export default function FormElement() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <form
      className="flex flex-col"
      action={async (formData: FormData) => {
        await create(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input type="text" name="input" className="border p-1 border-gray-800" />
      <SaveButton />
    </form>
  );
}
