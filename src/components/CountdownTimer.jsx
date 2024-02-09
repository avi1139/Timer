import React, { useState, useRef } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
    const [time, setTime] = useState(120); // Initial time in seconds (2 hours)
    const [timerRunning, setTimerRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!timerRunning) {
            setTimerRunning(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(intervalRef.current);
                        setTimerRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setTimerRunning(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            <label htmlFor="time">Set Countdown Time (in minutes):</label>
            <input
                type="number"
                id="time"
                min="1"
                value={Math.floor(time / 60)}
                onChange={(e) => setTime(parseInt(e.target.value, 10) * 60)}
            />
            <button onClick={startTimer} disabled={timerRunning}>
                Start
            </button>
            <button onClick={stopTimer} disabled={!timerRunning}>
                Stop
            </button>
            <div id="countdown">{formatTime(time)}</div>
        </div>
    );
}

export default CountdownTimer;
