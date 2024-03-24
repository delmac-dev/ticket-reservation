import AirlineList from "./airline";
import { departureLocations, destinationLocations } from "../constants";

class Flight {
    constructor({flightCode, airline,model,departure,departureAirport,departureIATA,destination,destinationAirport,destinationIATA,
                leavingAt,arrivingAt,leavingTime,arrivingTime,capacity,economySeats,businessSeats,firstClassSeats,economyPrice,
                businessPrice,firstClassPrice}) {

        this.flightCode = flightCode || "";
        this.airline= airline || "";
        this.model= model || "";
        this.departure= departure || "";
        this.departureAirport= departureAirport || "";
        this.departureIATA= departureIATA || "";
        this.destination= destination || "";
        this.destinationAirport= destinationAirport || "";
        this.destinationIATA= destinationIATA || "";
        this.leavingAt= leavingAt || ""; 
        this.arrivingAt= arrivingAt || "";
        this.leavingTime= leavingTime || "";
        this.arrivingTime= arrivingTime || "";
        this.capacity = capacity || 0;
        this.economySeats = economySeats || [];
        this.businessSeats = businessSeats || [];
        this.firstClassSeats = firstClassSeats || [];
        this.economyPrice = economyPrice || 0;
        this.businessPrice = businessPrice || 0;
        this.firstClassPrice = firstClassPrice || 0;
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
        let newFlight = new Flight(flight);

        if (!this.head) {
            this.head = newFlight;
        } else {
            newFlight.next = this.head;
            this.head = newFlight;
        }
    };

    find(airline,departure, destination, leavingAt, leavingTime) {
        let current = this.head; // Start traversing from the head
        let prev = null; // Keep track of the previous node

        while (current) {
            // Check if the current flight matches the criteria
            if (
                current.airline === airline &&
                current.departure === departure &&
                current.destination === destination &&
                current.leavingAt === leavingAt &&
                current.leavingTime === leavingTime
            ) {
                if (prev === null) {
                    // If the found flight is the head, update the head to the next flight
                    this.head = current.next;
                } else {
                    // If the found flight is not the head, skip it by updating the next reference of the previous node
                    prev.next = current.next;
                }
                current.next = null; // Detach the found flight from the list
                return current; // Return the found flight
            }
            prev = current; // Update the previous node reference
            current = current.next; // Move to the next flight
        }

        // get details of departureLocation;
        let departureObj = this.#findObject(departureLocations, "location", departure);
        
        // get details of destinationLocation;
        let destinationObj = this.#findObject(destinationLocations, "location", destination);

        let arrivingAt = this.#generateArrivalDate(leavingAt);

        let planeInfo = AirlineList.get(airline);
        return new Flight({
            airline: airline,
            model: planeInfo.model,
            capacity: planeInfo.capacity,
            economySeats: this.#generateSeats(planeInfo.economySeats),
            businessSeats: this.#generateSeats(planeInfo.businessSeats),
            firstClassSeats: this.#generateSeats(planeInfo.firstClassSeats),
            destination,
            destinationAirport: destinationObj.airport,
            destinationIATA: destinationObj.IATA,
            departure,
            departureAirport: departureObj.airport,
            departureIATA: departureObj.IATA,
            leavingAt,
            arrivingAt,
            leavingTime,
            arrivingTime: this.#generateArrivalTime(leavingTime, leavingAt === arrivingAt),
            flightCode: this.#generateFlightCode(),
            economyPrice: this.#generatePrice("econ"),
            businessPrice: this.#generatePrice("bus"),
            firstClassPrice: this.#generatePrice("first"),
        });
    };

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

    #findObject(objects, key, value) {
        for (let obj of objects) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === value) {
                    return obj;
                }
            }
        }
        return null;
    }
}

export {Flight, FlightList};