import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function CVR(array) {

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'CVR:Clicks To Leads',
        data: array.data, // Replace with your data
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
        tension: 0.4,
      },
      // Add more datasets for other metrics if needed
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        
      },
      x: {
        offset: true,
        grid: {
          display: false,
        },
      },
    },
  };
  
  return (
    <div>
              <div className="chart-heading text-[#1457D1] bg-[#EDF2FC] rounded-lg rounded-b-none">CVR:Clicks To Leads</div>
       <div className='text-4xl text-center font-bold text-[#023B8A]'>{array.cvr}%</div>
      <Line data={data} options={options} className='p-5' />
    </div>
  )
}

export default CVR