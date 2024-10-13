import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

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

export default async function Home() {
  const data = await getData();

  //server action create
  async function create(formData: FormData) {
    "use server";

    const input = formData.get("input") as string;

    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath("/");
  }

  // server action update
  async function edit(formData: FormData) {
    "use server";
    const input = formData.get("input") as string;
    const inputId = formData.get("inputId") as string;

    await prisma.todo.update({
      where: {
        id: inputId,
      },
      data: {
        input: input,
      },
    });
    revalidatePath("/");
  }

  // server action delete
  async function deleteItem(formData: FormData) {
    "use server";
    const inputId = formData.get("inputId") as string;

    await prisma.todo.delete({
      where: {
        id: inputId,
      },
    });
    revalidatePath("/");
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="border rounded-lg shadow-md p-10 w-[700px]">
        <form className="flex flex-col" action={create}>
          <input
            type="text"
            name="input"
            className="border p-1 border-gray-800"
          />
          <button
            type="submit"
            className="bg-green-500 rounded-lg mt-2 text-white py-2"
          >
            Submit
          </button>
        </form>

        <div className="flex flex-col mt-5 gap-y-2">
          {data.map((todo) => (
            <form key={todo.id} className="flex" action={edit}>
              <input type="hidden" name="inputId" value={todo.id} />
              <input
                type="text"
                name="input"
                defaultValue={todo.input}
                className="border p-1 w-[500px]"
              />
              <button type="submit" className="border bg-green-400 p-1">
                Update
              </button>
              <button formAction={deleteItem} className="border bg-red-400 p-1">
                Delete
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
