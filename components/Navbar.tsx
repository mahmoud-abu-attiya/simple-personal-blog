'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { FaBars } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import PostModal from "./PostModal";
import { useModalStore } from "@/store/modalStore"
import { useOpenNavStore } from "@/store/openNavStore"

const Navbar = () => {
   const { isNavOpen, toggleNav } = useOpenNavStore();
   const { openPostModal, isPostModalOpen } = useModalStore();
   useEffect(() => {
      if (isNavOpen || isPostModalOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "auto";
      }
   }, [isNavOpen, isPostModalOpen]);
   return (
      <>
      {isPostModalOpen && (<PostModal />)}
      <header className={`fixed top-0 left-0 w-full shadow bg-gradient-to-br from-sky-100/80 via-sky-200/80 to-blue-300/80 py-2 overflow-hidden transition-all md:max-h-fit max-h-15 z-10 backdrop-blur-md ${isNavOpen ? "max-h-96" : ""}`}>
         <div className="container md:flex justify-between items-center">
            <div className="flex justify-between items-center ">
               <Link href={"/"} className="text-2xl text-gradient">LOGO</Link>
               <button className="p-2 border block md:hidden rounded" onClick={() => toggleNav()}>
                  <FaBars />
               </button>
            </div>
            <nav className="hidden md:block">
               <ul className="flex space-x-8 items-center">
                  <li>
                     <Link href={"/"} className="text-blue-800 hover:text-blue-700">For you</Link>
                  </li>
                  <li>
                     <Link href={"/blog"} className="text-blue-800 hover:text-blue-700">View Blog</Link>
                  </li>
                  <li>
                     <button onClick={() => openPostModal()} className="text-blue-800 bg-transparent border transition border-blue-800 hover:bg-blue-500/20 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center flex gap-2 items-center">
                        New <FaPlus />
                     </button>
                  </li>
               </ul>
            </nav>
            <div className="relative rounded-full overflow-hidden w-fit cursor-pointer hidden md:block">
               <Image src="https://placehold.co/50/png" alt="avatar" width={50} height={50} />
            </div>
            <div className="flex items-center justify-between mt-6 md:hidden">
               <nav>
                  <ul className="flex space-x-8 items-center">
                     <li>
                        <Link href={"/"} className="text-blue-800 hover:text-blue-700">For you</Link>
                     </li>
                     <li>
                        <Link href={"/blog"} className="text-blue-800 hover:text-blue-700">View Blog</Link>
                     </li>
                     <li>
                        <button onClick={() => openPostModal()} className="text-blue-950 bg-transparent border border-blue-950 hover:bg-bg-blue-500/20 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center flex gap-2 items-center">
                           New <FaPlus />
                        </button>
                     </li>
                  </ul>
               </nav>
               <div className="relative rounded-full overflow-hidden w-fit cursor-pointer">
                  <Image src="https://placehold.co/50/png" alt="avatar" width={50} height={50} />
               </div>
            </div>
         </div>
      </header>
      </>
   )
}

export default Navbar