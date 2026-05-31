async function run() {
  const res = await fetch('https://bango-parc-service.vercel.app/api/reservation/all');
  const data = await res.json();
  const list = data.data || [];
  console.log("Reservations found:", list.length);
  const withAreas = list.filter(r => r.areaReservations?.length > 0);
  console.log("Reservations with areas:", withAreas.length);
  if (withAreas.length > 0) {
    console.log("Sample reservation with area:", JSON.stringify(withAreas[0], null, 2));
  }
}

run();
