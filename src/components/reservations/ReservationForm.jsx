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

        if ( reservation.tripVehicleId === 0 || reservation.scheduled_datetime === "" ) 
            
        window.alert("Please complete the form")
        
        else 

        createReservation(reservation).then(() =>{
            window.alert("Reservation Saved")
            navigate(`/profile`)
        })
    }


    if (loading) {

        return ""
    } 

 

    return (

        <div className="form-card">

        <form className="w-full text-center">
            <h1 className="mb-6 text-2xl">Book Your {trip.name} Reservation</h1>
            <fieldset className="mb-5 flex flex-col items-start gap-1">
                <label className="text-sm font-medium text-white/80">Vehicle Type: </label>
                <select
                        className="field"
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
            <fieldset className="mb-6 flex flex-col items-start gap-1">
                <label htmlFor="datetime" className="text-sm font-medium text-white/80">Enter a date and time for your Reservation:</label>
                <input id="datetime"
                       type="datetime-local"
                       name="reservation-datetime"
                       className="field"
                       onChange = { e => {
                            const copy = { ...reservation}
                            copy.scheduled_datetime = e.target.value
                            updateReservationProps(copy)

                       }} />
            </fieldset>
            <fieldset>
                <button
                    className="btn-primary px-6 py-2 text-base"
                    onClick={handleSave}>Create Reservation
                </button>
            </fieldset>
        </form>
        </div>

     )
}