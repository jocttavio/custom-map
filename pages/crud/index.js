import React from "react";
import style from "../../styles/crud.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
const Index = ({ children }) => {
  const links = [
    { href: "/crud", text: "Home" },
    { href: "/crud/newUI", text: "Insert" }
  ];
  const path = usePathname();
  return (
    <div>
      <header className={style.container_nav}>
        <nav>
          <ul className="flex h-20 justify-center items-center">
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
      </header>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 55 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ delay: 0.25, duration: 0.9 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
