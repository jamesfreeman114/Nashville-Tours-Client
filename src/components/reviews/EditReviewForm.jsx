import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getReviewById } from "../services/reviewServices"
import { Rating } from "react-simple-star-rating"
import { editReview } from "../services/reviewServices"

export const EditReviewForm = () => {

    const {id} = useParams()
    const [review, setReview] = useState({})

    const navigate = useNavigate()

    const handleRating = (rating) => {
        const copy = {...review}
        copy.rating = rating
        setReview(copy)
    }

    const handleSave = (e) => {
        e.preventDefault()

        const reviewData = {
            rating: review.rating,
            comment: review.comment

        }

        if (reviewData.rating && reviewData.comment)
        editReview(id, reviewData).then(()=> {
            window.alert("Changes saved")
            navigate("/profile")
        })

        else (
            window.alert("Please complete the form.")
        )

    }


    useEffect(()=>{
        getReviewById(id).then((review) => setReview(review))

    },[])



    return (
        <div className="form-card">
                <form className="w-full text-center">
                    <h1 className="mb-6 text-2xl">Edit your Review for {review?.trip?.name}</h1>
                    <label className="mb-2 flex flex-col text-sm font-medium text-white/80">Rating:</label>
                    <div className="mb-4 flex justify-center">
                    <Rating
                    initialValue={review.rating}
                    onClick={handleRating}/>
                    </div>
                    <div className="mb-6 text-left">
                        <label className="text-sm font-medium text-white/80">Comment:</label>
                        <div className="mt-2">
                            <textarea
                                id="comment"
                                name="comment"
                                rows="3"
                                className="field"
                                value={review.comment}
                                onChange={ e => {
                                    const copy = { ...review}
                                    copy.comment = e.target.value
                                    setReview(copy)}}
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