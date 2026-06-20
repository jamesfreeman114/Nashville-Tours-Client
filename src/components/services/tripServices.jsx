export const getAllTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const getTripById = (id) => {
    return fetch(`http://localhost:8000/trips/${id}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
