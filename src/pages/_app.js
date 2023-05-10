import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@/styles/globals.css';
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps:{session, ...pageProps} }) {

  useEffect(() => {
    import ("bootstrap/dist/js/bootstrap.min.js");
  }, [])

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  
  return (
    <SessionProvider session={session}>
      <Navbar/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
