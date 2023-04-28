import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://641038fb864814e5b64aed70.mockapi.io/todo";

export const getTodos = async () => {
  try {
    const { data } = await axios.get("/todo");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Message: ${error.message} Code: ${error.name}`);
      throw Error;
    }
  }
};

export const addTodo = async (query) => {
  const toastId = toast.loading("Loading...");
  try {
    await axios.post("/todo", query);
    toast.dismiss(toastId);
    toast.success("Successfully Add!");
  } catch (error) {
    if (error instanceof Error) {
      toast.dismiss(toastId);

      toast.error("This didn't work. Reload please");
    }
  }
};

export const removeTodo = async (id) => {
  const toastId = toast.loading("Loading...");
  try {
    await axios.delete(`/todo/${id}`);

    toast.dismiss(toastId);
    toast.success("Successfully Remove!");
  } catch (error) {
    if (error instanceof Error) {
      toast.dismiss(toastId);

      toast.error("This didn't work. Reload please");
    }
  }
};

export const upDateTodo = async (query) => {
  const toastId = toast.loading("Loading...");
  try {
    await axios.put(`/todo/${query?.id}`, query);

    toast.dismiss(toastId);
    toast.success("Successfully Update!");
  } catch (error) {
    if (error instanceof Error) {
      toast.dismiss(toastId);

      toast.error("This didn't work. Reload please");
    }
  }
};
