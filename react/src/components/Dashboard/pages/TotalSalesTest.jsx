import { useState } from 'react';
import axiosClient from '../../../api/axios';

const TotalSalesTest = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalSales, setTotalSales] = useState(null);

    const fetchTotalSales = () => {
        axiosClient.post('/api/admin/total-sales', {
            start_date: startDate,
            end_date: endDate,
        })
        .then(response => {
            setTotalSales(response.data.total_sales);
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); fetchTotalSales(); }}>
                <label htmlFor="start-date">Start Date:</label>
                <input 
                    type="date" 
                    id="start-date" 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)}
                />

                <label htmlFor="end-date">End Date:</label>
                <input 
                    type="date" 
                    id="end-date" 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)}
                />

                <button type="submit">Fetch Total Sales</button>
            </form>

            {totalSales && (
                <div>
                    <h2>Total Sales</h2>
                    <ul>
                        {totalSales.map(sale => (
                            <li key={sale.date}>
                                {sale.date}: ${sale.total_sales}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TotalSalesTest;
