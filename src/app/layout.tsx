import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} flex flex-col min-h-screen items-center bg-primary text-default`}
      >
        <ReactQueryProvider>
          <div className="p-4 md:p-10 w-full max-w-[1256px]">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
