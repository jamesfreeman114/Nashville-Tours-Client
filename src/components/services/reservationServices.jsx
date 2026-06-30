export const getReservations = () => {
    return fetch("http://localhost:8000/reservations", {
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