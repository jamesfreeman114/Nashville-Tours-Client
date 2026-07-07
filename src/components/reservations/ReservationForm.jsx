import { getVehiclesByTripType } from "../services/tripVehicleServices"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createReservation } from "../services/reservationServices"
import { getTripById } from "../services/tripServices"


export const ReservationForm = () => {

    const initialReservationState = {
        tripVehicleId: 0,
        scheduled_datetime: "",
    }
    
    const { id } = useParams()
    const [reservation, updateReservationProps] = useState(initialReservationState)
    const [loading, setLoading] = useState(true)
    const [trip, setTrip] = useState({})
    const [vehicleOptions, setVehicleOptions] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getVehiclesByTripType(id).then((vehicles) => setVehicleOptions(vehicles))
    }, [])

    useEffect(()=>{
        getTripById(id).then((tripObj) => {
            setTrip(tripObj); 
            setLoading(false)});
    }, [])

    const handleSave = e => {
        e.preventDefault()

        createReservation(reservation).then(() =>{
            window.alert("Reservation Saved")
            navigate(`/profile`)
        })
    }


    if (loading) {

        return ""
    } 

 

    return (


        <div className="m-5 flex flex-col items-center rounded-xl border-2 border-indigo-500" >

        <form className="text-center p-10">
            <h1 className="p-5">Book Your {trip.name} Reservation</h1>
            <fieldset className="p-10">
                <label>Vehicle Type: </label>
                <select 
                        onChange={ e => {
                        const copy = { ...reservation}
                        copy.tripVehicleId = e.target.value
                        updateReservationProps(copy)
                    }}>
                        <option 
                        
                        value="">Select a Vehicle:</option>
                        {vehicleOptions.map((option) => {
                            return (
                                <option
                                key={option.id}
                                value={option.id}
                            >
                                {option.vehicle.name}
                            </option>
                            )
                        })}
                    </select>

            </fieldset>
            <fieldset className="p-10">
                <label htmlFor="datetime">Enter a date and time for your Reservation:</label>
                <input id="datetime" 
                       type="datetime-local" 
                       name="reservation-datetime"
                       className="p-5"
                       onChange = { e => {
                            const copy = { ...reservation}
                            copy.scheduled_datetime = e.target.value
                            updateReservationProps(copy)

                       }} />
            </fieldset>
            <fieldset>
                <button
                    onClick={handleSave}>Create Reservation
                </button>
            </fieldset>
        </form>
        </div>

     )
}