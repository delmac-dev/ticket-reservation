class Flight {
    constructor() {
        this.flightCode = ""
        this.planeName = "";
        this.departure= "";
        this.destination= "";
        this.leavingAt= "";
        this.arrivingAt= "";
        this.leavingTime= "";
        this.arrivingTime= "";
        this.capacity = "";
        this.economySeats = [];
        this.businessSeats = [];
        this.firstClassSeats = [];
        this.economyPrice = 0;
        this.businessPrice = 0;
        this.firstClassPrice = 0;
        this.next = null;
    }
};

class FlightList {
    constructor() {
        this.head = null;
    }

    populate(flights) {
        for (let flight of flights) {
            this.push(flight); // Adding each flight to the linked list
        }
    }

    push(flight){
        let newFlight = new Flight();
        newFlight.flightCode = flight.flightCode;
        newFlight.planeName = flight.planeName;
        newFlight.departure = flight.departure;
        newFlight.destination = flight.destination;
        newFlight.leavingAt = flight.leavingAt;
        newFlight.arrivingAt = flight.arrivingAt;
        newFlight.leavingTime = flight.leavingTime;
        newFlight.arrivingTime = flight.arrivingTime;
        newFlight.capacity = flight.capacity;
        newFlight.economySeats = flight.economySeats;
        newFlight.businessSeats = flight.businessSeats;
        newFlight.firstClassSeats = flight.firstClassSeats;
        newFlight.economyPrice = flight.economyPrice;
        newFlight.businessPrice = flight.businessPrice;
        newFlight.firstClassPrice = flight.firstClassPrice;

        if (!this.head) {
            this.head = newFlight;
        } else {
            newFlight.next = this.head;
            this.head = newFlight;
        }
    };

    find(planeName, destination, leavingAt, leavingTime) {
        let current = this.head; // Start traversing from the head

        while (current) {
            // Check if the current flight matches the criteria
            if (
                current.planeName === planeName &&
                current.destination === destination &&
                current.leavingAt === leavingAt &&
                current.leavingTime === leavingTime
            ) {
                let foundFlight = current;
                if (current === this.head) {
                    this.head = current.next; // Move the head to the next flight
                } else {
                    let prev = this.head;
                    while (prev.next !== current) {
                        prev = prev.next;
                    }
                    prev.next = current.next; // Skip the current flight
                }
                foundFlight.next = null; // Detach the found flight from the list
                return foundFlight; // Return the found flight
            }
            current = current.next; // Move to the next flight
        }

        let planeInfo = PlaneList.get(planeName);
        let newFlight = new Flight();
        newFlight.planeName = planeName;
        newFlight.capacity = planeInfo.capacity;
        newFlight.economySeats = planeInfo.economySeats;
        newFlight.businessSeats = planeInfo.businessSeats;
        newFlight.firstClassSeats = planeInfo.firstClassSeats;
        newFlight.destination = destination;
        newFlight.departure = "Ghana, Accra"
        newFlight.leavingAt = leavingAt;
        newFlight.arrivingAt = this.#generateArrivalDate();
        newFlight.leavingTime = leavingTime;
        newFlight.arrivingTime = this.#generateArrivalTime();
        newFlight.flightCode = this.#generateFlightCode();
        newFlight.economyPrice = this.#generatePrice("econ");
        newFlight.businessPrice = this.#generatePrice("bus");
        newFlight.firstClassPrice = this.#generatePrice("first");
        return newFlight; // Return a newly created flight node
    };

    #generateArrivalDate() {
        let minArrivalDate = new Date(this.leavingAt);
        let maxArrivalDate = new Date(this.leavingAt);
        maxArrivalDate.setDate(maxArrivalDate.getDate() + 6); // Adding 6 days
        let arrivalDate = new Date(
            minArrivalDate.getTime() + Math.random() * (maxArrivalDate.getTime() - minArrivalDate.getTime())
        );
        return arrivalDate;
    }

    #generateArrivalTime() {
        let arrivalTime;
        if (this.arrivingAt === this.departure) {
            let leavingHour = parseInt(this.leavingTime.split(':')[0]);
            let leavingMinute = parseInt(this.leavingTime.split(':')[1]);
            let maxArrivalHour = Math.min(23, leavingHour + 6); // Limiting to 23 hours for simplicity
            let arrivalHour = leavingHour + Math.floor(Math.random() * (maxArrivalHour - leavingHour + 1));
            let arrivalMinute = Math.floor(Math.random() * 60);
            arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
        } else {
            // If destination is different from departure, arrival time can be anytime of the day
            arrivalTime = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
        }
        return arrivalTime;
    }

    // Method to generate random flight code
    #generateFlightCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let flightCode = '';
        for (let i = 0; i < 8; i++) {
            flightCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return flightCode;
    }

    #generatePrice(seat) {
        let price;
        switch (seat) {
            case 'econ':
                // Generate random price for economy class
                price = Math.floor(Math.random() * 200) + 100; // Example: random price between 100 and 299
                break;
            case 'bus':
                // Generate random price for business class greater than economy price
                price = Math.floor(Math.random() * 200) + this.economyPrice + 100; // Example: random price between (economyPrice + 100) and (economyPrice + 299)
                break;
            case 'first':
                // Generate random price for first class greater than economy and business prices
                price = Math.floor(Math.random() * 200) + this.businessPrice + 200; // Example: random price between (businessPrice + 200) and (businessPrice + 399)
                break;
            default:
                price = null; // Invalid seat type
        }
        return price;
    }
}

export {Flight, FlightList};