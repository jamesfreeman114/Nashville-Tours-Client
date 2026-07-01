import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
// import App from "../App.jsx"
import { TripList } from "./trips/TripList.jsx"
import { TripDetail } from "./trips/TripDetail.jsx"
import { Profile } from "./profile/Profile.jsx"
import { TripForm } from "./trips/TripForm.jsx"
import { EditReservationForm } from "./reservations/EditReservationForm.jsx"

const ApplicationViews = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<TripList />} />
                <Route path="/:id" element={<TripDetail />} />
                <Route path="/:id/book" element={<TripForm />} />
                <Route path="/edit/:id" element={< EditReservationForm/>} />
                <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default ApplicationViews
