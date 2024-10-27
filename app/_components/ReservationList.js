"use client";

import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  // 2 types of state: like useReducer
  //   1. actual state: booking data
  //   2. optimistic state: arguments usually same one actual operation

  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id != bookingId);
    }
  );

  async function handleDelete(bookingId) {
    // optimistic delete
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
