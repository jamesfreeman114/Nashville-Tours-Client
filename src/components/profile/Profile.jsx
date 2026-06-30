import { getReservations } from "../services/reservationServices"
import { useState, useEffect } from "react"
import "./Profile.css"

export const Profile = () => {

    const [reservations, setReservations] = useState([])

    useEffect(()=>{
        getReservations().then((allReservations) => setReservations(allReservations))
    },[])

    return (

         reservations.map((reservation) => {

        
            // Time displaying for Reservations is UTC. Same as picker. Look into reformatting both so timeZone is US Central.

            // Reformat this to use Intl.DateTimeFormat with options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat


            const reservationDate = new Date (reservation.scheduled_datetime);

            const dateTimeString = (new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
                timeStyle: "short",
                timeZone: "UTC",
                }).format(reservationDate).toString());

            return (
            
                <div
                    key={reservation.id}>
                    <div className="reservation-container">
                        <p>{reservation.trip_vehicle.trip.name}</p>
                        <p>{dateTimeString}</p>
                    </div>
                </div>
                )
            }
        )
    )
}

