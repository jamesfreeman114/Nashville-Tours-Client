import { getReservationById, editReservation } from "../services/reservationServices"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVehiclesByTripType } from "../services/tripVehicleServices"

export const EditReservationForm = () => {

    const initialState = {
        tripVehicleId: 0,
        scheduled_datetime: "",
    }

    const {id} = useParams()
    const [reservation, setReservation] = useState({})
    const [reservationProps, updateReservationProps] = useState(initialState)
    const [vehicleOptions, setVehicleOptions] = useState([])

    const navigate = useNavigate()
    
    const tripId = reservation?.trip_vehicle?.trip.id

  
    useEffect(()=>{
        getReservationById(id).then((res) => setReservation(res))
    }, [id])

    useEffect(()=>{

        if (tripId)

        getVehiclesByTripType(tripId).then((vehicles) => setVehicleOptions(vehicles))
        }, [reservation, tripId])

    
    const handleSubmit = e => {
        e.preventDefault()

        editReservation(id, reservationProps).then(() => {
            navigate("/")
        })


    }


    return (

        <>
            <h1>Edit Your {reservation?.trip_vehicle?.trip.name} Reservation</h1>

            <form>
            <fieldset >
                <label>Vehicle Type: </label>
                <select  onChange = { e => {
                            const copy = { ...reservationProps}
                            copy.tripVehicleId = e.target.value
                            updateReservationProps(copy)}}

                    >
                        <option value="">Select a Vehicle:</option>
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
            <fieldset>
                <label htmlFor="datetime">Pickup Time:</label>
                <input id="datetime" 
                       type="datetime-local" 
                       name="reservation-datetime"
                       onChange = { e => {
                            const copy = { ...reservationProps}
                            copy.scheduled_datetime = e.target.value
                            updateReservationProps(copy)

                       }} />
            </fieldset>
            <fieldset>
                <button
                    onClick={handleSubmit}>Edit Reservation</button>
            </fieldset>
            </form>


            

        
        </>



)
    
}