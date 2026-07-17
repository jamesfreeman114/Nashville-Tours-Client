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

        if ( review.rating === 0 || review.comment === "")
        
        window.alert("Please complete the form")

        else

        createReview(review).then(() =>{
            window.alert("Review saved")
            navigate(`/${id}`)
        })
    }


    return (
        <div className="form-card">
        <form className="w-full text-center">
            <h1 className="mb-6 text-2xl">Leave a Review for {trip.name}</h1>
            <label className="mb-2 flex flex-col text-sm font-medium text-white/80">Rating:</label>
            <div className="mb-4 flex justify-center">
                <Rating onClick={handleRating}/>
            </div>
            <div className="mb-6 text-left">
                <label className="text-sm font-medium text-white/80">Comment:</label>
                <div className="mt-2">
                    <textarea
                        id="comment"
                        name="comment"
                        rows="3"
                        className="field"
                        onChange={ e => {
                            const copy = { ...review}
                            copy.comment = e.target.value
                            updateReviewProps(copy)}}
                    />
                </div>
            </div>

            <button className="btn-primary px-6 py-2 text-base"
                onClick={
                handleSave}>Submit
            </button>
        </form>

        </div>
    )
}