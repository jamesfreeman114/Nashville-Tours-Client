import { getTripById } from "../services/tripServices"
import { getReviewsByTripId } from "../services/reviewServices"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Rating } from "react-simple-star-rating"

export const TripDetail = () => {
    const { id } = useParams()
    const [trip, setTrip] = useState({})
    const [reviews, setReviews] = useState([])
    
    const navigate = useNavigate()

    useEffect(()=>{
        getTripById(id).then((trip) => setTrip(trip))
    },[])

    useEffect(()=>{
        getReviewsByTripId(id).then((reviewArray) => setReviews(reviewArray))
    }, [])


    
    return (
        <>
            <div className="m-5 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
                <h1 className="text-center p-2">{trip.name}</h1>
                    <p className="text-center p-2 text-white/80">{trip.description}</p>

                    <img className="max-w-200 rounded-3xl shadow-md"
                        src={trip.image_path}
                        alt="card-image"/>
                    <div className="text-center flex flex-col justify-center items-center">
                    <p className="p-2">Average Rating:</p>
                    <Rating
                        initialValue={trip.average_rating}
                        allowFraction={true}
                        readonly={true}>
                    </Rating>
                    <div className="flex gap-3 mt-4">
                    <button
                        className="btn-primary px-6 py-2 text-base"
                        onClick={()=>{navigate(`/${id}/book`)}}>
                    Book Now
                    </button>

                    <button
                        className="rounded-full border border-indigo-400 px-6 py-2 text-base font-medium text-indigo-300 transition hover:bg-indigo-500 hover:text-white"
                        onClick={()=>{navigate(`/${id}/review`)}}
                    >
                    Leave a Review
                    </button>
                    </div>
                    </div>

            </div>

            <h1 className="text-center">Past Reviews</h1>

            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">

            {reviews.map((review) => (
                <div key = {review.id}
                     className="review-card"
                >
                    <div className="mb-2 flex justify-center">
                    <Rating
                        initialValue={review.rating}
                        readonly={true}/>
                    </div>
                    <p className="text-white/80">"{review.comment}"</p>

                </div>


            ))
            }
            </div>
        </>
    )
}