import React from "react";
import HeaderComponent from "../ui/various/Header";
import CreationSpeedDial from "../ui/various/CreationSpeedDial";

export default function DashboardLayout ({
  children
}:{
  children: React.ReactNode
})
{
  return(
      <div className="flex flex-col items-center justify-center">
        <HeaderComponent/>
        {children}
        <CreationSpeedDial/>
      </div>
    
  )
}