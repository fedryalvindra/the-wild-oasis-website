// can export 1 or more functions where each of them can corresponds to one of the http verbs

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// for get request (received request and obj of params)
// need GET because convention of HTTP verb
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
