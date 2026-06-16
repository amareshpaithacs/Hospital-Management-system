
import { BsExclamationTriangle, BsCheckCircle, BsCalendar, BsGraphUpArrow, BsBuilding, BsActivity, BsShieldCheck, BsPeople, BsCash, BsHospital, BsDroplet, BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Tooltip, Legend } from 'recharts';
import { chartColors, commonAxisLine, commonTick, commonGrid } from '../../config-service/chartConfig';
// revenue figures are in INR, raw values for chart formatting
const REVENUE_DATA = [
  { name: 'Jul', revenue: 420000 },
  { name: 'Aug', revenue: 380000 },
  { name: 'Sep', revenue: 440000 },
  { name: 'Oct', revenue: 410000 },
  { name: 'Nov', revenue: 480000 },
  { name: 'Dec', revenue: 510000 },
  { name: 'Jan', revenue: 460000 },
];

const PATIENT_DATA = [
  { name: 'Outpatient', value: 68 },
  { name: 'Inpatient', value: 22 },
  { name: 'Emergency', value: 10 },
];

const DEPT_DATA = [
  { name: 'Cardiology', Patients: 80, "Revenue (₹)": 130000 },
  { name: 'Orthopedics', Patients: 60, "Revenue (₹)": 95000 },
  { name: 'General', Patients: 40, "Revenue (₹)": 85000 },
  { name: 'Pediatrics', Patients: 30, "Revenue (₹)": 75000 },
  { name: 'Neurology', Patients: 70, "Revenue (₹)": 115000 },
];

// legend rows are derived from PATIENT_DATA — kept separate for rendering control
const PATIENT_LEGEND = [
  { label: "Outpatient", dotClass: "dot-primary", pct: "68%" },
  { label: "Inpatient", dotClass: "dot-secondary", pct: "22%" },
  { label: "Emergency", dotClass: "dot-warning", pct: "10%" },
];

