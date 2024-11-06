"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Thermometer, Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "../theme/ToggleMode";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the mobile menu container
  const buttonRef = useRef(null); // Ref for the menu button

  // Toggle the menu open/close
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  // Close the menu when the screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close the mobile menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-background fixed top-0 left-0 right-0 z-50">
      <Link className="flex items-center justify-center" href="/">
        <img src="img/logoApp.webp" alt="Logo Sistema de Monitoreo Ambiental" className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold text-primary">
          Weather App
        </span>
      </Link>

      {/* Menu for larger screens */}
      <nav className="ml-auto hidden lg:flex items-center gap-4 sm:gap-6">
        <NavLinks />
        <AccountDropdown />
        <GithubLink />
        <ModeToggle />
      </nav>

      {/* Mobile menu button */}
      <button
        ref={buttonRef} // Attach ref to button
        className="lg:hidden flex items-center justify-center p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu */}
      <div
        ref={menuRef} // Attach ref to the menu container
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16 pb-6 px-4">
          {/* Close button inside the mobile menu */}
          <button
            className="self-end p-2"
            onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-white hover:bg-red-500 transition-colors rounded-lg bg-primary p-1" />
          </button>

          <nav className="flex flex-col space-y-4">
            <NavLinks mobile />
            <AccountDropdown mobile />
            <div className="flex gap-4"> {/* Buttons in a row */}
              <GithubLink mobile />
              <Separator orientation="vertical"/>
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
  <>
    <Link
      className={cn(
        "text-sm font-medium text-foreground hover:text-primary transition-colors",
        mobile && "text-lg py-2"
      )}
      href="/dashboard"
    >
      Dashboard
    </Link>
    
    {mobile && <div className="border-b my-2" />}

    <Link
      className={cn(
        "text-sm font-medium text-foreground hover:text-primary transition-colors",
        mobile && "text-lg py-2"
      )}
      href="/informes"
    >
      Informes
    </Link>

    {mobile && <div className="border-b my-2" />}

    <Link
      className={cn(
        "text-sm font-medium text-foreground hover:text-primary transition-colors",
        mobile && "text-lg py-2"
      )}
      href="/configuracion"
    >
      Configuración
    </Link>

    {mobile && <div className="border-b my-2" />}
  </>
);


const AccountDropdown = ({ mobile = false }: { mobile?: boolean }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size={mobile ? "default" : "sm"} className={cn(mobile)}>
        Cuenta
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href="/perfil">Perfil</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/ajustes">Ajustes</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/salir">Cerrar sesión</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const GithubLink = ({ mobile = false }: { mobile?: boolean }) => (
  <Button asChild variant="outline" size={mobile ? "default" : "icon"}>
    <Link
      href="https://github.com/EricCarballo/weatherApp"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(mobile && "flex items-center")}
    >
      <FaGithub />
      {mobile}
    </Link>
  </Button>
);
