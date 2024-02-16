import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <Link href="/">
        <Image
          src="/Baldemagico.svg"
          alt="thirdweb"
          width={90}
          height={90}
          className={styles.logo}
        />
      </Link>
      <ConnectWallet theme="dark" />
    </nav>
  );
};
