import React, { useState, useEffect } from 'react';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaChevronCircleRight, FaCalendarAlt } from "react-icons/fa";
import './Calendar.css';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [calendarVisible, setCalendarVisible] = useState(false);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const generateCalendar = () => {
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        const calendar = [];

        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];

            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
                    week.push(null);
                } else {
                    week.push(dayCounter);
                    dayCounter++;
                }
            }

            calendar.push(week);
        }

        return calendar;
    };

    useEffect(() => {
        // Burada takvim oluşturulduğunda yapılacak işlemleri ekleyebilirsiniz.
    }, [currentMonth]);

    const calendar = generateCalendar();

    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-main-box">
                <div className="calendar-title-box" onClick={toggleCalendar}>
                 <FaCalendarAlt className='active-icon' />
                 <span>Calendar</span>
                </div>

                <div className="calendar-box">
                    {calendarVisible && (
                        <>
                        <div className="calendar-inside">
                        <div className="calendar-header">
                                <FaCircleChevronLeft className='active-icon' onClick={handlePrevMonth} />
                                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                                <FaChevronCircleRight className='active-icon' onClick={handleNextMonth} />
                            </div>
                            <div>
                                <table className="calendar-table">
                                    <thead>
                                        <tr>
                                            <th>Paz</th>
                                            <th>Pzt</th>
                                            <th>Sal</th>
                                            <th>Çar</th>
                                            <th>Per</th>
                                            <th>Cum</th>
                                            <th>Cmt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calendar.map((week, index) => (
                                            <tr key={index}>
                                                {week.map((day, dayIndex) => (
                                                    <td key={dayIndex}>{day !== null ? day : ''}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </>
                    )}
                </div>
                </div>
            </div>
    );
};

export default Calendar;