"use client";

import { deleteCategory } from "@/server/actions/category";
import { useLocale } from "next-intl";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

interface DeleteCategoryButtonProps {
  categoryId: string;
}
const DeleteCategoryButton = ({ categoryId }: DeleteCategoryButtonProps) => {
  const locale = useLocale();

  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this Category?")) {
        const res = await deleteCategory(categoryId, locale);

        if (res.status && res.message) {
          if (res.status === 200) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        } else {
          toast.error("Unexpected response from server.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the category.");
    }
  };

  return (
    <div
      onClick={handleDelete}
      className="bg-red-600 text-white p-2 hover:bg-red-800 transition-all duration-300 rounded-lg inline-block cursor-pointer"
    >
      <FaRegTrashAlt className="text-xl" />
    </div>
  );
};

export default DeleteCategoryButton;
