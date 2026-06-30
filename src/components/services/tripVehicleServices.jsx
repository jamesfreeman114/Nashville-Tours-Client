export const getVehiclesByTripType = (tripId) => {
    return fetch(`http://localhost:8000/tripvehicles?trip=${tripId}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('tours_token')).token,
            "Content-Type": "application/json"
        }

    }).then(res => res.json())
}