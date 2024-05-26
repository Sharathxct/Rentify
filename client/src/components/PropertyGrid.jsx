import { useEffect, useState } from "react";
import Property from "./Property";
import axios from "axios";


export default function PropertyGrid() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    
    async function getProperties(){
      setIsLoading(true)
      try {
        const res = await axios.get("http://localhost:3000/api/properties")
        if(res.status === 200){
          setProperties(res.data)
          setIsLoading(false)
        } else {
          setError('Failed to fetch properties')
          setIsLoading(false)
        }

      } catch (error) {
        console.log(error)
        setIsLoading(false)
        setError('An error occurred while fetching properties')
      }
    }
    getProperties()

  },[])
  return (
    <>
       {error && <div>{error}</div>}
      {!error && isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full lg:grid-cols-4 gap-4 p-[20px]">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <Property key={property._id} property={property} />
            ))
          ) : (
            <div>No properties found signup and Rentify some</div>
          )}
        </div>
      )}

        
    </>
  )
}
