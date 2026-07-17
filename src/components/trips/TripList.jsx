import { getAllTrips } from "../services/tripServices"
import { getAllReviews } from "../services/reviewServices"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Rating } from "react-simple-star-rating"
import heroImage from "../../assets/nashville-skyline.jpg"

const TRIPS_PER_PAGE = 3
const RANDOM_REVIEW_COUNT = 3

export const TripList = () => {

    const [trips, setTrips] = useState([])
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(0)

    useEffect(()=>{
        getAllTrips().then((allTrips) => setTrips(allTrips))
    },[])

    useEffect(()=>{
        getAllReviews().then((allReviews) => {
            const shuffled = [...allReviews].sort(() => Math.random() - 0.5)
            setReviews(shuffled.slice(0, RANDOM_REVIEW_COUNT))
        })
    },[])

    const pageCount = Math.ceil(trips.length / TRIPS_PER_PAGE)
    const visibleTrips = trips.slice(page * TRIPS_PER_PAGE, page * TRIPS_PER_PAGE + TRIPS_PER_PAGE)

    const goToPrevPage = () => setPage((current) => Math.max(current - 1, 0))
    const goToNextPage = () => setPage((current) => Math.min(current + 1, pageCount - 1))

    return (

        <>

        <section className="relative flex h-[60vh] min-h-80 w-full flex-col items-center justify-center overflow-hidden text-center">
            <img
                src={heroImage}
                alt="Nashville skyline at sunset"
                className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl">
                    Nashville Rides &amp; Tours
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/90 drop-shadow">
                    Select one of our options below for trip details, booking info, and reviews
                </p>
            </div>
        </section>

        <div className="flex items-center justify-center gap-3 p-6 sm:gap-6">

            <button
                type="button"
                className="btn-icon"
                onClick={goToPrevPage}
                disabled={page === 0}
                aria-label="Previous trips"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
                {visibleTrips.map((trip) => (
                    <Link className="review-card block"
                        key={trip.id}
                        to={`./${trip.id}`}>
                            <img className="aspect-video w-full rounded-xl object-cover"
                                src={trip.image_path}
                                alt={trip.name}/>
                            <p className="pt-4 text-xl font-semibold">{trip.name}</p>
                    </Link>
                ))}
            </div>

            <button
                type="button"
                className="btn-icon"
                onClick={goToNextPage}
                disabled={page >= pageCount - 1}
                aria-label="Next trips"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

        </div>

        <h2 className="mt-6 text-center text-2xl font-semibold">What Our Riders Are Saying</h2>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
                <div key={review.id} className="review-card">
                    <p className="text-lg font-semibold">{review.trip.name}</p>
                    <div className="my-2 flex justify-center">
                        <Rating initialValue={review.rating} readonly={true} />
                    </div>
                    <p className="flex-1 text-white/80">"{review.comment}"</p>
                    <p className="mt-3 text-sm text-white/60">
                        &mdash; {review.user.first_name} {review.user.last_name?.charAt(0)}.
                    </p>
                </div>
            ))}
        </div>

        </>


    )}
