import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import classes from "../../styles/classes.module.css";
const Navbar = () => {
  const links = [
    { href: "/", text: "Inicio" }
  ];
  const path = usePathname();
  return (
    <header className={classes.header_initial}>
      <div className={classes.header__content}>
        <div className="w-20 h-20 bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(logo.jpg)`}} >
        </div>
        <Link href="/" className={classes.header__content__logo}>I EXPERIENCE</Link>
        <nav className={classes.header__content__nav}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <motion.div whileHover={{ scale: 0.9 }}>
                  <Link
                    className={`${
                      link.href === path ? " text-black bg-[#eee] " : ""
                    } text-sm font-text`}
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
