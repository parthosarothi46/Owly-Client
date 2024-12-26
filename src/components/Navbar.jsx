import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Sun, Moon, Monitor, Menu } from "lucide-react"; // Icons for theme and menu toggle
import { Link } from "react-router";
import { useTheme } from "./ThemeProvider";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav
      className={`shadow-md py-4 px-6 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Website Name */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-500">
            TutorConnect
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {[
            "Home",
            "Find Tutors",
            "Add Tutorials",
            "My Tutorials",
            "My Booked Tutors",
          ].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replaceAll(" ", "-")}`}
              className="hover:text-gray-500"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[
                "Home",
                "Find Tutors",
                "Add Tutorials",
                "My Tutorials",
                "My Booked Tutors",
              ].map((item, index) => (
                <DropdownMenuItem asChild key={index}>
                  <Link to={`/${item.toLowerCase().replace(" ", "-")}`}>
                    {item}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle Button and User Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:bg-gray-700">
                {theme === "light" && <Sun />}
                {theme === "dark" && <Moon />}
                {theme === "system" && <Monitor />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="flex items-center space-x-2"
              >
                <Sun /> <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="flex items-center space-x-2"
              >
                <Moon /> <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="flex items-center space-x-2"
              >
                <Monitor /> <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Section */}
          {!user ? (
            <Link to="/login">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                Login
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Avatar with Hover Tooltip */}
              <Avatar
                className="cursor-pointer"
                title={user.displayName || "User"} // Tooltip with user's name
              >
                <AvatarImage
                  src={user.photoURL || ""}
                  alt={user.displayName || "User"}
                />
                <AvatarFallback>
                  {user.displayName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
