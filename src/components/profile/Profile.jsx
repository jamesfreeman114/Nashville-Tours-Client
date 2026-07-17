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


        <div className="flex flex-col items-center gap-4 px-4 pb-10">
            <h1 className="text-center">Upcoming Reservations</h1>
                <div className="w-full max-w-4xl">
                    <ReservationList
                        reservations={reservations}
                        getAndSetReservations={getAndSetReservations}/>
                </div>
            <h1 className="text-center mt-6">My Reviews</h1>
                <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <ReviewList
                        reviews={reviews}
                        getAndSetReviews={getAndSetReviews}
                        deleteReview={deleteReview}
                    />
                </div>
        </div>
        
    )

   
}

