import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WelcomeClient from "./WelcomeClient";

export const metadata: Metadata = {
  title: "Welcome to SnipShot – Email Confirmed!",
  description: "Your SnipShot account is ready. Download the app and start translating manga instantly.",
};

export default function WelcomeNewUserPage() {
  return (
    <>
      {/* <Nav /> */}
      <main>
        <WelcomeClient />
      </main>
      {/* <Footer /> */}
    </>
  );
}
