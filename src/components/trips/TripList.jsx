import { getAllTrips } from "../services/tripServices"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const TripList = () => {

    const [trips, setTrips] = useState([])

    useEffect(()=>{
        getAllTrips().then((allTrips) => setTrips(allTrips))
    },[])
    
    return (
        <div class="mt-30 grid grid-cols-2 sm:grid-cols-3">
         {trips.map((trip) => (
            <div class="m-10 bg-sly-800 hover:bg-sky-700"
            key={trip.id} >
                <Link class="text-3xl" 
                     
                     to={`./${trip.id}`}>{trip.name}
                </Link>
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