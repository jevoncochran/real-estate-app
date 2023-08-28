import { toast, ToastContent } from "react-toastify";
import { ResponseType } from "@/types";

export const notify = (text: ToastContent, response: ResponseType) => {
  toast[response](text);
};
