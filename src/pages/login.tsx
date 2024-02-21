import {
  ConnectWallet,
  MediaRenderer,
  useAddress,
  useContract,
  useContractMetadata,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../../auth.config";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import checkBalance from "../util/checkBalance";

export default function Login() {
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);
  const address = useAddress();
  const { data: nfts } = useOwnedNFTs(contract, address);
  const router = useRouter();

  useEffect(() => {
    if (nfts?.length) {
      router.push("/");
    }
  }, [nfts, router, address]);

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.heading}>Balde lab content </h2>
      <h1 className={styles.h1}>Balde</h1>

      <p className={styles.explain}>
      Conteudo exclusivo para os holders do Balde lab Pass    
      </p>

      <div className={styles.card}>
        <h3>Conteudo exclusivo para holder</h3>
        <p>Você precisa ter pelo menos 1 NFT da coleção abaixo:</p>
        <div className="dd">
        <iframe
    src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x58d7015DDCF4f94A9204E5Bb8c98AA4F660a8B4C&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F80001.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fpolygon%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=44380f8db1180048ab61f8cf626bddd6&theme=light&primaryColor=purple"
    width="600px"
    height="600px"
></iframe>
      </div>
        {contractMetadata && (
          <div className={styles.nft}>
            
            
          </div>
          
        )}
        {contractLoading && <p></p>}

        
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      props: {},
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

  // If they have an NFT, redirect them to the home page
  if (hasNft) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Finally, return the props
  return {
    props: {},
  };
}
