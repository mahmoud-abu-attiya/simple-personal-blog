import { useState, ChangeEvent } from "react";
import Image from "next/image";

const ImagePreview = () => {
   const [image, setImage] = useState<string | null>(null);

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImage(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const removeImage = () => setImage(null);

   return (
      <div className="border border-slate-200 p-4 rounded-lg">
         {!image ? (
            <>
               <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer rounded-md"
               />
            </>
         ) : (
            <div className="relative">
               <Image
                  src={image}
                  alt="Selected Image"
                  width={400}
                  height={400}
                  className="rounded-lg"
               />
               <button
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
               >
                  ✕
               </button>
            </div>
         )}
      </div>
   );
};

export default ImagePreview;
