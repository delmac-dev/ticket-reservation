class Database {
        static _flights = new FlightList();
        static _reservations = new ReservationList();
        static _tickets = new TicketList();

    static init(flights, reservations, tickets) {
        Database._flights.populate(flights);
        Database._reservations.populate(reservations);
        Database._tickets.populate(tickets);
    }
}