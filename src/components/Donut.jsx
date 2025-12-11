import React from 'react'
import { Doughnut } from 'react-chartjs-2'
export default function Donut(){
  const data = { labels:['Designers','Managers','Financial','Marketing'], datasets:[{ data:[20,32,32,16], backgroundColor:['#6b5bff','#f6c85f','#4f46e5','#2ca6dd'] }] }
  return <div style={{maxWidth:260}}><Doughnut data={data} /></div>
}
