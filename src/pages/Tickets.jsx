import { useEffect, useState } from "react";
import { getTickets, updateTicket } from "../services/api";
import "./Tickets.css";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    const data = await getTickets();
    setTickets(data);
  }

  async function changeStatus(status) {
    await updateTicket(selected.ticket, status, remark);

    alert("Ticket Updated Successfully");

    setSelected(null);
    setRemark("");

    loadTickets();
  }

  return (
    <div className="tickets-page">

      <h1>Ticket Management</h1>

      <table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.ticket}>
              <td>{t.ticket}</td>
              <td>{t.name}</td>
              <td>{t.course}</td>
              <td>{t.status}</td>

              <td>
                <button onClick={() => setSelected(t)}>
                  View
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {selected && (

        <div className="popup">

          <div className="popup-card">

            <h2>{selected.ticket}</h2>

            <p><b>Name:</b> {selected.name}</p>

            <p><b>Mobile:</b> {selected.mobile}</p>

            <p><b>Course:</b> {selected.course}</p>

            <p><b>Batch:</b> {selected.batch}</p>

            <p><b>Request:</b> {selected.requestType}</p>

            <p><b>Remark:</b> {selected.remark}</p>

            <textarea
              placeholder="Admin Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />

            <div className="buttons">

              <button
                className="approve"
                onClick={() => changeStatus("Approved")}
              >
                Approve
              </button>

              <button
                className="reject"
                onClick={() => changeStatus("Rejected")}
              >
                Reject
              </button>

              <button
                onClick={() => setSelected(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tickets;