import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

function Home() {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const filteredData = data.filter(user => {
        const search = searchQuery ? searchQuery.toLowerCase() : '';

        const event = user.event ? user.event.toLowerCase() : '';
        const name = user.name ? user.name.toLowerCase() : '';
        const where = user.where ? user.where.toLowerCase() : '';
        const start_date = user.start_date ? user.start_date.toString() : '';
        const end_date = user.end_date ? user.end_date.toString() : '';

        return (
            event.includes(search) ||
            name.includes(search) ||
            where.includes(search) ||
            start_date.includes(search) ||
            end_date.includes(search)
        );
    });

    // Count occurrences of each name
const nameCounts = filteredData.reduce((acc, user) => {
  acc[user.name] = (acc[user.name] || 0) + 1;
  return acc;
}, {});

// Prepare data for pie chart
const chartData = {
  labels: Object.keys(nameCounts),
  datasets: [
      {
          data: Object.values(nameCounts),
          backgroundColor: Object.keys(nameCounts).map(name => {
            console.log("Values:", name);
              if (name === 'CCS EC') return '#2fc4ab';
              else if (name === 'JITS') return '#4969eb';
              else if (name === 'CA') return '#eb7171';
              else return '#eba571';
              
          }),
      },
  ],
};
    return (
        <div>
            <div className="bodybox">
                <div className="Choose">
                    <Link to={`/`}>
                        <div className="group">
                            <p className="nest">Nest</p>
                            <p className="the">The</p>
                            <p className="thenest">thenest</p>
                            <p className="tagline">finding venue for CCS events just got easier</p>
                        </div>
                    </Link>
                    <Link to={`/`} className="con">CCS Events</Link>
                    <Link to={`/calendar/00`} className="ten">Calendar</Link>
                    <Link to={`/about/00`} className="ten">About</Link>
                    <Link to={`/contacts/00`} className="ten">Contacts</Link>
                    <div className="tog">
                        <Link to={`/signup`} className="sigbut">Sign up</Link>
                        <Link to={`/login`} className="logbut">Log in</Link>
                    </div>
                </div>
                <div className="tablelist">
                    <div className="arr">
                        <div className="tit"><h1>CCS Events</h1></div>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search"
                            />
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Org</th>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData
                                    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                                    .map((venue, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{venue.event}</td>
                                                <td>{venue.name}</td>
                                                <td>{venue.where}</td>
                                                <td>{new Date(venue.start_time).toLocaleString()}</td>
                                                <td>{new Date(venue.end_time).toLocaleString()}</td>
                                            </tr>
                                        );
                                    })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="Links">
                    <h4>CCS Organizations</h4>
                    <a href="https://www.facebook.com/CCSCouncilOfficial" class="ten bit ccs-ec" target="_blank" rel="noopener noreferrer">CCS EC</a>
                    <a href="https://www.facebook.com/jitsmsuiit" class="ten bit jits" target="_blank" rel="noopener noreferrer">JITS</a>
                    <a href="https://www.facebook.com/ComSocOfficialPage" class="ten bit cs" target="_blank" rel="noopener noreferrer">CS</a>
                    <a href="https://www.facebook.com/ComAppsSociety.MSUIIT" class="ten bit ca" target="_blank" rel="noopener noreferrer">CA</a>
                    <div className="tro">
                    <Pie data={chartData} />
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
