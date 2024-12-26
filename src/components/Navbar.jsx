import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Sun, Moon, Monitor, Menu } from "lucide-react";
import { Link } from "react-router";
import { useTheme } from "./ThemeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import logo from "../assets/logo.webp";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="shadow-md py-4 px-0 md:px-4 lg:px-4 xl:px-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Website Name */}
        <div className="text-2xl font-bold bg-white h-11 w-44 rounded-xl">
          <Link to="/">
            <img src={logo} alt="" className="h-full w-full object-contain" />
          </Link>
        </div>

        {/* Mobile and Tablet View */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Theme Toggle Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                {theme === "light" && <Sun />}
                {theme === "dark" && <Moon />}
                {theme === "system" && <Monitor />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 w-4 h-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 w-4 h-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 w-4 h-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar with Tooltip */}
          {user && (
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.photoURL || ""}
                    alt={user.displayName || "User"}
                  />
                  <AvatarFallback>
                    {user.displayName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{user.displayName || "User"}</TooltipContent>
            </Tooltip>
          )}

          {/* Hamburger Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/find-tutors">Find Tutors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/add-tutorials">Add Tutorials</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-tutorials">My Tutorials</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-booked-tutors">My Booked Tutors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {!user ? (
                  <Link to="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                ) : (
                  <Button onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/">Home</Link>
          <Link to="/find-tutors">Find Tutors</Link>
          <Link to="/add-tutorials">Add Tutorials</Link>
          <Link to="/my-tutorials">My Tutorials</Link>
          <Link to="/my-booked-tutors">My Booked Tutors</Link>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  {theme === "light" && <Sun />}
                  {theme === "dark" && <Moon />}
                  {theme === "system" && <Monitor />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 w-4 h-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 w-4 h-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 w-4 h-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar with Tooltip and Logout Button */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user.photoURL || ""}
                        alt={user.displayName || "User"}
                      />
                      <AvatarFallback>
                        {user.displayName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>{user.displayName || "User"}</TooltipContent>
                </Tooltip>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
