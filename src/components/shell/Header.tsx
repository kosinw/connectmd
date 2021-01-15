import {
  Box,
  HStack,
  IconButton,
  Icon,
  useColorMode,
  Flex,
  Input,
} from "@chakra-ui/core";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";

// export const ShellHeader: React.FC<{
//   onOpen: () => void;
// }> = ({ onOpen }) => {
//   const searchRef = useRef<HTMLInputElement>(null);

//   const { isAuthenticated } = useAuth();

//   function handleKeyDown(e: KeyboardEvent) {
//     if (document.activeElement !== searchRef.current && e.key === "/") {
//       e.preventDefault();
//       searchRef.current.focus();
//     }
//   }
//   useEventListener("keydown", handleKeyDown);

//   return (
//     <header className="bg-white border-gray-200 border-b-2 shadow-sm">
//       <div className="flex flex-row divide-gray-300 divide-solid divide-x md:divide-x-0">
//         <button
//           onClick={onOpen}
//           className="h-full flex md:hidden items-center justify-center p-5 text-gray-500 focus:outline-none hover:text-gray-900 focus:bg-gray-100"
//         >
//           <MenuIcon className="h-6 w-auto stroke-current" />
//         </button>
///         <div className="flex flex-row w-full">
//           <div className="flex px-5 py-5 space-x-4 w-full h-full">
//             <SearchIcon className="w-6 h-auto stroke-current text-gray-400" />
//             <form className="w-full" onSubmit={(e) => e.preventDefault()}>
//               <input
//                 ref={searchRef}
//                 className="focus:outline-none w-full h-full text-gray-700 pr-4"
//                 type="text"
//                 placeholder="Search"
//               />
//             </form>
//             <div className="flex flex-row justify-end items-center w-1/5 space-x-7">
//               {isAuthenticated && (
//                 <div className="flex-shrink-0 flex flex-row items-center">
//                   <button className="text-gray-500 hover:text-blue-500 duration-150 transition-colors ease-in-out focus:outline-none focus:text-gray-400">
//                     <PlusIcon className="w-6 h-6 stroke-current" />
//                   </button>
//                 </div>
//               )}
//               <div className="flex-shrink-0 flex flex-row items-center">
//                 {isAuthenticated ? (
//                   <></>
//                 ) : (
//                   <Link href="/auth/login">
//                     <button
//                       className="text-gray-500 hover:text-blue-500 duration-150 transition-colors ease-in-out focus:outline-none focus:text-gray-400"
//                       title="Sign in"
//                     >
//                       <div className="flex flex-row space-x-2">
//                         <LoginIcon className="w-6 h-6 stroke-current" />
//                         <p className="font-semibold">Sign in</p>
//                       </div>
//                     </button>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export const ShellDropdown: React.FC<{}> = ({}) => {
//   return (
//     <div className="relative inline-block text-left">
//       {/* <Menu>
//         {({ open }) => (
//           <>
//             <Menu.Button className="group flex flex-row items-center">
//               <Avatar size="xs" src={photoURL} name={displayName} />
//               <ChevronIcon className="w-5 ml-1 h-auto fill-current text-gray-600 group-hover:text-gray-500" />
//             </Menu.Button>
//             <Transition
//               show={open}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items
//                 static
//                 className="absolute right-0 min-w-max-content max-w-lg mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg outline-none"
//               >
//                 <div className="px-4 py-3">
//                   <p className="text-sm leading-1">
//                     Signed in as{" "}
//                     <strong className="font-bold leading-9 truncate">
//                       {displayName}
//                     </strong>
//                   </p>
//                 </div>

//                 <div className="py-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <Link href="/profile">
//                         <a
//                           className={`${
//                             active
//                               ? "bg-gray-100 text-gray-900"
//                               : "text-gray-700"
//                           } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
//                         >
//                           Your profile
//                         </a>
//                       </Link>
//                     )}
//                   </Menu.Item>
//                 </div>

//                 <div className="py-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="#"
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
//                         onClick={handleLogout}
//                       >
//                         Sign out
//                       </a>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </>
//         )}
//       </Menu> */}
//     </div>
//   );
// };

const ShellHeaderHamburger: React.FC<{
  onMobileOpen: () => void;
}> = ({ onMobileOpen }) => {
  const { colorMode } = useColorMode();

  const backgroundColor =
    colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200";

  return (
    <IconButton
      borderWidth={0}
      borderRightWidth={1}
      _focus={{ outline: "none", backgroundColor }}
      onClick={onMobileOpen}
      display={{ base: "block", md: "none" }}
      bg="transparent"
      color="gray.500"
      aria-label="Menu"
      rounded={0}
      fontSize={20}
      w={16}
      h="100%"
      variant="outline"
      icon={<Icon as={HiMenuAlt1} />}
    />
  );
};

const ShellHeaderSearchBar: React.FC<{}> = ({ ...restProps }) => {
  return (
    <HStack direction="row" as="form" {...restProps}>
      <Icon as={HiSearch} color="gray.400" />
      <Input
        borderWidth={0}
        _focus={{ outline: "none" }}
        type="text"
        placeholder="Search"
      />
    </HStack>
  );
};

export const ShellHeader: React.FC<{
  onMobileOpen: () => void;
}> = ({ onMobileOpen }) => {
  return (
    <Box as="header" w="100%" boxShadow="sm" borderBottomWidth={2} h={16}>
      <HStack h="100%" w="100%">
        <ShellHeaderHamburger onMobileOpen={onMobileOpen} />
        <ShellHeaderSearchBar />
      </HStack>
    </Box>
  );
};
