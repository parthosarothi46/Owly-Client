// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useAuth } from "@/context/AuthContext";
// import { Sun, Moon, Monitor, Menu } from "lucide-react";
// import { Link } from "react-router";
// import { useTheme } from "./ThemeProvider";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import logo from "../assets/logo.webp";

// function Navbar() {
//   const { user, logout } = useAuth();
//   const { theme, setTheme } = useTheme();

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error("Logout failed:", error.message);
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-whites shadow-md py-4 px-0 md:px-4 lg:px-4 xl:px-0">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo/Website Name */}
//         <div className="text-2xl font-bold bg-white h-11 w-44 rounded-xl">
//           <Link to="/">
//             <img src={logo} alt="" className="h-full w-full object-contain" />
//           </Link>
//         </div>

//         {/* Mobile and Tablet View */}
//         <div className="flex items-center space-x-2 lg:hidden">
//           {/* Theme Toggle Button */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost">
//                 {theme === "light" && <Sun />}
//                 {theme === "dark" && <Moon />}
//                 {theme === "system" && <Monitor />}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onClick={() => setTheme("light")}>
//                 <Sun className="mr-2 w-4 h-4" />
//                 Light
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setTheme("dark")}>
//                 <Moon className="mr-2 w-4 h-4" />
//                 Dark
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setTheme("system")}>
//                 <Monitor className="mr-2 w-4 h-4" />
//                 System
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* User Avatar with Tooltip */}
//           {user && (
//             <Tooltip>
//               <TooltipTrigger>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user.photoURL || ""}
//                     alt={user.displayName || "User"}
//                   />
//                   <AvatarFallback>
//                     {user.displayName?.[0]?.toUpperCase() || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//               </TooltipTrigger>
//               <TooltipContent>{user.displayName || "User"}</TooltipContent>
//             </Tooltip>
//           )}

//           {/* Hamburger Menu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="p-2">
//                 <Menu className="w-6 h-6" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//               <DropdownMenuItem asChild>
//                 <Link to="/">Home</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/find-tutors">Find Tutors</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/add-tutorials">Add Tutorials</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/my-tutorials">My Tutorials</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/my-booked-tutors">My Booked Tutors</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 {!user ? (
//                   <Link to="/login">
//                     <Button className="w-full">Login</Button>
//                   </Link>
//                 ) : (
//                   <Button onClick={handleLogout} className="w-full">
//                     Logout
//                   </Button>
//                 )}
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden lg:flex items-center space-x-6">
//           <Link to="/">Home</Link>
//           <Link to="/find-tutors">Find Tutors</Link>
//           <Link to="/add-tutorials">Add Tutorials</Link>
//           <Link to="/my-tutorials">My Tutorials</Link>
//           <Link to="/my-booked-tutors">My Booked Tutors</Link>
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost">
//                   {theme === "light" && <Sun />}
//                   {theme === "dark" && <Moon />}
//                   {theme === "system" && <Monitor />}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setTheme("light")}>
//                   <Sun className="mr-2 w-4 h-4" />
//                   Light
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setTheme("dark")}>
//                   <Moon className="mr-2 w-4 h-4" />
//                   Dark
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setTheme("system")}>
//                   <Monitor className="mr-2 w-4 h-4" />
//                   System
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* User Avatar with Tooltip and Logout Button */}
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <Tooltip>
//                   <TooltipTrigger>
//                     <Avatar className="cursor-pointer">
//                       <AvatarImage
//                         src={user.photoURL || ""}
//                         alt={user.displayName || "User"}
//                       />
//                       <AvatarFallback>
//                         {user.displayName?.[0]?.toUpperCase() || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                   </TooltipTrigger>
//                   <TooltipContent>{user.displayName || "User"}</TooltipContent>
//                 </Tooltip>
//                 <Button onClick={handleLogout}>Logout</Button>
//               </div>
//             ) : (
//               <Link to="/login">
//                 <Button>Login</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Sun, Moon, Monitor, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import logo from "../assets/logo.webp";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  function ThemeToggle({ theme, setTheme }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "dark" && <Moon className="h-5 w-5" />}
            {theme === "system" && <Monitor className="h-5 w-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  function UserMenu({ user, handleLogout }) {
    return user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user.photoURL || ""}
              alt={user.displayName || "User"}
            />
            <AvatarFallback>
              {user.displayName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium">
            {user.displayName || "User"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="hidden lg:block">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link to="/login" className="hidden lg:block">
        <Button>Login</Button>
      </Link>
    );
  }

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Find Tutors", path: "/find-tutors" },
    { title: "Add Tutorials", path: "/add-tutorials" },
    { title: "My Tutorials", path: "/my-tutorials" },
    { title: "My Booked Tutors", path: "/my-booked-tutors" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-white h-11 w-44 rounded-xl">
            <Link to="/">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <UserMenu user={user} handleLogout={handleLogout} />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 py-4  rounded-lg shadow-lg"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              {user ? (
                <Button onClick={handleLogout} className="m-4">
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="m-4">Login</Button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
