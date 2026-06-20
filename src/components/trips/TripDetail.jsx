import { getTripById } from "../services/tripServices"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const TripDetail = () => {
    const { id }= useParams()
    const [trip, setTrip] = useState([])
    

    useEffect(()=>{
        getTripById(id).then((trip) => setTrip(trip))
    },[])
    
    return (
        <div class="m-50 bg-sly-800 hover:bg-sky-700">
                <h1>{trip.name}</h1>
                    <p>{trip.description}</p>
                    <img class="mw-100\"
                        src={trip.image_path}
                        alt="card-image"/>     
            </div>
    )
}