export const getReservations = () => {
    return fetch("http://localhost:8000/reservations", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const getReservationById = (id) => {
    return fetch(`http://localhost:8000/reservations/${id}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const createReservation = (newReservation) => {
    return fetch("http://localhost:8000/reservations", {
        method: "POST",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReservation)
    })
}

export const deleteReservation = (id) => {
    return fetch(`http://localhost:8000/reservations/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        },
})}

export const editReservation = (reservationId, reservationData) => {
    return fetch(`http://localhost:8000/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
    })
}