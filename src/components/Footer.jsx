import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand Section */}
          <div>
            <h1 className="text-2xl font-bold text-white">TutorBook</h1>
            <p className="text-sm mt-2 text-gray-400">
              Empowering learners worldwide with the best tutors.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <h2 className="font-bold text-white mb-2">Company</h2>
              <ul>
                <li>
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-white mb-2">Resources</h2>
              <ul>
                <li>
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:underline">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-auto">
            <h2 className="font-bold text-white mb-2">Stay Updated</h2>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-gray-200"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Social Media */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12v-9.294H9.294V11.53H12V9.294c0-2.673 1.632-4.14 4.016-4.14 1.14 0 2.126.084 2.412.122v2.794h-1.655c-1.298 0-1.55.618-1.55 1.524v2H18l-.706 3.177h-2.294V24h4.676c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.406 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.56c-.883.392-1.83.656-2.825.774 1.017-.611 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195a5.44 5.44 0 0 0-9.261 4.962c-4.52-.226-8.528-2.394-11.205-5.69a5.44 5.44 0 0 0-.735 2.733c0 1.887.962 3.554 2.425 4.532a5.432 5.432 0 0 1-2.463-.682v.068a5.44 5.44 0 0 0 4.362 5.331 5.481 5.481 0 0 1-2.458.093 5.44 5.44 0 0 0 5.082 3.773A10.914 10.914 0 0 1 0 19.54a15.38 15.38 0 0 0 8.317 2.437c9.988 0 15.446-8.28 15.446-15.446 0-.235-.006-.469-.016-.702A11.062 11.062 0 0 0 24 4.56z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.2 0 3.584.013 4.85.07 1.366.062 2.633.34 3.608 1.316.975.976 1.253 2.243 1.316 3.609.057 1.266.07 1.65.07 4.85s-.013 3.584-.07 4.85c-.062 1.366-.34 2.633-1.316 3.609-.976.975-2.243 1.253-3.608 1.316-1.266.057-1.65.07-4.85.07s-3.584-.013-4.85-.07c-1.366-.062-2.633-.34-3.609-1.316-.975-.976-1.253-2.243-1.316-3.608-.057-1.266-.07-1.65-.07-4.85s.013-3.584.07-4.85c.062-1.366.34-2.633 1.316-3.609.976-.975 2.243-1.253 3.608-1.316C8.416 2.176 8.8 2.163 12 2.163m0-2.163C8.737 0 8.332.015 7.052.072 5.768.129 4.657.397 3.763 1.29.346 4.707.015 8.33 0 12c.015 3.27.346 6.893 3.763 10.31C7.18 23.985 10.803 24.315 12 24.315c1.197-.015 4.82-.345 8.237-3.763 3.417-3.417 3.747-7.04 3.763-8.237.015-1.197.345-4.82-3.763-8.237C20.34.346 16.717.015 12 0z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400">
            &copy; {new Date().getFullYear()} TutorBook. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
