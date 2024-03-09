import { useState } from 'react';

function Form({ onGenerate }) {
  const [campaignName, setCampaignName] = useState('');

  const initialWeekData = {
    adSpent: 0,
    results: 0,
    clicks: 0,
    impression: 0,
    reach:0,
    ctr: 0,
  };

  const [weeks, setWeeks] = useState(Array(4).fill().map(() => ({ ...initialWeekData })));

  const handleCampaignNameChange = (event) => {
    setCampaignName(event.target.value);
  };

  const handleWeekDataChange = (weekIndex, field, event) => {
    // Check if the input value is an empty string, if so, keep it as an empty string, otherwise convert to Number
    const value = event.target.value === '' ? '' : Number(event.target.value);
    const updatedWeeks = weeks.map((week, idx) =>
      idx === weekIndex ? { ...week, [field]: value } : week
    );
    setWeeks(updatedWeeks);
  };
  

  const calculateTotals = () => {
    const totals = Object.keys(initialWeekData).reduce((acc, metric) => {
      acc[metric] = weeks.reduce((sum, week) => sum + (week[metric] === '' ? 0 : week[metric]), 0);
      return acc;
    }, {});
    return totals;
  };
  

  const totals = calculateTotals();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!campaignName.trim()) {
        alert('Campaign name cannot be empty.');
        return;
      }
    const totals = calculateTotals();
    const costPerResult = totals.adSpent/totals.results
    onGenerate({ campaignName, ...totals, weeks, costPerResult }); 
    // Clearing all fields after submitting form
    // setCampaignName('');
    // setWeeks(Array(4).fill().map(() => ({ ...initialWeekData })));
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <div className="form-group">
          <label htmlFor="campaignName" className="form-label">Campaign Name:</label>
          <input
            type="text"
            id="campaignName"
            className="form-input"
            value={campaignName}
            onChange={handleCampaignNameChange}
          />
        </div>
        <div className="form-table-container">
          <table className="form-table w-full outline mt-3">
            <thead>
              <tr>
                <th>Week</th>
                <th>Ad Spent</th>
                <th>Results</th>
                <th>Clicks</th>
                <th>Impression</th>
                <th>Reach</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, index) => (
                <tr key={index}>
                  <td className='form-cell'>{`Week ${index + 1}`}</td>
                  {Object.keys(initialWeekData).map((metric) => (
                    <td key={metric} className='form-cell'>
                      <input
                        type="number"
                        value={week[metric]}
                        onChange={(e) => handleWeekDataChange(index, metric, e)}
                        className="form-input-number"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              {/* Total Row */}
              <tr>
                <td className='form-cell font-bold'>Total</td>
                {Object.values(totals).map((total, index) => (
                  <td key={index} className='form-cell font-bold'>
                    {total}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button className="form-submit-btn" type="submit">Generate</button>
      </form>
    </div>
  );
}

export default Form;
