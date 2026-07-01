import { getReservations } from "../services/reservationServices"
import { useState, useEffect } from "react"

import "./Profile.css"

import { ReservationList } from "../reservations/ReservationList"

export const Profile = () => {4

    const [reservations, setReservations] = useState([])


    useEffect(()=>{
        getReservations().then((allReservations) => setReservations(allReservations))
    },[])

    return (

        <div className="container">
            <ReservationList
              reservations={reservations}/>
        </div>
    )

   
}

