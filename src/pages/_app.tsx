import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import { domainName } from "../../const/yourDetails";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
    >
     
        {/* Render the navigation menu above each component */}
        <Navbar />
      {/* Render the actual component (page) */}
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
