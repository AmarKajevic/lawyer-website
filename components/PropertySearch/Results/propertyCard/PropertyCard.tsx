import Image from "next/image";


interface propertyCardProps {
    title: string;
    destination: string;
    image: string;
    
}

export const PropertyCard= ({title, destination, image}: propertyCardProps) =>{
    return <a href={destination} className="border-2 border-slate-300 p-3 block bg-slate-100 hover:bg-slate-200  justify-center">
        <div className=" flex w-full relative h-[200px]">
        <Image
            src={image}
            fill sizes="300px"
            className="object-cover"
            alt=""
        />

        </div>
        <div className="mt-3 text-lg font-bold ">
            {title}
        </div>
        </a>
}