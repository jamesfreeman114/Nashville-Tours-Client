import { getReservationById, editReservation } from "../services/reservationServices"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVehiclesByTripType } from "../services/tripVehicleServices"

export const EditReservationForm = () => {

    const {id} = useParams()
    const [reservation, setReservation] = useState({})
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

        const reservationData = {
        tripVehicleId: reservation.tripVehicleId,
        scheduled_datetime: reservation.scheduled_datetime,
    }
        if (reservationData.tripVehicleId && reservationData.scheduled_datetime) 
        editReservation(id, reservationData).then(() => {
            window.alert("Changes Saved")
            navigate("/profile")}

        )

        else (
            window.alert("Please complete the form")
        )


    }


    return (

        <div className="m-5 flex flex-col items-center rounded-xl border-2 border-indigo-500" >
            

            <form className="text-center p-10">
            <h1 className="p-5">Edit Your {reservation?.trip_vehicle?.trip.name} Reservation</h1>
            <fieldset className="p-10">
                <label>Vehicle Type: </label>
                <select  
                        onChange = { e => {
                            const copy = { ...reservation}
                            copy.tripVehicleId = e.target.value
                            setReservation(copy)}}

                    >
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
                <label htmlFor="datetime">Pickup Time:</label>
                <input id="datetime" 
                       type="datetime-local" 
                       name="reservation-datetime"
                       onChange = { e => {
                            const copy = { ...reservation}
                            copy.scheduled_datetime = e.target.value
                            setReservation(copy)

                       }} />
            </fieldset>
            <fieldset>
                <button
                    onClick={handleSubmit}>Confirm Changes
                </button>
            </fieldset>
            </form>



        </div>



)
    
}