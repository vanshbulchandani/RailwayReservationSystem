import React, { useState } from 'react';
import { Train, BookingResponse } from './types';
import { reservationService } from './services/reservationService';
import { Train as TrainIcon, Ticket as TicketIcon, XCircle } from 'lucide-react';
import './App.css'; // Importing the CSS file

function App() {
  const [selectedTrain, setSelectedTrain] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');
  const [trains] = useState<Train[]>(reservationService.getTrains());

  const handleBookTicket = () => {
    if (!selectedTrain) {
      setMessage('Please select a train');
      return;
    }

    const response = reservationService.bookTicket(selectedTrain);
    setMessage(response.message);
    if (response.success && response.bookingId) {
      setBookingId(response.bookingId);
    }
  };

  const handleCancelTicket = () => {
    if (!bookingId) {
      setMessage('Please enter a booking ID');
      return;
    }

    const response = reservationService.cancelTicket(bookingId);
    setMessage(response.message);
    if (response.success) {
      setBookingId('');
    }
  };

  const handleCheckStatus = () => {
    if (!bookingId) {
      setMessage('Please enter a booking ID');
      return;
    }

    const ticket = reservationService.getTicketStatus(bookingId);
    if (ticket) {
      setMessage(`Booking found - Train: ${ticket.trainId}, Seat: ${ticket.seatNumber}`);
    } else {
      setMessage('Booking not found');
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="card">
          <h1 className="title">
            <TrainIcon className="icon" /> Railway Reservation System
          </h1>

          <div className="section">
            <h2 className="section-title">Available Trains</h2>
            <div className="train-list">
              {trains.map((train) => (
                <div
                  key={train.id}
                  className={`train-card ${selectedTrain === train.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTrain(train.id)}
                >
                  <div className="train-name">{train.name}</div>
                  <div className="train-info">
                    Available Seats: {train.availableSeats}/{train.totalSeats}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleBookTicket} className="book-btn">
              <TicketIcon className="button-icon" size={20} />
              Book Ticket
            </button>
            
            <button onClick={handleCancelTicket} className="cancel-btn">
              <XCircle className="button-icon" size={20} />
              Cancel Ticket
            </button>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter Booking ID"
              className="input-field"
            />
            <button onClick={handleCheckStatus} className="status-btn">
              Check Status
            </button>
          </div>

          {message && (
            <div className="message-box">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
