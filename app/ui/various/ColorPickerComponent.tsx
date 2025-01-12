'use client'
import '@/app/css/ColorPickerComponent.css'

interface ColorPickerProps{
  hex: string,
  setHex: (hex:string) => void
}

export default function ColorPickerComponent({props}:{props:ColorPickerProps}){
  return(
    <div className="pantone-card" style={{boxShadow:`0px 0px 30px 10px ${props.hex}`}}>
    <input name="coloruno" type="color" value={props.hex} onChange={(e)=>{props.setHex(e.target.value)}} />
    <output id="colorhex1" style={{color:`${props.hex}`}}>{props.hex}</output>
  </div>
  )
}