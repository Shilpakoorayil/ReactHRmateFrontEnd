import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import MiniChart from '../components/MiniChart'
import Donut from '../components/Donut'
import CalendarComp from '../components/Calendar'
import { AuthContext } from '../context/AuthContext'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Dashboard(){
  const { user } = useContext(AuthContext)
  return (
    <div className='app'>
      <Sidebar />
      <div className='main'>
        <Topbar />
        <section className='dashboard'>
          <div className='hero'>
            <div>
              <p className='greet'>Good Morning{user? ', '+user.email : ''}!</p>
              <h1>Employee Overview</h1>
            </div>
            <div className='hero-actions'>
              <button className='btn'>5 Important message</button>
              <button className='btn primary'>Add a Request</button>
            </div>
          </div>

          <div className='cards-row'>
            <div className='card stat'><div className='icon'>👥</div><div className='value'>1,450 <span className='muted'>+5.15%</span></div><div className='label'>Total Employees</div></div>
            <div className='card stat'><div className='icon'>🧾</div><div className='value'>950 <span className='muted'>+2.05%</span></div><div className='label'>Job Applicants</div></div>
            <div className='card stat'><div className='icon'>➕</div><div className='value'>856 <span className='muted red'>-5.15%</span></div><div className='label'>New Employees</div></div>
            <div className='card stat'><div className='icon'>↩️</div><div className='value'>450 <span className='muted'>-2.25%</span></div><div className='label'>Resigned Employees</div></div>
          </div>

          <div className='main-grid'>
            <div className='panel large'>
              <div className='panel-header'><h3>Employee Performance</h3><button className='link'>View Details</button></div>
              <MiniChart />
            </div>

            <div className='panel right'><Donut /></div>

            <div className='panel calendar'><h3>Upcoming Schedules</h3><CalendarComp /></div>

            <div className='panel list'><h3>Employee List</h3><ul className='elist'>
              <li><img src='https://i.pravatar.cc/40?img=1' alt='' /><div><strong>Sophia</strong><div className='small'>Product Manager</div></div></li>
              <li><img src='https://i.pravatar.cc/40?img=2' alt='' /><div><strong>Mason</strong><div className='small'>Product Designer</div></div></li>
              <li><img src='https://i.pravatar.cc/40?img=3' alt='' /><div><strong>Emily</strong><div className='small'>Product Manager</div></div></li>
              <li><img src='https://i.pravatar.cc/40?img=4' alt='' /><div><strong>Daniel</strong><div className='small'>Server Engineer</div></div></li>
            </ul></div>
          </div>
        </section>
      </div>
    </div>
  )
}
