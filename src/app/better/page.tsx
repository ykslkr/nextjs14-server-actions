import prisma from "@/lib/db";
import { create, deleteItem, edit } from "../action";
import UpdateButton from "../components/UpdateButton";
import DeleteButton from "../components/DeleteButton";
import FormElement from "../components/Form";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      input: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function BetterExample() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h1 className="font-semibold mb-3">TO DO APP</h1>
      <div className="border rounded-lg shadow-md p-10 w-[750px]">
        <FormElement />

        <div className="flex flex-col mt-5 gap-y-2">
          {data.map((todo) => (
            <div key={todo.id} className="w-full h-full flex items-center">
              <form className="flex" action={edit}>
                <input type="hidden" name="inputId" value={todo.id} />
                <input
                  type="text"
                  name="input"
                  defaultValue={todo.input}
                  className="border p-1 w-[500px]"
                />
                <UpdateButton />
              </form>
              <form action={deleteItem}>
                <input type="hidden" name="inputId" value={todo.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
