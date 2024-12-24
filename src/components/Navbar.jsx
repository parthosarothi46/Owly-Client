import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";

function Navbar() {
  const [user, setUser] = useState(null); // Replace with your authentication logic

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Website Name/Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/">TutorConnect</Link>
      </div>

      {/* Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">
          Home
        </Link>
        <Link to="/find-tutors" className="text-gray-700 hover:text-gray-900">
          Find Tutors
        </Link>
        <Link to="/add-tutorials" className="text-gray-700 hover:text-gray-900">
          Add Tutorials
        </Link>
        <Link to="/my-tutorials" className="text-gray-700 hover:text-gray-900">
          My Tutorials
        </Link>
        <Link
          to="/my-booked-tutors"
          className="text-gray-700 hover:text-gray-900"
        >
          My Booked Tutors
        </Link>
      </div>

      {/* Conditional Login/Logout */}
      <div>
        {!user ? (
          <Button
            onClick={() => console.log("Login clicked")}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user.photoURL || ""}
                  alt={user.displayName || "User"}
                />
                <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem className="cursor-default">
                <span className="text-gray-900">
                  {user.displayName || "User"}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
