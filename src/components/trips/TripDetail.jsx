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
            <div className="m-5 bg-sly-800 flex flex-col items-center">
                <h1 className="text-center p-2">{trip.name}</h1>
                    <p className="text-center p-2">{trip.description}</p>
                    
                    <img class="max-w-200 rounded-3xl"
                        src={trip.image_path}
                        alt="card-image"/>
                    <div className=" text-center flex flex-col justify-center align-middle">
                    <p className="p-2">Average Rating:</p>
                    <Rating
                        initialValue={trip.average_rating}
                        allowFraction={true}
                        readonly={true}>
                    </Rating>
                    <div className="button-container align-middle">
                    <button
                        onClick={()=>{navigate(`/${id}/book`)}}>
                    Book Now
                    </button>

                    <button
                        onClick={()=>{navigate(`/${id}/review`)}}
                    >
                    Leave a Review
                    </button>
                    </div>
                    </div> 
                        
            </div>

            <h1 className="text-center">Past Reviews</h1>

            <div className="grid grid-cols-3"
            >
            
            {reviews.map((review) => (
                <div key = {review.id}
                     className="review-card"
                     class="m-5  max-w-60px rounded-xl border-2 border-indigo-500 flex flex-col"
                >
                    <div class="m-5 text-center">
                    <Rating 
                        initialValue={review.rating}
                        readonly={true}/>
                    </div>
                    <p class = "m-5 text-center">"{review.comment}"</p>

                </div>
            

            ))
            }
            </div>
        </>
    )
}