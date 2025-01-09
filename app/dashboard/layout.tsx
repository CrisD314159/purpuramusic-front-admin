import React from "react";
import HeaderComponent from "../ui/Header";
import CreationSpeedDial from "../ui/CreationSpeedDial";

export default function DashboardLayout ({
  children
}:{
  children: React.ReactNode
})
{
  return(
      <div className="h-screen flex flex-col">
        <HeaderComponent/>
        {children}
        <CreationSpeedDial/>
      </div>
    
  )
}