fetch('https://bango-parc-service.vercel.app/api/payment')
  .then(r => r.json())
  .then(res => {
    console.log("Payments API response:", JSON.stringify(res, null, 2));
  })
  .catch(err => console.error("Error:", err));
