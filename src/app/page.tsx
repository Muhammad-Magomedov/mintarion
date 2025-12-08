import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <img
                className={styles.logo}
                src="/img/logo-full.png"
                alt="logo"
              />
              <div className={styles.socials}>
                <Button as="link" shape="square" href="https://t.me/mintarion_labs">
                  <img src="/img/icons/socials/telegram.svg" alt="telegram" />
                </Button>
                <Button as="link" shape="square" href="https://x.com/mintarion">
                  <img src="/img/icons/socials/x.svg" alt="x" />
                </Button>
              </div>
            </div>
          </header>
          <div className={styles.body}>
            <div className={styles.box}>
              <h1 className={styles.title}>
                Trade Smarter.
                <br /> Learn Faster.
              </h1>
              <p className={styles.desc}>
                All-in-one platform with charts, indicators, articles, and AI
                that explains the market in plain language.
              </p>
              <Button
                className={styles.mainBtn}
                variant="lightGreen"
                as="link"
                href="/chart"
              >
                Launch App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
