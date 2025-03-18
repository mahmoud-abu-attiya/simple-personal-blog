import { FaXmark } from "react-icons/fa6";
import CreateArticle from "./CreateArticle";
import { useModalStore } from "@/store/modalStore"


const PostModal = () => {
   const { closePostModal } = useModalStore();
   return (
      <div className="fixed top-0 left-0 w-full h-full p-4 flex items-center justify-center z-20 bg-gray-600/50 backdrop-blur-md">
         <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-[700px] max-h-full overflow-auto">
            <div className="flex items-center justify-between">
               <h4 className="text-xl">New Post</h4>
               <button onClick={closePostModal}>
                  <FaXmark />
               </button>
            </div>
               <CreateArticle />
         </div>
      </div>
   );
};

export default PostModal;
