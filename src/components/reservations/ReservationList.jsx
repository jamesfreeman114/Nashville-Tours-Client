import { useNavigate } from "react-router-dom"
import { deleteReservation } from "../services/reservationServices"

export const ReservationList = ( {reservations}) => {

        const navigate = useNavigate()
        

         return (
        

         reservations
            .filter((reservation) => new Date(reservation.scheduled_datetime) >= new Date())
            .map((reservation) => {


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
                        <p>{reservation.trip_vehicle.trip.name} ({reservation.trip_vehicle.vehicle.name})</p>
                        <p>{dateTimeString}</p>
                        <div className="button-container">
                            <button className="button"
                                onClick={ (e) => e.preventDefault (navigate(`/edit/${reservation.id}`))}
                                >Edit
                            </button>
                            <button          
                                className="button" 
                                onClick= { (e) => e.preventDefault(deleteReservation(reservation.id).then(navigate("/")))}
                                >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                )
            }
         )
    )
    
}