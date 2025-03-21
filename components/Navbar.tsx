'use client'

import Link from "next/link"
import { useEffect } from "react"
import { FaPlus, FaXmark, FaBars } from "react-icons/fa6";
import PostModal from "./PostModal";
import { useModalStore } from "@/store/modalStore"
import { useOpenNavStore } from "@/store/openNavStore"
import { usePathname } from "next/navigation";

const Navbar = () => {
   const { isNavOpen, toggleNav, closeNav } = useOpenNavStore();
   const { openPostModal, isPostModalOpen } = useModalStore();
   const pathname = usePathname();
   useEffect(() => {
      if (isNavOpen || isPostModalOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "auto";
      }
   }, [isNavOpen, isPostModalOpen]);
   useEffect(() => {
      closeNav();
   }, [pathname]);
   return (
      <>
      {isPostModalOpen && (<PostModal />)}
      {isNavOpen && (<div className="w-screen h-screen z-10 fixed top-0 left-0 bg-gray-600/50 backdrop-blur-sm"></div>)}
      <header className={`fixed top-0 left-0 w-full shadow bg-gradient-to-br from-sky-100/80 via-sky-200/80 to-blue-300/80 py-2 overflow-hidden transition-all md:max-h-fit max-h-13 z-10 backdrop-blur-md ${isNavOpen ? "max-h-96" : ""}`}>
         <div className="container md:flex justify-between items-center">
            <div className="flex justify-between items-center ">
               <Link href={"/"} className="text-2xl text-gradient">LOGO</Link>
               <button className="p-2 border block md:hidden rounded-lg border-blue-900 text-blue-900 bg-blue-400/20 hover:bg-blue-400/50 transition" onClick={() => toggleNav()}>
                  {!isNavOpen ? <FaBars /> : <FaXmark />}
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
            <div className="flex items-center justify-between mt-6 md:hidden">
               <nav>
                  <ul className="flex space-x-8 items-center">
                     <li>
                        <Link onClick={() => closeNav()} href={"/"} className="text-blue-800 hover:text-blue-700">For you</Link>
                     </li>
                     <li>
                        <Link onClick={() => closeNav()} href={"/blog"} className="text-blue-800 hover:text-blue-700">View Blog</Link>
                     </li>
                     <li>
                        <button onClick={() => openPostModal()} className="text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-500/20 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center flex gap-2 items-center">
                           New <FaPlus />
                        </button>
                     </li>
                  </ul>
               </nav>   
            </div>
         </div>
      </header>
      </>
   )
}

export default Navbar