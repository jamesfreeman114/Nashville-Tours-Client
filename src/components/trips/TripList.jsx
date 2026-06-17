import { getAllTrips } from "../services/tripServices"
import { useState, useEffect } from "react"

export const TripList = () => {

    const [trips, setTrips] = useState([])

    useEffect(()=>{
        getAllTrips().then((allTrips) => setTrips(allTrips))
    },[])
    return (
        <>
         {trips.map((trip) => (
            <>
            <h2 class="mt-3 bg-sly-800 hover:bg-sky-700" key={trip.id}>{trip.name}</h2>
                <p>{trip.description}</p>
            </>

         )

         )}
        </>
    )
}