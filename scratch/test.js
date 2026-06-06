async function run() {
  const res = await fetch('https://bango-parc-service.vercel.app/api/reservation/all');
  const data = await res.json();
  const list = data.data || [];
  const found = list.find(r => r.bookingCode === "RSV-1780716415482");
  console.log("Found reservation:", JSON.stringify(found, null, 2));
}

run();
