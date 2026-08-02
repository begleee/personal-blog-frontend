// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Sun, Moon, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const userProfile = JSON.parse(localStorage.getItem("user_profile"));
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Authors", href: "/authors" },
    { name: "About", href: "/about" },  
    { name: "Login", href: "/login"},
    { name: "Profile", href: "/profile"}
  ];

  const filteredNavLink = navLinks.filter((link) => {
    if(link.name === "Authors" && userProfile?.role !== "admin") {
      return false;
    }
    if(link.name === "Login" && userProfile) {
      return false;
    }
    if(link.name === "Profile" && !userProfile) {
      return false;
    }
    return true;
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        <nav className="hidden md:flex items-center gap-1">
          {filteredNavLink.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-zinc-100 dark:bg-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Theme"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {isDark ? (
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
          </Button>

          <div className="md:hidden">
            <Button variant="outline" size="sm" className="text-xs">
              Menu
            </Button>
          </div>
        </div>

      </div>
    </header>
  );
}