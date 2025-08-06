import ButtonLink from "../ButtonLink/ButtonLink";
import { CtaProps } from "@/types/blocks";


const alignMap = {
    left: "text-aling",
    center: "text-center",
    right: "text-right"
}

const CallToActionButton= ({align ="left",buttonLabel, destination}: CtaProps) => {
   
    return (<div className={alignMap[align]}>
    <ButtonLink destination={destination} label={buttonLabel}/>
    </div>
    )
}

 

export default CallToActionButton;