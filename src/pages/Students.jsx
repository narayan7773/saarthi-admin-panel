import "./Tickets.css";
import { useState, useEffect } from "react";
import { getTickets } from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const data = await getTickets();

    const uniqueStudents = [];

    data.forEach((t) => {
      const exists = uniqueStudents.find(
        (s) => s.mobile === t.mobile
      );

      if (!exists) {
        uniqueStudents.push({
          name: t.name,
          mobile: t.mobile,
          gmail: t.gmail,
          course: t.course,
          batch: t.batch,
        });
      }
    });

    setStudents(uniqueStudents);
  }

  return (
    <div className="tickets-page">

      <h1>Students</h1>

      <input
        type="text"
        placeholder="🔍 Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Batch</th>
          </tr>
        </thead>

        <tbody>

          {students
            .filter((s) =>
              (
                s.name +
                s.mobile +
                s.course
              )
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((s, i) => (

              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.mobile}</td>
                <td>{s.course}</td>
                <td>{s.batch}</td>
              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}

export default Students;