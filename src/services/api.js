const API_URL =
"https://script.google.com/macros/s/AKfycbwWfeN_vzs4INnsqj_wijUin3Llr6TN1WvyuoKSgmoN_WlZnxhSeyeZr31gSbezeYG0Wg/exec";

export async function getTickets() {
  const res = await fetch(`${API_URL}?action=tickets`);
  return await res.json();
}

export async function getDashboard() {
  const res = await fetch(`${API_URL}?action=dashboard`);
  return await res.json();
}

export async function updateTicket(ticket, status, remark = "") {
  const res = await fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "update",
      ticket,
      status,
      remark,
    }),
  });

  return await res.json();
}