function AdminContent() {
  return (
    <div className="container-fluid py-3 admin-content-container">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="page-title">Command Center</h2>
          <p className="page-subtitle">Hospital-wide operations and analytics</p>
        </div>
        <div className="action-buttons-group">
          <button className="btn-action-secondary">
            <BsCalendar size={16} />
            <span>Last 30 Days</span>
          </button>
          <button className="btn-action-primary">
            <BsGraphUpArrow size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card kpi-card">
            <div className="kpi-card-content d-flex justify-content-between">
              <div className="kpi-card-info d-flex flex-column gap-1">
                <h3 className="dash-card-title">Patients Today</h3>
                <div className="dash-card-value">127</div>
                <div className="dash-card-trend trend-up">
                  <BsArrowUpRight />
                  <span>+8.4% from yesterday</span>
                </div>
              </div>
              <div className="dash-card-icon icon-blue">
                <BsPeople />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card kpi-card">
            <div className="kpi-card-content d-flex justify-content-between">
              <div className="kpi-card-info d-flex flex-column gap-1">
                <h3 className="dash-card-title">Revenue Today</h3>
                <div className="dash-card-value">₹4.95L</div>
                <div className="dash-card-trend trend-up">
                  <BsArrowUpRight />
                  <span>+12% from yesterday</span>
                </div>
              </div>
              <div className="dash-card-icon icon-green">
                <BsCash />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card kpi-card">
            <div className="kpi-card-content d-flex justify-content-between">
              <div className="kpi-card-info d-flex flex-column gap-1">
                <h3 className="dash-card-title">Bed Occupancy</h3>
                <div className="dash-card-value">73%</div>
                <div className="dash-card-trend trend-up">
                  <BsArrowUpRight />
                  <span>+3% from yesterday</span>
                </div>
              </div>
              <div className="dash-card-icon icon-orange">
                <BsHospital />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card kpi-card">
            <div className="kpi-card-content d-flex justify-content-between">
              <div className="kpi-card-info d-flex flex-column gap-1">
                <h3 className="dash-card-title">Pending Lab Tests</h3>
                <div className="dash-card-value">43</div>
                <div className="dash-card-trend trend-down">
                  <BsArrowDownRight />
                  <span>-5% from yesterday</span>
                </div>
              </div>
              <div className="dash-card-icon icon-purple">
                <BsDroplet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8 col-lg-8">
          <div className="dash-card d-flex flex-column gap-4">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex flex-column gap-1">
                <h4 className="dash-card-title fw-bold">Revenue Trend</h4>
                <p className="page-subtitle mb-0">Last 7 months performance</p>
              </div>
              <span className="status-badge status-active mt-1">+12% growth</span>
            </div>
            <div className="revenue-chart-height w-100">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                  <CartesianGrid {...commonGrid} />
                  <XAxis dataKey="name" axisLine={commonAxisLine} tickLine={commonAxisLine} tick={commonTick} dy={10} />
                  <YAxis axisLine={commonAxisLine} tickLine={false} tick={commonTick} domain={[0, 600000]} ticks={[0, 150000, 300000, 450000, 600000]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke={chartColors.primary} strokeWidth={2} dot={{ r: 3, fill: '#FFFFFF', stroke: chartColors.primary, strokeWidth: 2 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4 col-lg-4">
          <div className="dash-card d-flex flex-column">
            <h4 className="card-title">Patient Distribution</h4>
            <p className="card-subtitle mb-2">Current patient types</p>
            <div className="donut-chart-size mx-auto">
              <PieChart width={200} height={200}>
                <Pie data={PATIENT_DATA} innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value">
                  {PATIENT_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors.pieColors[index % chartColors.pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="patient-legend-container mt-auto">
              {PATIENT_LEGEND.map(({ label, dotClass, pct }) => (
                <div key={label} className="patient-legend-row">
                  <span className="d-flex align-items-center gap-2">
                    <span className={`donut-legend-dot ${dotClass}`} />
                    <span className="text-secondary txt-13">{label}</span>
                  </span>
                  <span className="fw-medium txt-13">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8 col-lg-8">
          <div className="dash-card d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-1">
              <h4 className="card-title mb-0">Department Performance</h4>
              <p className="card-subtitle mb-0">Patient volume and revenue by department</p>
            </div>
            <div className="revenue-chart-height w-100">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={DEPT_DATA} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                  <CartesianGrid {...commonGrid} />
                  <XAxis dataKey="name" axisLine={commonAxisLine} tickLine={commonAxisLine} tick={commonTick} dy={10} />
                  <YAxis axisLine={commonAxisLine} tickLine={false} tick={commonTick} domain={[0, 140000]} ticks={[0, 35000, 70000, 105000, 140000]} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Legend iconType="square" align="center" verticalAlign="bottom" className="chart-legend-wrapper" />
                  <Bar dataKey="Patients" fill={chartColors.primary} radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="Revenue (₹)" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4 col-lg-4">
          <div className="dash-card d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex flex-column gap-1">
                <h4 className="card-title mb-0">System Alerts</h4>
                <p className="card-subtitle mb-0">Recent notifications</p>
              </div>
              <span className="alert-count-badge mt-1">4</span>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="alerts-list d-flex flex-column alerts-gap">
                <div className="alert-item alert-danger mb-0">
                  <div className="alert-icon txt-14"><BsExclamationTriangle /></div>
                  <div className="alert-content">
                    <h6 className="alert-title">ICU bed capacity at 92%</h6>
                    <p className="alert-time">10 mins ago</p>
                  </div>
                </div>
                
                <div className="alert-item alert-warning mb-0">
                  <div className="alert-icon txt-14"><BsExclamationTriangle /></div>
                  <div className="alert-content">
                    <h6 className="alert-title">Pharmacy stock low: Insulin</h6>
                    <p className="alert-time">1 hour ago</p>
                  </div>
                </div>
                
                <div className="alert-item alert-info mb-0">
                  <div className="alert-icon txt-14"><BsCheckCircle /></div>
                  <div className="alert-content">
                    <h6 className="alert-title">System backup completed</h6>
                    <p className="alert-time">2 hours ago</p>
                  </div>
                </div>
                
                <div className="alert-item alert-warning mb-0">
                  <div className="alert-icon txt-14"><BsExclamationTriangle /></div>
                  <div className="alert-content">
                    <h6 className="alert-title">5 items expiring in 30 days</h6>
                    <p className="alert-time">3 hours ago</p>
                  </div>
                </div>
              </div>
              <button className="btn-view-all m-0">View All Alerts</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card d-flex flex-column justify-content-center p-3 gap-1">
            <div className="d-flex align-items-center gap-2">
              <BsBuilding size={16} className="text-primary" />
              <span className="text-secondary txt-13">Active Branches</span>
            </div>
            <div className="text-dark txt-14 dash-card-value-pad">5 Locations</div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card d-flex flex-column justify-content-center p-3 gap-1">
            <div className="d-flex align-items-center gap-2">
              <BsActivity size={16} className="text-danger" />
              <span className="text-secondary txt-13">Critical Patients</span>
            </div>
            <div className="text-dark txt-14 dash-card-value-pad">8 Active</div>
          </div>
        </div>
        
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card d-flex flex-column justify-content-center p-3 gap-1">
            <div className="d-flex align-items-center gap-2">
              <BsCalendar size={16} className="text-purple" />
              <span className="text-secondary txt-13">Surgeries Today</span>
            </div>
            <div className="text-dark txt-14 dash-card-value-pad">5 Scheduled</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3 col-lg-3">
          <div className="dash-card d-flex flex-column justify-content-center p-3 gap-1">
            <div className="d-flex align-items-center gap-2">
              <BsShieldCheck size={16} className="text-success" />
              <span className="text-secondary txt-13">System Status</span>
            </div>
            <div className="text-dark txt-14 dash-card-value-pad">
              <span className="d-flex align-items-center gap-2">
                <span className="donut-legend-dot bg-success" />
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContent;
