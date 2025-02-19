import { Train, Ticket, BookingResponse } from '../types';

class ReservationService {
  private trains: Train[] = [
    { id: 'T1', name: 'Express 101', totalSeats: 100, availableSeats: 100 },
    { id: 'T2', name: 'Superfast 202', totalSeats: 100, availableSeats: 100 },
  ];

  private bookings: Ticket[] = [];

  getTrains(): Train[] {
    return this.trains;
  }

  checkSeatAvailability(trainId: string): number {
    const train = this.trains.find((t) => t.id === trainId);
    return train?.availableSeats ?? 0;
  }

  bookTicket(trainId: string): BookingResponse {
    const train = this.trains.find((t) => t.id === trainId);
    
    if (!train) {
      return { success: false, message: 'Train not found' };
    }

    if (train.availableSeats === 0) {
      return { success: false, message: 'No seats available' };
    }

    const bookingId = `BK${Date.now()}`;
    const seatNumber = train.totalSeats - train.availableSeats + 1;
    
    const ticket: Ticket = {
      bookingId,
      trainId,
      seatNumber,
      timestamp: new Date().toISOString(),
    };

    this.bookings.push(ticket);
    train.availableSeats--;

    return {
      success: true,
      bookingId,
      message: `Ticket booked successfully. Seat number: ${seatNumber}`,
    };
  }

  cancelTicket(bookingId: string): BookingResponse {
    const ticketIndex = this.bookings.findIndex((t) => t.bookingId === bookingId);
    
    if (ticketIndex === -1) {
      return { success: false, message: 'Booking not found' };
    }

    const ticket = this.bookings[ticketIndex];
    const train = this.trains.find((t) => t.id === ticket.trainId);

    if (train) {
      train.availableSeats++;
    }

    this.bookings.splice(ticketIndex, 1);
    return { success: true, message: 'Ticket cancelled successfully' };
  }

  getTicketStatus(bookingId: string): Ticket | null {
    return this.bookings.find((t) => t.bookingId === bookingId) ?? null;
  }
}

export const reservationService = new ReservationService();