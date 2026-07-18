"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const links = [
  ["About", "#about"], ["Skills", "#skills"], ["Work", "#projects"], ["Wins", "#achievements"], ["Contact", "#contact"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };
  const jump = () => setOpen(false);

  return <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:top-5">
    <nav className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center rounded-full border border-white/80 bg-[#fdfaf5]/85 px-2 shadow-[0_12px_40px_rgba(42,60,98,0.13)] backdrop-blur-xl sm:px-3">
      <button onClick={() => setOpen(!open)} className="nav-name flex items-center gap-2 rounded-full px-3 py-2 font-bold text-[#16233f]" aria-expanded={open} aria-label="Toggle navigation">
        {open ? <X size={19} /> : <Menu size={19} />} <span>Malavya Mankar</span>
      </button>
      <div className="mx-auto hidden items-center gap-1 md:flex">
        {links.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
      </div>
      <button onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-full text-[#16233f] transition hover:bg-[#e8efff]" aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
    </nav>
    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0, y: -10, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .97 }} className="pointer-events-auto mx-auto mt-2 max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/80 bg-[#fdfaf5]/95 p-3 shadow-[0_18px_50px_rgba(42,60,98,0.16)] backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{links.map(([label, href], index) => <motion.a initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }} onClick={jump} key={href} href={href} className="nav-menu-link">{label}<span>↗</span></motion.a>)}</div>
      </motion.div>}
    </AnimatePresence>
  </header>;
}
