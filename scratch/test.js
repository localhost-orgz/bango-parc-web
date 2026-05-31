async function run() {
  const res = await fetch('https://bango-parc-service.vercel.app/api/reservation/all');
  const data = await res.json();
  console.log("Reservations count:", data.data?.length);
  const sample = data.data?.[0] || {};
  console.log("Keys in first reservation:", Object.keys(sample));
  console.log("Sample reservation customer info:", JSON.stringify(sample.customer || sample.customerId, null, 2));
  console.log("Full sample reservation:", JSON.stringify(sample, null, 2));
}

run();
