import { getReservations } from "../services/reservationServices"
import { useState, useEffect } from "react"
import "./Profile.css"
import { ReservationList } from "../reservations/ReservationList"
import { ReviewList } from "../reviews/ReviewList"
import { getMyReviews, deleteReview } from "../services/reviewServices"

export const Profile = () => {

    const [reservations, setReservations] = useState([])
    const [reviews, setReviews] = useState([])

    const getAndSetReservations = () => {
        getReservations().then((allReservations) => setReservations(allReservations))

    }

    const getAndSetReviews = () => {
        getMyReviews().then((reviewArray) => setReviews(reviewArray))}

    

    useEffect(()=>{
        getAndSetReservations()
        
    },[])

    useEffect(()=>{
        getAndSetReviews()
        
    },[])



    return (


        <div className="flex flex-col items-center">
            <h1 className="text-center">Upcoming Reservations</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3">
                    <ReservationList
                        reservations={reservations}
                        getAndSetReservations={getAndSetReservations}/>
                </div>
            <h1 className="text-center">My Reviews</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3">
                    <ReviewList
                        reviews={reviews}
                        getAndSetReviews={getAndSetReviews}
                        deleteReview={deleteReview}    
                    />
                </div> 
        </div>
        
    )

   
}

