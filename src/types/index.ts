export interface Train {
    id: string;
    name: string;
    totalSeats: number;
    availableSeats: number;
  }
  
  export interface Ticket {
    bookingId: string;
    trainId: string;
    seatNumber: number;
    timestamp: string;
  }
  
  export interface BookingResponse {
    success: boolean;
    bookingId?: string;
    message: string;
  }