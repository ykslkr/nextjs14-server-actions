"use client";

import { useFormStatus } from "react-dom";

export default function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="border bg-cyan-400 p-1 w-[85px]">
      {pending ? "Updating..." : "Update"}
    </button>
  );
}
