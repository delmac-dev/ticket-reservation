class Reservation {
    constructor({reservationCode, flightCode, lastname, totalReserved, othernames, email, number, cardType, cardNumber, cardName, expiryDate, cvv}) {
        this.reservationCode = reservationCode;
        this.flightCode = flightCode;
        this.lastname = lastname;
        this.othernames = othernames
        this.totalReserved = totalReserved;
        this.email = email;
        this.number = number;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
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

    remove(reservationCode) {
        let current = this.head;
        let prev = null; // Keep track of the previous node
    
        while (current) {
            if (current.reservationCode === reservationCode) {
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next ticket
                } else {
                    // Update the next reference of the previous node to skip the current node
                    prev.next = current.next;
                }
                return; // Exit the method after removing the node
            }
    
            prev = current; // Update the previous node reference
            current = current.next; // Move to the next node
        }
    }

    push(reservation){
        let newReservation = new Reservation(reservation);

        if (!this.head) {
            this.head = newReservation;
        } else {
            newReservation.next = this.head;
            this.head = newReservation;
        }
    }

    check(rCode, lastname) {
        let current = this.head;
        while (current) {
            if (current.lastname === lastname && current.reservationCode === rCode) {
                return current;
            }
            current = current.next;
        }
    }
    
    get(reservationCode) {
        let current = this.head;
        while (current) {
            if (current.reservationCode === reservationCode) {
                return current;
            }
            current = current.next;
        }
    }

    iterate(callback, isRender = true) {
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

export {Reservation, ReservationList};