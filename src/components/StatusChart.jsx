import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  function StatusChart({ stats }) {
    const data = [
      {
        name: "Pending",
        value: stats.pending,
      },
      {
        name: "Approved",
        value: stats.approved,
      },
      {
        name: "Rejected",
        value: stats.rejected,
      },
    ];
  
    const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];
  
    return (
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
  
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default StatusChart;