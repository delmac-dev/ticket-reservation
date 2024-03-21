class Ticket {
    constructor(){
        this.ticketCode = "";
        this.reservationCode = "";
        this.flightCode = "";
        this.seat = "";
        this.class = "";
        this.name = "";
        this.age = "";
        this.price = 0;
        this.next = null;
    }
}

class TicketList {
    constructor() {
        this.head = null;
    }

    populate(tickets) {
        for(let ticket of tickets) {
            this.push(ticket);
        }
    }

    push(ticket) {
        let newTicket = new Ticket();
        newTicket.ticketCode = ticket.ticketCode;
        newTicket.reservationCode = ticket.ticketCode;
        newTicket.flightCode = ticket.ticketCode;
        newTicket.name = ticket.ticketCode;
        newTicket.age = ticket.ticketCode;
        newTicket.class = ticket.ticketCode;
        newTicket.seat = ticket.ticketCode;
        newTicket.price = ticket.ticketCode;

        if (!this.head) {
            this.head = newTicket;
        } else {
            newTicket.next = this.head;
            this.head = newTicket;
        }
    }

    get(flightCode) {
        const tickets = [];
        let current = this.head;
        while (current) {
            if (current.flightCode === flightCode) {
                let foundTicket = current;
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next flight
                } else {
                    let prev = this.head;
                    while (prev.next !== current) {
                        prev = prev.next;
                    }
                    prev.next = current.next; // Skip the current flight
                }
                foundTicket.next = null; // Detach the found flight from the list
                tickets.push(foundTicket);
            }
            current = current.next;
        };
        return tickets;
    }

    remove(reservationCode) {
        let seats = [];
        let current = this.head;
        while (current) {
            if(current.reservationCode === reservationCode){
                let data = {
                    class: current.class,
                    seat: current.seat
                };
                seats.push(data);
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next ticket
                } else {
                    let prev = this.head;
                    while (prev.next !== current) {
                        prev = prev.next;
                    }
                    prev.next = current.next; // Skip the current ticket
                }
            }
        }

        return seats;
    }

    getByReservation(reservationCode) {
        const tickets = [];
        let current = this.head;
        while (current) {
            if (current.reservationCode === reservationCode) {
                tickets.push(current);
            }
            current = current.next;
        }
        return tickets;
    }
}