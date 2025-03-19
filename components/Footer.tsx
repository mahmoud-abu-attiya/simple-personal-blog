import { FaFacebookF, FaDiscord, FaXTwitter, FaGithub, FaDribbble } from "react-icons/fa6";

const Footer = () => {
   return (
      <footer className="bg-blue-300/80 relative bottom-0">
         <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
               <div className="mb-6 md:mb-0">
                  <h2 className="text-gradient uppercase text-3xl">Logo</h2>
               </div>
               <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                     <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                     <ul className="text-sky-900 font-medium">
                        <li className="mb-4">
                           <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                        </li>
                        <li>
                           <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                     <ul className="text-sky-900 font-medium">
                        <li className="mb-4">
                           <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                        </li>
                        <li>
                           <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                     <ul className="text-sky-900 font-medium">
                        <li className="mb-4">
                           <a href="#" className="hover:underline">Privacy Policy</a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <hr className="my-6 border-sky-500 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
               <span className="text-sm text-sky-900 sm:text-center">© 2023 Company™. All Rights Reserved.
               </span>
               <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-sky-900 hover:text-gray-900">
                     <FaFacebookF />

                  </a>
                  <a href="#" className="text-sky-900 hover:text-gray-900 ms-5">
                     <FaDiscord />
                  </a>
                  <a href="#" className="text-sky-900 hover:text-gray-900 ms-5">
                     <FaXTwitter />
                  </a>
                  <a href="#" className="text-sky-900 hover:text-gray-900 ms-5">
                     <FaGithub />
                  </a>
                  <a href="#" className="text-sky-900 hover:text-gray-900 ms-5">
                     <FaDribbble />
                  </a>
               </div>
            </div>
         </div>
      </footer>

   )
}

export default Footer