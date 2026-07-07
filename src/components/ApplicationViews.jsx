import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { TripList } from "./trips/TripList.jsx"
import { TripDetail } from "./trips/TripDetail.jsx"
import { Profile } from "./profile/Profile.jsx"
import { ReservationForm } from "./reservations/ReservationForm.jsx"
import { EditReservationForm } from "./reservations/EditReservationForm.jsx"
import { ReviewForm } from "./reviews/ReviewForm.jsx"
import { EditReviewForm } from "./reviews/EditReviewForm.jsx"

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<TripList />} />
                <Route path="/:id" element={<TripDetail />} />
                <Route path="/:id/book" element={<ReservationForm />} />
                <Route path="/:id/review" element={<ReviewForm/>} />
                <Route path="/edit/:id" element={< EditReservationForm/>} />
                <Route path="/edit/review/:id" element={<EditReviewForm/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default ApplicationViews
