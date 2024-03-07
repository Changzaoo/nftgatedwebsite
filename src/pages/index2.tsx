import {
  ConnectWallet,
  MediaRenderer,
  useContract,
  useContractMetadata,
  useUser,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { getUser } from "../../auth.config";
import { contractAddress } from "../../const/yourDetails";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import checkBalance from "../util/checkBalance";

export default function Home() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.txtsimples}>Conteudo</h1>
      <p >
       O conteudo foi desbloqueado, mantenha o cartão em carteira para ter acesso!
      </p>
      <div className={styles.ca}>
        <h3 className={styles.txtsimples3} >Conteudo exclusivo! </h3>   
        <p> conteudo para nivelar a comunidade!</p>
        <div className={styles.grid}>   
        <Link href="/metaverso" className={`${styles.tokenGrid} ${styles.card1}`}>
            
            <Image
              src="/metaverso.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <p className={styles.tokenGrid}>metaverso</p>
          </Link> 
          <Link href="/bitcoin" className={`${styles.tokenGrid1} ${styles.card1}`}>
            
            <Image
              src="/bitcoin.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <p className={styles.tokenGrid}>bitcoin</p>
          </Link> 
          <Link href="/ethereum" className={`${styles.tokenGrid1} ${styles.card1}`}>      
            <Image
              src="/ethereum.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <p className={styles.tokenGrid}>ethereum</p>
          </Link> 
          <Link href="/layer2" className={`${styles.tokenGrid1} ${styles.card1}`}>    
            <Image
              src="/layer2.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <p className={styles.tokenGrid}>layer2</p>
          </Link> 
          <Link href="/defi" className={`${styles.tokenGrid1} ${styles.card1}`}>
            
            <Image
              src="/defi.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <p className={styles.tokenGrid}>DeFi</p>
          </Link> 
          <Link href="/nft" className={`${styles.tokenGrid} ${styles.card1}`}>
            
            <Image
              src="/nft.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <p className={styles.tokenGrid}>Nft</p>
          </Link> 
          </div>  
          </div>
          <div><Link href="/index3" className={`${styles.tokenGrid} ${styles.next}`}>
            
            
            <p className={styles.tokenGrid}>Proximo</p>
          </Link></div>
          <div><Link href="/" className={`${styles.tokenGrid} ${styles.back}`}>
            
            
            <p className={styles.tokenGrid}>Voltar</p>
          </Link></div>
      </div>
    
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const secretKey = process.env.TW_SECRET_KEY;

  if (!secretKey) {
    console.log("Missing env var: TW_SECRET_KEY");
    throw new Error("Missing env var: TW_SECRET_KEY");
  }

  // Ensure we are able to generate an auth token using our private key instantiated SDK
  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai",
    { secretKey }
  );

  // Check to see if the user has an NFT
  const hasNft = await checkBalance(sdk, user.address);

  // If they don't have an NFT, redirect them to the login page
  if (!hasNft) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Finally, return the props
  return {
    props: {},
  };
}
