'use client'

import ToggleMenu from "../ui/ToggleMenu"

export default function DashboardPage(){
  return (
    <div>
      <div className="toolContainer">
        <div className="typeToggleMenu pt-10 flex items-center justify-center">
          <ToggleMenu/>
        </div>
      </div>
      <div className="contentContainer">
        <div></div>
      </div>
    </div>
  )
}