import { useNavigate } from "react-router-dom"
import { deleteReservation } from "../services/reservationServices"

export const ReservationList = ( {reservations}) => {

        const navigate = useNavigate()
        

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
                        <button className="reservation-button"
                                onClick={ (e) => e.preventDefault (navigate(`/edit/${reservation.id}`))}
                                >Edit</button>
                        <button          className="reservation-button" onClick= { (e) => e.preventDefault(deleteReservation(reservation.id).then(navigate("/")))

                        

                        }>Delete</button>
                    </div>
                </div>
                )
            }
        )
    )
    
}