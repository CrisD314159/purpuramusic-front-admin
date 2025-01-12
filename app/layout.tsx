import type { Metadata } from "next";
import {  Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme  from "./theme/theme";

const raleway = Raleway({
  style:[ "normal", "italic"],
  subsets: ["latin"],
  weight: ["100","200", "300", "400", "500"],
})

export const metadata: Metadata = {
  title: "Purpura Music",
  description: "Purpura Music Admin Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} min-h-screen`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
          {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        
      </body>     
    </html>
  );
}
