import { PropertyCard } from "./propertyCard/PropertyCard";


interface ResultProps {
  properties: Property[];
}

export const Results = ({ properties }: ResultProps) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {properties.map((property) => (
        <PropertyCard
        key={property.databaseId}
        title= {property.title}
        destination= {property.uri}
        image={property.featuredImage?.node.sourceUrl}
        /> 
          
      ))}
    </div>
  );
};
