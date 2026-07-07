import { getAllTrips } from "../services/tripServices"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const TripList = () => {

    const [trips, setTrips] = useState([])

    useEffect(()=>{
        getAllTrips().then((allTrips) => setTrips(allTrips))
    },[])
    
    return (

        <>

        <h1 className="text-center mt-10">Nashville Rides and Tours</h1>
        <p className="text-center m-3">Select one of our options below for trip details, booking info, and reviews</p>


        <div class="grid grid-cols-2 sm:grid-cols-3">
      
            {trips.map((trip) => (

                <Link class="m-10 rounded-xl border-2 border-indigo-600 overflow-hidden flex flex-col text-center"
                    key={trip.id} 
                    to={`./${trip.id}`}>
                        <p className="m-5 text-3xl " >{trip.name}</p>
                
                        <img class="m-5  rounded-3xl"
                            src={trip.image_path}
                            alt="card-image"/>     
                </Link>
            ))}

        </div>

        </>

        
    )}