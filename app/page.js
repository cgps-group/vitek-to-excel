import Image from "next/image";
import Link from "next/link";
// import { CircleUser, Menu, Package2, Search } from "lucide-react";

import FileUpload from "../components/file-upload.js";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div
      className={styles.page}
    >
      <header
        className={styles.header}
        // className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
      >
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="w-6 flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image
              src="image/cgps-logo-icon-rgb.svg"
              alt="CGPS logo"
              width={24}
              height={24}
            />
            {/* <Package2 className="h-6 w-6" /> */}
            <span className="sr-only">CGPS</span>
          </Link>
          <Link
            href="/"
            className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
          >
            VITEK to Excel
          </Link>
        </nav>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

          <div className="ml-auto flex-1 sm:flex-initial"></div>

          <Link
            href="https://github.com/cgps-group/vitek-to-excel"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <FileUpload />
      </main>

      <footer className={styles.footer}>
        <span>
          VITEK to Excel is developed and maintained by the
          {" "}
          <a href="https://cgps.group/">
            Centre for Genomic Pathogen Surveillance
          </a>
        </span>
      </footer>
    </div>
  );
}
