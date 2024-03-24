class Ticket {
    constructor({ticketCode, reservationCode, flightCode, seat, seatClass, lastname,othernames, age, price, gender}){
        this.ticketCode = ticketCode;
        this.reservationCode = reservationCode;
        this.flightCode = flightCode;
        this.seat = seat;
        this.seatClass = seatClass;
        this.lastname = lastname;
        this.othernames = othernames;
        this.age = age;
        this.price = price;
        this.gender=gender;
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
        let newTicket = new Ticket(ticket);

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
        let prev = null; // Keep track of the previous node
    
        while (current) {
            if (current.reservationCode === reservationCode) {
                let data = {
                    class: current.class,
                    seat: current.seat
                };
                seats.push(data);
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next ticket
                    current = this.head; // Update current to the new head
                } else {
                    // Update the next reference of the previous node to skip the current node
                    prev.next = current.next;
                    current = current.next; // Move to the next node
                }
            } else {
                prev = current; // Update the previous node reference
                current = current.next; // Move to the next node
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

    iterate(callback, isRender= true) {
        let current = this.head;

        let htmlString = '';

        while (current !== null) {
            let result = callback(current);

            if(isRender) htmlString += result;
            current = current.next;
        }

        return htmlString;
    }
}

export {Ticket, TicketList};