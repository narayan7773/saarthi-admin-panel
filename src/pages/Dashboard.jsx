import StatusChart from "../components/StatusChart";
import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      });
      
      useEffect(() => {
        loadDashboard();
      }, []);
      
      async function loadDashboard() {
        const data = await getDashboard();
        setStats(data);
      }
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>Saarthi Admin</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li onClick={() => navigate("/tickets")}>
  🎫 Tickets
</li>
<li onClick={() => navigate("/students")}>
  👨 Students
</li>
          <li>📊 Reports</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="content">
      <div className="topbar">

<div>
  <h1>Dashboard</h1>
  <p>Welcome back, Admin 👋</p>
</div>

<div className="topbar-right">
<div className="notification">

<span onClick={() => setShowNotifications(!showNotifications)}>
  🔔
</span>

{showNotifications && (

  <div className="notification-box">

    <p>🆕 New Ticket Received</p>

    <p>✅ Ticket Approved</p>

    <p>📌 11 Pending Requests</p>

  </div>

)}

</div>
  <div className="profile-menu">
  <span>👤 Narayan ▾</span>

  <div className="profile-dropdown">
    <p>👤 My Profile</p>
    <p>⚙ Settings</p>
    <p>🚪 Logout</p>
  </div>
</div>
  <span>{new Date().toLocaleDateString()}</span>
</div>

</div>

        <div className="cards">

          <div className="card">
          <h2>{stats.total}</h2>
            <p>Total Tickets</p>
          </div>

          <div className="card">
          <h2>{stats.pending}</h2>
            <p>Pending</p>
          </div>

          <div className="card">
          <h2>{stats.approved}</h2>
            <p>Approved</p>
          </div>

          <div className="card">
          <h2>{stats.rejected}</h2>
            <p>Rejected</p>
          </div>

        </div>
        <div className="dashboard-grid">

  <div className="chart-card">
    <h2>Status Analytics</h2>
    <StatusChart stats={stats} />
  </div>

  <div className="activity-card">
    <h2>Recent Activity</h2>

    <ul>
      <li>🆕 Rahul submitted a new ticket</li>
      <li>✅ Pushpa ticket approved</li>
      <li>🔄 Gourav requested validity extension</li>
      <li>📌 11 tickets are pending</li>
    </ul>
  </div>

</div>
      </main>

    </div>
  );
}

export default Dashboard;