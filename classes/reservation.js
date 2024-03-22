class Reservation {
    constructor() {
        this.reservationCode = "";
        this.flightCode = "";
        this.reserver = "";
        this.totalReserved = 0;
        this.next = null;
    }
}

class ReservationList {
    constructor() {
        this.head = null;
    }

    populate(reservations){
        for(let reservation of reservations) {
            this.push(reservation);
        }
    }

    get(flightCode){
        const reservations = [];
        let current = this.head;
        while (current) {
            if (current.flightCode === flightCode) {
                let foundReservation = current;
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next flight
                } else {
                    let prev = this.head;
                    while (prev.next !== current) {
                        prev = prev.next;
                    }
                    prev.next = current.next; // Skip the current flight
                }
                foundReservation.next = null; // Detach the found flight from the list
                reservations.push(foundReservation);
            }
            current = current.next;
        }
        
        return reservations;
    }

    remove(reservationCode){
        let current = this.head;
        while (current) {
            if(current.reservationCode === reservationCode){
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
    }

    push(reservation){
        let newReservation = new Reservation();
        newReservation.reservationCode = reservation.reservationCode;
        newReservation.flightCode = reservation.flightCode;
        newReservation.reserver = reservation.reserver;
        newReservation.totalReserved = reservation.totalReserved;

        if (!this.head) {
            this.head = newReservation;
        } else {
            newReservation.next = this.head;
            this.head = newReservation;
        }
    }

    getByName(reserver) {
        const reservations = [];
        let current = this.head;
        while (current) {
            if (current.reserver === reserver) {
                reservations.push(current);
            }
            current = current.next;
        }
        return reservations;
    }
}

export {Reservation, ReservationList};