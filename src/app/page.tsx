"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { Button } from "@/shared/ui/Button/Button";
import { BiLogoTelegram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

import styles from "./styles.module.scss";

export default function Home() {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Этап 1: Темный экран с градиентом (0.5s)
    const timer1 = setTimeout(() => {
      setAnimationStage(1);
    }, 500);

    // Этап 2: Логотип и блюр (1s)
    const timer2 = setTimeout(() => {
      setAnimationStage(2);
    }, 1500);

    // Этап 3: Вся страница (0.8s)
    const timer3 = setTimeout(() => {
      setAnimationStage(3);
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <main
      className={cn(
        styles.main,
        animationStage >= 1 && styles.mainWithBackground
      )}
    >
      {/* Этап 1: Темный экран с градиентом по бокам */}
      <AnimatePresence>
        {animationStage < 3 && (
          <motion.div
            className={styles.initialScreen}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.sideGradients}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Этап 2: Логотип и зеленый блюр */}
      <AnimatePresence>
        {animationStage >= 1 && animationStage < 3 && (
          <>
            <motion.div
              className={styles.logoContainer}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                className={styles.logo}
                src="/img/logo-full.png"
                alt="logo"
              />
            </motion.div>

            {/* Два блока зеленого блюра */}
            <motion.div
              className={styles.greenBlur1}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "50%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            <motion.div
              className={styles.greenBlur2}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "50%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Этап 3: Вся страница появляется снизу вверх */}
      <AnimatePresence>
        {animationStage >= 3 && (
          <motion.div
            className={styles.container}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.content}>
              <header className={styles.header}>
                <div className={styles.headerContent}>
                  <img
                    className={styles.logo}
                    src="/img/logo-full.png"
                    alt="logo"
                  />
                </div>
              </header>
              <div className={styles.body}>
                <img
                  className={styles.exampleImage}
                  src="/example.svg"
                  alt=""
                />
                <div className={styles.box}>
                  <h1 className={styles.title}>
                    Data over ego - let <br />
                    the numbers speak.
                  </h1>
                  <div>
                    <p className={styles.desc}>
                      When the facts change, I change my mind
                    </p>
                    <p className={styles.author}>John Maynard Keynes</p>
                  </div>
                  <Button
                    className={styles.mainBtn}
                    variant="lightGreen"
                    as="link"
                    href="/chart"
                  >
                    <img
                      src="/run.svg"
                      width={13}
                      height={15}
                      alt="arrow right"
                    />
                    Launch App
                  </Button>
                  <div className={styles.usersOnline}>
                    <img
                      src="/green_dot.svg"
                      alt="online indicator"
                      className={styles.greenDot}
                    />
                    <span className={styles.usersOnlineCount}>2316</span>{" "}
                    <p className={styles.usersOnlineText}>users online</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div className={styles.mainPageFooter}>
          <a>
            <div>
              <IoDocumentText />
              docs / API
            </div>
          </a>
          <a href="https://x.com/mintarion">
            <div>
              <FaXTwitter />
              @mintarion
            </div>
          </a>
          <a href="https://t.me/mintarion_labs">
            <div>
              <BiLogoTelegram />
              @mintarionlabs
            </div>
          </a>
          <a href="">
            <div>
              <MdAlternateEmail />
              support@mintarion.com
            </div>
          </a>
        </div>
      </AnimatePresence>
    </main>
  );
}
