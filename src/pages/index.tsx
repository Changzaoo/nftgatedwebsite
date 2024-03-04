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
      <h2 className={styles.heading}>Balde lab content</h2>
      <h1 className={styles.h1}>Balde</h1>

      <p className={styles.explain}>
       Conteudo exclusivo para os holders do Balde lab Pass
      </p>
      
      <div className={styles.card}>
        <h3>Conteudo exclusivo desbloqueado!</h3>
        <p>Sua NFT desbloqueou o conteudo exclusivo, aproveite!</p>
        <div className={styles.heroCtaContainer}>
          <p><br /></p>
                <p> Oque é Blockchain  </p>
                <p> Oque é Criptomoeda  </p>
                <p> Oque é tokens erc20  </p>
                <p> Oque é carteira de navegador  </p>
                <p> Oque é carteira fisica </p>
                <p> Oque é ativos do mundo real RWA  </p>
                <p> Oque é Metaverso  </p>
                <p> Oque é Bitcoin  </p>
                <p>   </p>
                <p>   </p>
                <p>   </p>
                <p>   </p>
                <p>   </p>

                
              </div>
        

        
      </div>
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
