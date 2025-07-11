import React from 'react';
import './resultstable.css';

function ResultsTable({ results }) {

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

  return (
    <div className="results-container">
      <Category title="Matched" data={results.matched} />
      <Category title="Mismatched" data={results.mismatches} />
      <Category title="Only in Provider" data={results.only_provider} />
      <Category title="Only in Transaction" data={results.only_internal} />
    </div>
  );
}

export default ResultsTable;