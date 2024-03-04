import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
          </Link>
          <div className={styles.card}>
          <Link href="https://balde-platinum.vercel.app/mint" className={styles.link}>
              Mint
            </Link>
            </div>
            <div className={styles.card}>
          <Link href="https://balde-platinum.vercel.app/buy" className={styles.link}>
          Cartões
            </Link>
            </div>
            <div className={styles.card}>
            <Link href="https://balde-platinum.vercel.app/sell" className={styles.link}>
              Vender
            </Link>
            </div>
            <div className={styles.card}>
            <Link href="https://balde-platinum.vercel.app/stake" className={styles.link}>
              NFT Stake
            </Link>
            </div>
            <div className={styles.card}>
            <Link href="https://balde-platinum.vercel.app/staket" className={styles.link}>
              Token Stake
            </Link>
            </div>
            <div className={styles.card}>
            <Link href="https://balde-platinum.vercel.app/dex" className={styles.link}>
              Swap
            </Link>
            </div>
            <div className={styles.card}>
            <Link href="https://balde-gold.vercel.app/" className={styles.link}>
              Conteudo
            </Link>
            </div>
            <div className={styles.card}>
            <Link href="https://balde-platinum.vercel.app/about" className={styles.link}>
              Sobre
            </Link>     
            </div>   
            <div> {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.navMiddle}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}</div>
          
        </div>
        <div className={styles.navMiddle}>
          <div className={styles.navConnect} >
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
         
        </div>
      </nav>
    </div>
  );
}

