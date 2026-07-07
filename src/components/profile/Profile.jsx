import { getReservations } from "../services/reservationServices"
import { useState, useEffect } from "react"
import "./Profile.css"
import { ReservationList } from "../reservations/ReservationList"
import { ReviewList } from "../reviews/ReviewList"

export const Profile = () => {

    const [reservations, setReservations] = useState([])

    useEffect(()=>{
        getReservations().then((allReservations) => setReservations(allReservations))
    },[])

    return (


        <div className="flex flex-col items-center">
            <h1 className="text-center">Upcoming Reservations</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3">
                    <ReservationList
                        reservations={reservations}/>
                </div>
            <h1 className="text-center">My Reviews</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3">
                    <ReviewList/>
                </div> 
        </div>
        
    )

   
}

