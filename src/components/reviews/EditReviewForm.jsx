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
        <div className="m-5 flex flex-col items-center rounded-xl border-2 border-indigo-500" >
                <form className="text-center p-10">
                    <h1 class="p-5">Edit your Review for {review?.trip?.name}</h1>
                    <label className="flex flex-col p-5">Rating:</label>
                    <Rating 
                    initialValue={review.rating}
                    onClick={handleRating}/>
                    <div>
                        <label>Comment:</label>
                        <div class="mt-2">
                            <textarea   
                                id="comment" 
                                name="comment" 
                                rows="3" 
                                className="comment"
                                value={review.comment} 
                                onChange={ e => {
                                    const copy = { ...review}
                                    copy.comment = e.target.value
                                    setReview(copy)}} 
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