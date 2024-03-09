import React from 'react';

function Table1({ rows }) {

  // Helper function to perform division and format the result
  const formatDivisionResult = (numerator, denominator) => {
    // Check if denominator is 0 to avoid division by zero
    if (denominator === 0) return "0.00";
    // Perform division and fix to 2 decimal places
    return (numerator / denominator).toFixed(2);
  };

  return (
    <div className="table-container mb-48">
      <div className="table-title">Total Campaign Overview</div>
      <table className="styled-table">
        <thead>
          <tr className='table-head'>
            <th className='camp_name'>Campaign Name</th>
            <th>Ad Spent</th>
            <th>Results</th>
            <th>Cost Per Results</th>
            <th>Clicks</th>
            <th>Impression</th>
            <th>Reach</th>
            <th>CPC</th>
            <th>CTR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.campaignName}</td>
              <td><span className='font-medium text-lg' contentEditable={true}>₹</span> {row.adSpent.toFixed(2)}</td>
              <td>{row.results}</td>
              <td><span className='font-medium text-lg' contentEditable={true}>₹</span> {formatDivisionResult(row.adSpent, row.results)}</td>
              <td>{row.clicks}</td>
              <td>{row.impression}</td>
              <td>{row.reach}</td>
              <td><span className='font-medium text-lg' contentEditable={true}>₹ </span>{formatDivisionResult(row.adSpent, row.clicks)}</td>
              <td>{(row.ctr/4).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table1;
