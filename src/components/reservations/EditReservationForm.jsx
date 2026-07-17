import { getReservationById, editReservation } from "../services/reservationServices"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVehiclesByTripType } from "../services/tripVehicleServices"

export const EditReservationForm = () => {

    const {id} = useParams()
    const [reservation, setReservation] = useState({})
    const [vehicleOptions, setVehicleOptions] = useState([])
    const [tripVehicleId, setTripVehicleId] = useState(reservation?.trip_vehicle?.id)
    const [pickupDate, setPickupDate] = useState("")

    const navigate = useNavigate()

    const tripId = reservation?.trip_vehicle?.trip.id


    useEffect(()=>{
        getReservationById(id).then((res) => {setReservation(res)
        setTripVehicleId(res.trip_vehicle.id)
        setPickupDate(new Date(res.scheduled_datetime).toISOString().slice(0, 16))})
    }, [id])

    useEffect(()=>{

        if (tripId)

        getVehiclesByTripType(tripId).then((vehicles) => setVehicleOptions(vehicles))
        }, [reservation, tripId])

    
    const handleSubmit = e => {
        e.preventDefault()

        const reservationData = {
        tripVehicleId: tripVehicleId,
        scheduled_datetime: pickupDate,
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

        <div className="form-card">

            <form className="w-full text-center">
            <h1 className="mb-6 text-2xl">Edit Your {reservation?.trip_vehicle?.trip.name} Reservation</h1>
            <fieldset className="mb-5 flex flex-col items-start gap-1">
                <label className="text-sm font-medium text-white/80">Vehicle Type: </label>
                <select
                        className="field"
                        value={tripVehicleId}
                        onChange = { e =>
                            setTripVehicleId(e.target.value)}

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
            <fieldset className="mb-6 flex flex-col items-start gap-1">
                <label htmlFor="datetime" className="text-sm font-medium text-white/80">Pickup Time:</label>
                <input id="datetime"
                       type="datetime-local"
                       name="reservation-datetime"
                       className="field"
                       value={pickupDate}
                       onChange = { e => setPickupDate(e.target.value) } />
            </fieldset>
            <fieldset>
                <button
                    className="btn-primary px-6 py-2 text-base"
                    onClick={handleSubmit}>Confirm Changes
                </button>
            </fieldset>
            </form>



        </div>



)

}