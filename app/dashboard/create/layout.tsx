import React from "react";

export default function Createlayout({children}:{children:React.ReactNode}){
  return (
    <div className="w-full" style={{minHeight:"calc(100vh - 80px)"}}>
      {children}
    </div>
  )
}