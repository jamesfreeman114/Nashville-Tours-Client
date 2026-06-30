import { getVehiclesByTripType } from "../services/tripVehicleServices"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createReservation } from "../services/reservationServices"

export const TripForm = () => {

    // Currently API is requesting mixed case format. Fix this on the backend then update here.
    const initialReservationState = {
        tripVehicleId: 0,
        scheduled_datetime: "",
    }
    
    const { id } = useParams()
    const [reservation, updateReservationProps] = useState(initialReservationState)
    const [vehicleOptions, setVehicleOptions] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getVehiclesByTripType(id).then((vehicles) => setVehicleOptions(vehicles))
    }, [])

    const handleSave = e => {
        e.preventDefault()
        createReservation(reservation).then(() =>{
            navigate(`/profile`)
        })
    }
    


    //datetime input info --> https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local

    //styling: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Advanced_form_styling

    //tailwind datetimepicker: https://tw-elements.com/docs/standard/forms/datetimepicker/


    return (

        <form>
            <h1>Book Your Reservation</h1>
            <fieldset >
                <label>Vehicle Type</label>
                <select onChange={ e => {
                        const copy = { ...reservation}
                        copy.tripVehicleId = e.target.value
                        updateReservationProps(copy)
                    }}>
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
                <label htmlFor="datetime">Enter a date and time for your Reservation:</label>
                <input id="datetime" 
                       type="datetime-local" 
                       name="reservation-datetime"
                       onChange = { e => {
                            const copy = { ...reservation}
                            copy.scheduled_datetime = e.target.value
                            updateReservationProps(copy)

                       }} />
            </fieldset>
            <fieldset>
                <button
                    onClick={handleSave}>Click Me!
                </button>
            </fieldset>
        </form>
    )
}