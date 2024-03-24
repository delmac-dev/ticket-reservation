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

    get(flightCode) {
        const reservations = [];
        let current = this.head;
        let prev = null; // Keep track of the previous node
    
        while (current) {
            if (current.flightCode === flightCode) {
                reservations.push(current); // Add the found reservation to the reservations array
    
                // If the found reservation is the head, update the head to the next flight
                if (prev === null) {
                    this.head = current.next;
                } else {
                    // If the found ticket is not the head, skip it by updating the next reference of the previous node
                    prev.next = current.next;
                }
    
                current.next = null; // Detach the found reservation from the list
                current = prev ? prev.next : this.head; // Move current to the next node after removal
            } else {
                // Move to the next node
                prev = current;
                current = current.next;
            }
        }
    
        return reservations; // Return the array of found reservations
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

    getByName(lastname) {
        const reservations = [];
        let current = this.head;
        while (current) {
            if (current.lastname === lastname) {
                reservations.push(current);
            }
            current = current.next;
        }
        return reservations;
    }
    
    getByCode(reservationCode) {
        const reservations = [];
        let current = this.head;
        while (current) {
            if (current.reservationCode === reservationCode) {
                reservations.push(current);
            }
            current = current.next;
        }
        return reservations;
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