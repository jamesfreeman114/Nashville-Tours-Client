import { getMyReviews, deleteReview } from "../services/reviewServices"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Rating } from "react-simple-star-rating"

export const ReviewList = () => {

    
    const [reviews, setReviews] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        getMyReviews().then((reviewArray) => setReviews(reviewArray))},[])
    
    

    return (

        reviews.map((review) => {

            const handleDelete = (e) => {
            e.preventDefault()

            deleteReview(review.id ).then(
                window.alert("Review Deleted"),
                navigate("/")

            )}

            const handleEdit = (e) => {
                e.preventDefault()

                navigate(`/edit/review/${review.id}`)
            }

            return (
            
            <div
                className= "reservation-container"
                key = {review.id}>
                <p>{review.trip.name}</p>
                <p>{review.comment}</p>
                <Rating
                    initialValue={review.rating}
                    readonly={true}
                ></Rating>
                 <div className="button-container">
                <button className = "button" onClick={handleEdit}>Edit</button>
                <button className= "button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            )
            

        })

    )
}