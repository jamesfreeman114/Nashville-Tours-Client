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

        
            // Time displaying for Reservations in profile is different timezone from the picker on the form. Datetime value in SQLite database is same as what is chosen on the form

            // Reformat this to use Intl.DateTimeFormat with options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat


            const reservationDate = new Date (reservation.scheduled_datetime);

            const reservationDateString = reservationDate.toLocaleDateString()

            const reservationTimeString = reservationDate.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit",  })

            return (
            
                <div
                    key={reservation.id}>
                    <div className="reservation-container mt-50">
                        <p>{reservation.trip_vehicle.trip.name}</p>
                        <p>{reservation.trip_vehicle.vehicle.name}</p>
                        <p>{reservationDateString} at {reservationTimeString}</p>
                    </div>
                </div>
                )
            }
        )
    )
}

