import { getReservations } from "../services/reservationServices"
import { useState, useEffect } from "react"

export const Profile = () => {

    const [reservations, setReservations] = useState([])

    useEffect(()=>{
        getReservations().then((allReservations) => setReservations(allReservations))
    },[])
    
    return (
        <>
        <div class="mt-30 ">
         {reservations.map((reservation) => (
            <div class="m-10 bg-sly-800 hover:bg-sky-700" key={reservation.id}>
                {/* TODO: Format DateTime to be more human readable */}
                <h1 class="m-3" >{reservation.scheduled_datetime}</h1>
                    <p>{reservation.trip_vehicle.trip.name}</p>
                    <p>{reservation.trip_vehicle.vehicle.name}</p>
                        
            </div>
         )
        )}
        </div>
        </>
    )
}