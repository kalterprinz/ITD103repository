import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

function Calendar() {
    const [data, setData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [weeksInMonth, setWeeksInMonth] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));

        const currentDate = new Date();
        setCurrentMonth(currentDate.getMonth());
        setCurrentYear(currentDate.getFullYear());

        // Generate weeks of the current month
        generateWeeks(currentDate.getMonth(), currentDate.getFullYear());

        // Update current month and weeks every minute
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            setCurrentMonth(currentDate.getMonth());
            setCurrentYear(currentDate.getFullYear());
            generateWeeks(currentDate.getMonth(), currentDate.getFullYear());
        }, 60000); // 60,000 milliseconds = 1 minute

        // Cleanup function to clear interval
        return () => clearInterval(intervalId);
    }, []);

    const generateWeeks = (month, year) => {
        const weeks = [];
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
        let week = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            week.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= totalDaysInMonth; day++) {
            week.push(day);
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }

        // Add empty cells for remaining days
        if (week.length > 0) {
            while (week.length < 7) {
                week.push(null);
            }
            weeks.push(week);
        }

        setWeeksInMonth(weeks);
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        generateWeeks(newMonth, newYear);
    };

    const handlePreviousMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        generateWeeks(newMonth, newYear);
    };
    const filteredData = data.filter(user => {

        const name = user.name ? user.name.toLowerCase() : '';
        const search = searchQuery ? searchQuery.toLowerCase() : '';

        return (
            name.includes(search) 
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
                
                {window.location.pathname.split('/').pop() === "00" ? (
                <>
                    <Link to={`/`} className="ten">CCS Events</Link>
                    <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="con">Calendar</Link>
                    <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
                    <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
                </>
                ) : (
                <>
                    <Link to={`/userhome/${window.location.pathname.split('/').pop()}`} className="ten">CCS Events</Link>
                    <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="con">Calendar</Link>
                    <Link to={`/user/${window.location.pathname.split('/').pop()}`} className="ten">Your Events</Link>
                    <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
                    <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
                </>
                )}
                {window.location.pathname.split('/').pop() === "00" ? (
                <>
                    <div className="tog">
                    <Link to={`/signup`} className="sigbut">Sign up</Link>
                    <Link to={`/login`} className="logbut">Log in</Link>
                    </div>
                </>
                ) : (
                <>
                    <div className="tog">
                    <Link to={`/`} className="logbut">Log out</Link>
                    </div>
                </>
                )}
        </div>
                <div className="calendar">
                    <div className="tit fonak fonsileb">{getMonthName(currentMonth)} {currentYear}</div>
                    <div className="monbut">
                        <button onClick={handlePreviousMonth} >Previous Month</button>
                        <button onClick={handleNextMonth}>Next Month</button>
                    </div>
                    <table className="cal">
                        <thead className="fonak fonsiltit">
                            <tr>
                                <th>Sunday</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeksInMonth.map((week, index) => (
                                <tr key={index}>
                                    {week.map((day, idx) => (
                                        <td key={idx} className="day">
                                            {day !== null ? (
                                                <React.Fragment>
                                                    <div>{day}</div>
                                                    {data.map((venue, idx) => {
                                                        const eventDate = new Date(venue.start_time).getDate();
                                                        const eventMonth = new Date(venue.start_time).getMonth();
                                                        const eventYear = new Date(venue.start_time).getFullYear();
                                                        const eventeDate = new Date(venue.end_time).getDate();
                                                        const eventeMonth = new Date(venue.end_time).getMonth();
                                                        const eventeYear = new Date(venue.end_time).getFullYear();
                                                        if (eventDate === day && eventMonth === currentMonth && eventYear === currentYear) {
                                                            return (
                                                                <div key={idx} className="event fonak" >
                                                                    <div><b>Event:</b> {venue.event}</div>
                                                                    <div><b>Org:</b> {venue.name}</div>
                                                                    <div><b>Location:</b> {venue.where}</div>
                                                                </div>
                                                            );
                                                        }
                                                        if (eventeDate === day && eventeMonth === currentMonth && eventeYear === currentYear) {
                                                            return (
                                                                <div key={idx} className="event fonak" >
                                                                    <div><b>Event:</b> {venue.event}</div>
                                                                    <div><b>Org:</b> {venue.name}</div>
                                                                    <div><b>Location:</b> {venue.where}</div>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                        </td>
                                    ))}
                                </tr>
                            ))}
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

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

export default Calendar;