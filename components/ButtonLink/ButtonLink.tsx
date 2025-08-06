import { ButtonProps } from "@/types/blocks";
import Link from "next/link"




  const ButtonLink  = ({destination, label}: ButtonProps)=> {
    return <Link
    href={destination}
    className="btn">
    {label}
  </Link>
}
export default ButtonLink;