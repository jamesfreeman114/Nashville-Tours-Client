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
                className="review-card"
                key = {review.id}>
                <p className="text-lg font-semibold">{review.trip.name}</p>
                <div className="my-2 flex justify-center">
                    <Rating
                        initialValue={review.rating}
                        readonly={true}
                    ></Rating>
                </div>
                <p className="mb-4 flex-1 text-white/80">"{review.comment}"</p>
                <div className="flex justify-center gap-2">
                    <button className="btn-primary" onClick={handleEdit}>Edit</button>
                    <button className="btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            )
            

        })

    )
}