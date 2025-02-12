import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import logo from "../assets/logo.webp";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="py-16 px-4 xl:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-white/90 h-16 w-48 rounded-xl shadow-md overflow-hidden">
              <img
                src={logo}
                alt="Owly Logo"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
              Empowering learners worldwide with the best tutors.
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
              Company
            </h2>
            <ul className="space-y-2">
              {["About Us", "Careers", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
              Resources
            </h2>
            <ul className="space-y-2">
              {["Blog", "FAQ", "Support"].map((item, index) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
              Stay Updated
            </h2>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex items-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow mr-2"
                  required
                />
                <Button type="submit">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Instagram, href: "https://instagram.com" },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <social.icon className="h-6 w-6 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Owly. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
