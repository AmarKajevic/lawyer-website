import { ButtonProps } from "@/types/blocks";





  const ButtonLink  = ({destination, label}: ButtonProps)=> {
    return <a
    href={destination}
    className="btn">
    {label}
  </a>
}
export default ButtonLink;