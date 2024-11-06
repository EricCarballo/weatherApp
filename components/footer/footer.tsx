"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        © 2024 Sistema de Monitoreo Ambiental. Todos los derechos reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Términos de Servicio
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacidad
        </Link>
      </nav>
    </footer>
  );
};
