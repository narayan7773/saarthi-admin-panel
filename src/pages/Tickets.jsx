import { useEffect, useState } from "react";
import { getTickets, updateTicket } from "../services/api";
import "./Tickets.css";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [remark, setRemark] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
  const data = await getTickets();
  setTickets(data);
  setCurrentPage(1);
}

  async function changeStatus(status) {
    await updateTicket(selected.ticket, status, remark);

    alert("Ticket Updated Successfully");

    setSelected(null);
    setRemark("");

    loadTickets();
  }
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      (
        t.ticket +
        t.name +
        t.mobile +
        t.gmail
      )
        .toLowerCase()
        .includes(search.toLowerCase());
  
    const matchesStatus =
      statusFilter === "All" ||
      t.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });
  
  const lastIndex = currentPage * ticketsPerPage;
  const firstIndex = lastIndex - ticketsPerPage;
  
  const currentTickets = filteredTickets.slice(firstIndex, lastIndex);
  
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  return (
    <div className="tickets-page">

      <h1>Ticket Management</h1>
      <input
  type="text"
  placeholder="🔍 Search Ticket, Name, Mobile, Gmail..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
  className="search-box"
/>
<select
  value={statusFilter}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }}
  className="filter-box"
>
  <option>All</option>
  <option>Pending</option>
  <option>Approved</option>
  <option>Rejected</option>
</select>

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
        {currentTickets.map((t) => (
            <tr key={t.ticket}>
              <td>{t.ticket}</td>
              <td>{t.name}</td>
              <td>{t.course}</td>
              <td>
  <span className={`status-badge ${t.status.toLowerCase()}`}>
    {t.status}
  </span>
</td>

              <td>
                <button onClick={() => setSelected(t)}>
                  View
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ⬅ Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next ➡
  </button>

</div>

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