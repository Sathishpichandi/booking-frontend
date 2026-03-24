import MainLayout from "../components/MainLayout";
import { motion } from "framer-motion";


function Dashboard() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Welcome, Admin ✈
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>

          <div className="glass-card">
            <h3>Flights</h3>
            <p>12 Active</p>
            <button className="primary-btn">Manage</button>
          </div>

          <div className="glass-card">
            <h3>Trains</h3>
            <p>5 Active</p>
            <button className="primary-btn">Manage</button>
          </div>

          <div className="glass-card">
            <h3>Buses</h3>
            <p>8 Active</p>
            <button className="primary-btn">Manage</button>
          </div>

          <div className="glass-card">
            <h3>Cars</h3>
            <p>3 Active</p>
            <button className="primary-btn">Manage</button>
          </div>

        </div>
      </motion.div>
    </MainLayout>
  );
}

export default Dashboard;