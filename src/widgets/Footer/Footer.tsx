"use client";

import Link from "next/link";
import { BiLogoTelegram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <img src="/img/newLogo.png" alt="logo" />
      </div>
      <div className={styles.footerLinks}>
        <Link href="/privacy-policy" className={styles.footerLink}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className={styles.footerLink}>
          Terms of Service
        </Link>
      </div>
      <div>©MINTARION 2025</div>
    </footer>
  );
};
