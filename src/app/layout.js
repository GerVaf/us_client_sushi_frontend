import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./utils/client_provider";
import Sidebar from "./components/side_bar";
import Toast from "./utils/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <Toast/>
          <Sidebar />
          <div className="main-font">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
