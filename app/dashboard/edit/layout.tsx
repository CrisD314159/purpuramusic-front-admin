export default function Editlayout({children}:{children:React.ReactNode}){
  return (
    <div className="w-full" style={{minHeight:"calc(100vh - 80px)"}}>
      {children}
    </div>
  )

}