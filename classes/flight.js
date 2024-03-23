import AirlineList from "./airline";

class Flight {
    constructor() {
        this.flightCode = ""
        this.airline= "";
        this.model= "";
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
        newFlight.airline = flight.airline;
        newFlight.model = flight.model;
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

    find(airline,departure, destination, leavingAt, leavingTime) {
        let current = this.head; // Start traversing from the head

        while (current) {
            // Check if the current flight matches the criteria
            if (
                current.airline === airline &&
                current.departure === departure &&
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

        let planeInfo = AirlineList.get(airline);
        let newFlight = new Flight();
        newFlight.airline = airline;
        newFlight.model = planeInfo.model;
        newFlight.capacity = planeInfo.capacity;
        newFlight.economySeats = this.#generateSeats(planeInfo.economySeats);
        newFlight.businessSeats = this.#generateSeats(planeInfo.businessSeats);
        newFlight.firstClassSeats = this.#generateSeats(planeInfo.firstClassSeats);
        newFlight.destination = destination;
        newFlight.departure = departure;
        newFlight.leavingAt = leavingAt;
        newFlight.arrivingAt = this.#generateArrivalDate(leavingAt);
        newFlight.leavingTime = leavingTime;
        newFlight.arrivingTime = this.#generateArrivalTime(leavingTime, leavingAt === newFlight.arrivingAt);
        newFlight.flightCode = this.#generateFlightCode();
        newFlight.economyPrice = this.#generatePrice("econ");
        newFlight.businessPrice = this.#generatePrice("bus");
        newFlight.firstClassPrice = this.#generatePrice("first");
        return newFlight; // Return a newly created flight node
    };

    #generateArrivalDate(leavingAt) {
        let minArrivalDate = new Date(leavingAt);
        let maxArrivalDate = new Date(leavingAt);
        maxArrivalDate.setDate(maxArrivalDate.getDate() + 3); // Adding 3 days
    
        // Generate a random timestamp between min and max arrival dates
        let randomTimestamp = minArrivalDate.getTime() + Math.random() * (maxArrivalDate.getTime() - minArrivalDate.getTime());
    
        // Create a new Date object from the random timestamp.
        let arrivalDate = new Date(randomTimestamp);
    
        // Format the arrival date as "Month Day, Year" (e.g., "March 28, 2024")
        let formattedArrivalDate = arrivalDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    
        return formattedArrivalDate;
    }

    #generateArrivalTime(leavingTime, isSameDay) {
        let arrivalTime;
        if (isSameDay) {
            let leavingHour = parseInt(leavingTime.split(':')[0]);
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
                price = Math.floor(Math.random() * 200) + 300; // Example: random price between (economyPrice + 100) and (economyPrice + 299)
                break;
            case 'first':
                // Generate random price for first class greater than economy and business prices
                price = Math.floor(Math.random() * 200) + 500; // Example: random price between (businessPrice + 200) and (businessPrice + 399)
                break;
            default:
                price = null; // Invalid seat type
        }
        return price;
    }

    #generateSeats({total, columns, rows}){
        let seats = [];
        let activeColumn = 0;
        let activeRow = 0;
        for (let _i = 0; _i < total; _i++) {
            seats.push(columns[activeColumn] + rows[activeRow])
            activeColumn = (activeColumn + 1) % columns.length;
            if(activeColumn === 0) {
                activeRow += 1;
            }
        };

        return seats;
    }
}

export {Flight, FlightList};