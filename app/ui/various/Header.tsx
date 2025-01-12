'use client'
import {IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Image from "next/image";
import { logout } from "@/app/actions/auth";
import Link from "next/link";

export default function HeaderComponent(){
  return(
    <header className="relative flex justify-between h-20 items-center px-6 py-2 glow w-full">
      <div></div>
       <div className="absolute inset-0 flex justify-center items-center">
        <Link href="/dashboard">
          <Image
            src="/purpura-logo.png"
            alt="logo"
            width={70}
            height={70}
            className=""
          />
        </Link>
      </div>
      <IconButton color="info" onClick={logout}>
        <LogoutIcon/>
      </IconButton>
    </header>
  )
}