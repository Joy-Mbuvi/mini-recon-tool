import React from 'react';
import './resultstable.css';

export default function ResultsTable({ results }) {

  const fieldMap = {
    'amount': 'Amount',
    'status': 'Status',
    'time_stamps': 'Timestamp',
    'internal_amount': 'Internal Amount',
    'provider_amount': 'Provider Amount',
    'internal_status': 'Internal Status',
    'provider_status': 'Provider Status'
  };

  function getCategoryKeys(title) {
    switch (title) {
      case 'Matched':
      case 'Only in Provider':
      case 'Only in Transaction':
        return ['Ref', 'amount', 'status', 'time_stamps'];
      case 'Mismatched':
        return ['Ref', 'internal_amount', 'provider_amount', 'internal_status', 'provider_status'];
      default:
        return ['Ref'];
    }
  }

  function Category({ title, data }) {
    if (!data || Object.keys(data).length === 0) return null;

    const keys = getCategoryKeys(title);

    return (
      <div className="category">
        <h3>{title}</h3>
        <table className="results-table">
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{fieldMap[key] || key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([ref, item]) => (
              <tr key={ref}>
                <td>{ref}</td>
                {keys.slice(1).map((key) => (
                  <td key={key}>{item[key] ?? ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const downloadCsv = () => {
  const toCSV = (data, section) => {
    const rows = [];
    
    rows.push([section]);
    rows.push([]);
    
    if (section === "Mismatched") {
      rows.push(['Ref', 'Field', 'Internal Value', 'Provider Value']);
      for (const [ref, item] of Object.entries(data)) {  // Fixed: 'of' not 'in'
        if (item.provider_amount !== item.internal_amount) {
          rows.push([ref, 'Amount', item.internal_amount, item.provider_amount]);
        }
        if (item.provider_status !== item.internal_status) {
          rows.push([ref, 'Status', item.internal_status, item.provider_status]); // Fixed variables
        }
      }
    } else {
      rows.push(['Ref', 'Amount', 'Status', 'Timestamps']);
      for (const [ref, item] of Object.entries(data)) {  // Fixed: 'of' not 'in'
        rows.push([ref, item.amount, item.status, item.time_stamps]);
      }
    }
    
    rows.push([]);
    return rows;  
  };  

  let csvContent = [];

  if (results.matched) {
    csvContent = csvContent.concat(toCSV(results.matched, "Matched"));
  }
  if (results.mismatches) {
    csvContent = csvContent.concat(toCSV(results.mismatches, "Mismatched"));
  }
  if (results.only_internal) {
    csvContent = csvContent.concat(toCSV(results.only_internal, "Only_Internal"));
  }
  if (results.only_provider) {
    csvContent = csvContent.concat(toCSV(results.only_provider, "Only_Provider"));
  }
  
  const csvString = csvContent
    .map(row => row.map(cell => `"${cell || ''}"`).join(","))
    .join("\n");
  
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'reconciliation_results.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};  

  return (
    <div className="results-container">
      <Category title="Matched" data={results.matched} />
      <br/>
      <Category title="Mismatched" data={results.mismatches} />
      <br/>
      <Category title="Only in Provider" data={results.only_provider} />
      <br/>
      <Category title="Only in Transaction" data={results.only_internal} />
      <br/>

      <button onClick={downloadCsv} className="download-button"> Download Here 💫 </button>
    </div>

    
  );
}


