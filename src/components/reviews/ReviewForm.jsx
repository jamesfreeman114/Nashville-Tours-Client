import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Rating } from 'react-simple-star-rating'
import { createReview } from "../services/reviewServices"
import { getTripById } from "../services/tripServices"

export const ReviewForm = () => {

    const {id} = useParams()

    const initialReviewState = {
        tripId: id,
        rating: 0,
        comment: "", 
    }

    const [trip, setTrip] = useState({})

    const [review, updateReviewProps] = useState(initialReviewState)

    useEffect(()=>{
        getTripById(id).then((tripObj) => setTrip(tripObj))
    }, [])


    const navigate = useNavigate()

    const handleRating = (rating) => {
        const copy = {...review}
        copy.rating = rating
        updateReviewProps(copy)

    }

    const handleSave = e => {
        e.preventDefault()

        createReview(review).then(() =>{
            navigate(`/${id}`)
        })
    }


    return (
        <div className="m-5 flex flex-col items-center rounded-xl border-2 border-indigo-500" >
        <form className="text-center p-10">
            <h1 class="p-5">Leave a Review for {trip.name}</h1>
            <label className="flex flex-col p-5">Rating:</label>
            <Rating onClick={handleRating}/>
            <div>
                <label>Comment:</label>
                <div class="mt-2">
                    <textarea   
                        id="comment" 
                        name="comment" 
                        rows="3" 
                        className="comment" 
                        onChange={ e => {
                            const copy = { ...review}
                            copy.comment = e.target.value
                            updateReviewProps(copy)}} 
                    />
                </div>
            </div>
            
            <button className="p-5 button"
                onClick={
                handleSave}>Submit
            </button>         
        </form>

        </div>
    )
}