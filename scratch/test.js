async function testApprove() {
  const res = await fetch('https://bango-parc-service.vercel.app/api/payment/approve', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentProofId: 1 })
  });
  console.log("Approve Status:", res.status);
  console.log("Approve Response:", await res.text());
}

async function testReject() {
  const res = await fetch('https://bango-parc-service.vercel.app/api/payment/reject', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentProofId: 1, rejectionReason: 'Test reason' })
  });
  console.log("Reject Status:", res.status);
  console.log("Reject Response:", await res.text());
}

async function run() {
  await testApprove();
  await testReject();
}

run();
