import React from 'react'

function NavDownload() {
  const handleDownloadCSV = () => {
    // Mock data for now - in a real app, this would come from the backend
    const expenses = [
      { date: '2025-01-01', category: 'Food', description: 'Lunch', amount: 25.50 },
      { date: '2025-01-02', category: 'Transport', description: 'Uber', amount: 15.00 },
      { date: '2025-01-03', category: 'Entertainment', description: 'Movie', amount: 12.00 },
    ];

    // Convert to CSV
    const headers = ['Date', 'Category', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(exp => 
        `${exp.date},${exp.category},${exp.description},${exp.amount}`
      )
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    // Mock data for now - in a real app, this would come from the backend
    const expenses = [
      { date: '2025-01-01', category: 'Food', description: 'Lunch', amount: 25.50 },
      { date: '2025-01-02', category: 'Transport', description: 'Uber', amount: 15.00 },
      { date: '2025-01-03', category: 'Entertainment', description: 'Movie', amount: 12.00 },
    ];

    // Convert to JSON
    const jsonContent = JSON.stringify(expenses, null, 2);

    // Create download link
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-download"></i>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
        <li className="dropdown-header">
          Download Expenses
        </li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); handleDownloadCSV(); }}>
            <i className="bi bi-filetype-csv"></i>
            <span className="ms-2">Download as CSV</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); handleDownloadJSON(); }}>
            <i className="bi bi-filetype-json"></i>
            <span className="ms-2">Download as JSON</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavDownload;
