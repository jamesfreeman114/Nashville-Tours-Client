import { getAllTrips } from "../services/tripServices"
import { useState, useEffect } from "react"

export const TripList = () => {

    const [trips, setTrips] = useState([])

    useEffect(()=>{
        getAllTrips().then((allTrips) => setTrips(allTrips))
    },[])
    
    return (
        <div class="mt-30 grid grid-cols-2 sm:grid-cols-3">
         {trips.map((trip) => (
            <div class="m-10 bg-sly-800 hover:bg-sky-700">
                <h1 class="m-3" key={trip.id}>{trip.name}</h1>
                    <p>{trip.description}</p>
                    <img class="mw-100\"
                        src={trip.image_path}
                        alt="card-image"/>     
            </div>
         )
        )}
        </div>
    )
}