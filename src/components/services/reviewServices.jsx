export const getReviewsByTripId = (tripId) => {
    return fetch(`http://localhost:8000/reviews?trip=${tripId}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const getMyReviews = () => {
    return fetch(`http://localhost:8000/reviews?reviewer=current`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const getReviewById = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const createReview = (newReview) => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token, "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    })
}

export const deleteReview = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token, "Content-Type": "application/json"
        },
    })

}

export const editReview = (reviewId, reviewData) => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    })

}