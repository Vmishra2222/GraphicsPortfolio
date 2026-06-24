import { useEffect, useState } from 'react';
import './DateStamp.css';

const DateStamp = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const formatDate = () => {
      const d = new Date();
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = months[d.getMonth()];
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${month} ${day} ${year}`;
    };

    setCurrentDate(formatDate());
  }, []);

  return (
    <div className="library-card-container">
      <div className="library-card">
        {/* Card Header */}
        <div className="library-card-header">
          <div className="library-header-text">DATE DUE</div>
        </div>

        {/* Ledger grid lines with date entries */}
        <div className="library-card-body">
          <div className="ledger-row">
            <div className="ledger-date stamp-faded stamp-1">SEP 26 2005</div>
            <div className="ledger-divider"></div>
            <div className="ledger-date"></div>
          </div>
          <div className="ledger-row">
            <div className="ledger-date stamp-faded stamp-2">JUN 06 2018</div>
            <div className="ledger-divider"></div>
            <div className="ledger-date"></div>
          </div>
          <div className="ledger-row">
            <div className="ledger-date stamp-fresh stamp-current">{currentDate}</div>
            <div className="ledger-divider"></div>
            <div className="ledger-date"></div>
          </div>
          <div className="ledger-row">
            <div className="ledger-date"></div>
            <div className="ledger-divider"></div>
            <div className="ledger-date"></div>
          </div>
          <div className="ledger-row">
            <div className="ledger-date"></div>
            <div className="ledger-divider"></div>
            <div className="ledger-date"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateStamp;
