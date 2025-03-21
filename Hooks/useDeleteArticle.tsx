import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useArticleStore } from "@/store/articleStore";

const useDeleteArticle = () => {
   const router = useRouter();
   const { removeArticle } = useArticleStore();

   const handleDelete = (id: string, redirectPath?: string) => () => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.isConfirmed) {
            removeArticle(id);
            if (redirectPath) {
               router.push("/blog");
            }
            Swal.fire("Deleted!", "Your article has been deleted.", "success");
         }
      });
   };

   return { handleDelete };
};

export default useDeleteArticle;
