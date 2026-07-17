import { useNavigate } from "react-router-dom"
import { deleteReservation } from "../services/reservationServices"

export const ReservationList = ( {reservations, getAndSetReservations}) => {

        const navigate = useNavigate()

        const upcoming = reservations
            .filter((reservation) => new Date(reservation.scheduled_datetime) >= new Date())

         return (

            <div className="w-full overflow-x-auto rounded-2xl border border-white/10 shadow-lg">
                <table className="min-w-full divide-y divide-white/10 text-left">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-indigo-300">Trip</th>
                            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-indigo-300">Vehicle</th>
                            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-indigo-300">Date &amp; Time</th>
                            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-indigo-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {upcoming.length === 0 &&
                            <tr>
                                <td className="px-6 py-6 text-center text-white/60" colSpan={4}>
                                    No upcoming reservations.
                                </td>
                            </tr>
                        }

                        {upcoming.map((reservation) => {

                            const reservationDate = new Date (reservation.scheduled_datetime);

                            const dateTimeString = (new Intl.DateTimeFormat("en-US", {
                                dateStyle: "full",
                                timeStyle: "short",
                                timeZone: "UTC",
                                }).format(reservationDate).toString());

                            const handleDelete = () => {
                                deleteReservation(reservation.id).then(()=> {getAndSetReservations()})
                            }

                            const handleEdit = (e) => {
                                e.preventDefault()

                                navigate((`/edit/${reservation.id}`))
                            }

                            return (
                                <tr key={reservation.id} className="transition-colors hover:bg-white/5">
                                    <td className="px-6 py-4">{reservation.trip_vehicle.trip.name}</td>
                                    <td className="px-6 py-4">{reservation.trip_vehicle.vehicle.name}</td>
                                    <td className="px-6 py-4">{dateTimeString}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="btn-primary"
                                                onClick={handleEdit}
                                                >Edit
                                            </button>
                                            <button
                                                className="btn-danger"
                                                onClick= {handleDelete }
                                                >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )

}