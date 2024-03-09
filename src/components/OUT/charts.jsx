import React from 'react'
import Leads from './charts/leads'
import AdSpent from './charts/adSpend'
import Impression from './charts/impression';
import Reach from './charts/reach';
import LinkClicks from './charts/linkClicks';
import CostPerLead from './charts/costPerLead'
import Cpc from './charts/cpc';
import LinkClickthroughRate from './charts/LinkClickthroughRate';
import CVR from './charts/CVR';

function charts(data) {
    const leads = data.data.map(item => item.results);
    const adspend = data.data.map(item => item.adSpent)
    const impression = data.data.map(item => item.impression)
    const reach = data.data.map(item => item.reach)
    const linksClick = data.data.map(item => item.clicks)
    const costPerLead = data.data.map(item => item.adSpent/item.results)
    const cpc = data.data.map(item => item.adSpent/item.clicks)
    const linkClickRate = data.data.map(item => item.ctr)
    const cvrClicksToLead = data.data.map(item => (item.results/item.clicks)*100)

    const formatDivisionResult = (numerator, denominator) => {
      // Check if denominator is 0 to avoid division by zero
      if (denominator === 0) return "0.00";
      // Perform division and fix to 2 decimal places
      return (numerator / denominator).toFixed(2);
    };
  
    const sumOfLead = leads.reduce((acc, currentValue) => acc + currentValue, 0);
    const sumOfAdspend = adspend.reduce((acc, currentValue) => acc + currentValue, 0);
    const sumOfImpression = impression.reduce((acc, currentValue) => acc + currentValue, 0);
    const sumOflinksClick = linksClick.reduce((acc, currentValue) => acc + currentValue, 0);
    const sumOfcostPerLead = costPerLead.reduce((acc, currentValue) => acc + currentValue, 0);
    const sumOfCpc = cpc.reduce((acc, currentValue) => acc + currentValue, 0);
    const sumOflinkClickRate = linkClickRate.reduce((acc, currentValue) => acc + currentValue, 0);
   
    const cpl = formatDivisionResult(sumOfAdspend,sumOfLead) 
    const costPerClick = formatDivisionResult(sumOfAdspend,sumOflinksClick)
    const cvr = formatDivisionResult(sumOfLead,sumOflinksClick)
    const cvrAvg = (cvr*100).toFixed(0)
    console.log(sumOfCpc)
  return (
    <>
   <div className='flex justify-center items-center pt-5 m-auto mt-10 gap-3 text-center max-w-[1150px]' >
  <div className=' rounded-full w-[60px] h-[60px] bg-[#2572FF] leading-normal  text-4xl text-white font-bold'>{data.campaignNumber}</div>
  <span className='campaingn-devider me-5 ms-3'></span>
  <h1 className='text-[#193E7C] text-[40px] font-bold campaign-name'>Campaign-{data.campaignNumber}: {data.name}</h1>
</div>

    <div className='flex justify-center w-[80%] m-auto gap-5 mb-5 mt-14'>
      <div className="chart-first-row chart-leads">
        <Leads data={leads} />
      </div>
      <div className="chart-first-row chart-adspend">
        <AdSpent data={adspend} />
      </div>
      </div>
      <h2  className='text-[#193E7C] text-[38px] text-center font-bold pt-10'>Paid Traffic Metrics</h2>
    <div className="charts-container mt-8 ">
      <div className="chart chart-impression">
        <Impression data={impression} />
      </div>
      <div className="chart chart-reach">
        <Reach data={reach} />
      </div>
      <div className="chart chart-linksClick">
        <LinkClicks data={linksClick} />
      </div>
      <div className="chart chart-costPerLead">
        <CostPerLead data={costPerLead} cpl={cpl} />
      </div>
      <div className="chart chart-costPerLead">
        <Cpc data={cpc} cpc={costPerClick} />
      </div>
      <div className="chart chart-linksClickRate">
        <LinkClickthroughRate data={linkClickRate} />
      </div>
      {/* ... other chart components */}
    </div>
    <h2  className='text-[#193E7C] text-[38px] text-center font-bold pt-12 pb-5'>Conversion Rates</h2>

    <div className="chart-first-row chart-cvr m-auto">
        <CVR data={cvrClicksToLead} cvr={cvrAvg} />
      </div>


      <table className="styled-table mt-20">
        <thead>
          <tr className='table-head'>
            <th className='camp_name'>Campaign Name</th>
            <th>Ad Spent</th>
            <th>Results</th>
            <th>Cost Per Results</th>
            <th>Clicks</th>
            <th>Impression</th>
            <th>CPC</th>
            <th>CTR</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td className='!p-8'>{data.name}</td>
              <td>₹{sumOfAdspend.toFixed(2)}</td>
              <td>{sumOfLead}</td>
              <td>₹{cpl}</td>
              <td>{sumOflinksClick}</td>
              <td>{sumOfImpression}</td>
              <td>₹{costPerClick}</td>
              <td>{sumOflinkClickRate.toFixed(1)}%</td>
            </tr>
        </tbody>
      </table>

    </>
  )
}

export default charts
