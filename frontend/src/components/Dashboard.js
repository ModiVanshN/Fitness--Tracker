// Dashboard.js
import React from 'react';
import LogoutButton from "./LogoutButton";

const Dashboard = () => {
    const weeklySchedule = [
        { day: 'Monday', exercise: 'Running', time: '6:00 AM' },
        { day: 'Tuesday', exercise: 'Swimming', time: '7:00 AM' },
        { day: 'Wednesday', exercise: 'Cycling', time: '8:00 AM' },
        { day: 'Thursday', exercise: 'Rest', time: '-' },
        { day: 'Friday', exercise: 'Running', time: '6:00 AM' },
        { day: 'Saturday', exercise: 'Swimming', time: '7:00 AM' },
        { day: 'Sunday', exercise: 'Cycling', time: '8:00 AM' },
    ];

    const burnedCalories = 2500;

    const exerciseHistory = [
        { date: '2022-01-01', exercise: 'Running', duration: '30 minutes' },
        { date: '2022-01-02', exercise: 'Swimming', duration: '45 minutes' },
        { date: '2022-01-03', exercise: 'Cycling', duration: '60 minutes' },
    ];

    const personalBests = [
        { exercise: 'Running', bestTime: '25 minutes' },
        { exercise: 'Swimming', bestTime: '35 minutes' },
        { exercise: 'Cycling', bestTime: '45 minutes' },
    ];

    return (
        <div className="dashboard">
            <style jsx>
                {`
                    .dashboard {
                        padding: 20px;
                    }

                    .card {
                        margin-bottom: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }

                    .card-header {
                        background-color:rgb(42, 195, 203);
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                    }

                    .card-body {
                        padding: 20px;
                    }

                    .table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    .table th, .table td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }

                    .table th {
                        background-color:rgb(24, 125, 156);
                    }
                `}
            </style>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5>Weekly Schedule</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Exercise</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weeklySchedule.map((schedule, index) => (
                                        <tr key={index}>
                                            <td>{schedule.day}</td>
                                            <td>{schedule.exercise}</td>
                                            <td>{schedule.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5>Burned Calories</h5>
                        </div>
                        <div className="card-body">
                            <h2>{burnedCalories}</h2>
                            <p>Calories burned this week</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5>Exercise History</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Exercise</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciseHistory.map((history, index) => (
                                        <tr key={index}>
                                            <td>{history.date}</td>
                                            <td>{history.exercise}</td>
                                            <td>{history.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5>Personal Bests</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Best Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personalBests.map((best, index) => (
                                        <tr key={index}>
                                            <td>{best.exercise}</td>
                                            <td>{best.bestTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <LogoutButton />
        </div>
    );
};

export default Dashboard;