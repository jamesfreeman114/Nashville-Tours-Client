import { useNavigate } from "react-router-dom"
import { Rating } from "react-simple-star-rating"

export const ReviewList = ( {reviews, getAndSetReviews, deleteReview}) => {

    const navigate = useNavigate()

    
    return (

        reviews.map((review) => {

            const handleDelete = () => {

            deleteReview(review.id).then(() =>
                getAndSetReviews()
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