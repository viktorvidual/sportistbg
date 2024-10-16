"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Calendar, Settings, LogOut } from "lucide-react";
import { signOutAction } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/protected/my-games", label: "My Games", icon: Calendar },
    { href: "/protected/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative w-10 h-10 rounded-full focus:ring-2 focus:ring-primary"
        >
          <User className="w-6 h-6" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 p-2 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="py-1"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md transition-colors duration-150 ease-in-out ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-full bg-primary-foreground rounded-r-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <form
            action={signOutAction}
            method="post"
            className="mt-1 pt-1 border-t border-gray-200 dark:border-gray-600"
          >
            <Button
              type="submit"
              variant="ghost"
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150 ease-in-out"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign out
            </Button>
          </form>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
