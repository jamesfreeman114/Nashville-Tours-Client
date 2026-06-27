import { getTripById } from "../services/tripServices"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createReservation } from "../services/reservationServices"

export const TripForm = () => {
    
    const { id } = useParams()
    const [trip, setTrip] = useState([])
    const [tripVehicleId, setTripVehicleId] = useState(0)
    const [vehicleOptions, setVehicleOptions] = useState([])
    const [reservationDatetime, setReservationDatetime] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        getTripById(id).then((trip) => setTrip(trip))
    },[])

    console.log(trip)

    const handleSave = (event) => {
        event.preventDefault()

        const newReservation = {
            tripVehicleId: tripVehicleId,
            scheduled_datetime: reservationDatetime
        }

        createReservation(newReservation).then(() =>{
            navigate(`/profile`)
        })
    }
    

    
    
    // Form needs to have two dropdown select fields where the user can choose day/time and vehicle then have a button to create the reservation

    //Functions needed: get tripvehicleoptions based on trip type. -> set trip vehicle options. select tripvehicleoption by vehicle. set tripvehicleId by vehicle chosen

    //backend function that gets vehicle options based on trip Id
    //

    //form for selecting a date/time then parsing that into a datetime field that can be read by the api --> https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local

    //styling: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Advanced_form_styling

    //tailwind datetimepicker: https://tw-elements.com/docs/standard/forms/datetimepicker/

    //create reservation that takes the userId from request.auth.user, the datetime from the form, and the tripvehicle option Id  

    return (

      

        <form>
            <h1>Book Your Reservation</h1>
            <fieldset >
                <label>Vehicle Type</label>
                <input type="number"
                    onChange = { e => {
                        setTripVehicleId(e.target.value)
                    }

                    }/>

            </fieldset>
            <fieldset>
                <label htmlFor="datetime">Enter a date and time for your Reservation:</label>
                <input id="datetime" 
                       type="datetime-local" 
                       name="reservation-datetime"
                       onChange = { e => {
                          setReservationDatetime(e.target.value)

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