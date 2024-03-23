import Queue from "./queue";
import { TicketList } from "./ticket";
import { ReservationList } from "./reservation";
import Database from "./database";

class ReservationSystem {
    constructor() {
        this.flightCode = null;
        this.airline = "";
        this.model="";
        this.departure = "";
        this.departureAirport="";
        this.departureIATA=""
        this.destination = "";
        this.destinationAirport="";
        this.destinationIATA=""
        this.leavingAt = "";
        this.arrivingAt = "";
        this.leavingTime = "";
        this.arrivingTime = "";
        this.capacity = 0;
        this.economySeats = new Queue();
        this.businessSeats = new Queue();
        this.firstClassSeats = new Queue();
        this.economyPrice = 0;
        this.businessPrice = 0;
        this.firstClassPrice = 0;
        this.ticketsList = new TicketList();
        this.reservationsList = new ReservationList();
    }

    // ***********METHODS**************
    init(airline, departure, destination, leavingAt, leavingTime){
        this.flush();
        let activeFlight = Database._flights.find(airline,departure, destination, leavingAt, leavingTime);
        this.flightCode = activeFlight.flightCode;
        this.airline = activeFlight.airline;
        this.model = activeFlight.model;
        this.departure = activeFlight.departure;
        this.departureAirport=activeFlight.departureAirport;
        this.departureIATA=activeFlight.departureIATA;
        this.destination = activeFlight.destination;
        this.destinationAirport=activeFlight.destinationAirport;
        this.destinationIATA=activeFlight.destinationIATA;
        this.leavingAt = activeFlight.leavingAt;
        this.arrivingAt = activeFlight.arrivingAt;
        this.leavingTime = activeFlight.leavingTime;
        this.arrivingTime = activeFlight.arrivingTime;
        this.capacity = activeFlight.capacity;

        this.economyPrice = activeFlight.economyPrice;
        this.businessPrice = activeFlight.businessPrice;
        this.firstClassPrice = activeFlight.firstClassPrice;

        this.economySeats.populate(activeFlight.economySeats);
        this.businessSeats.populate(activeFlight.businessSeats);
        this.firstClassSeats.populate(activeFlight.firstClassSeats);
        this.ticketsList.populate(Database._tickets.get(this.flightCode))
        this.reservationsList.populate(Database._reservations.get(this.flightCode));
    }
    
    flush(){
        if(this.flightCode === "") return;
        // save active flight data to global flights list
        let flight = {
            flightCode: this.flightCode,
            airline: this.airline,
            model: this.model,
            departure: this.departure,
            departureAirport:this.departureAirport,
            departureIATA:this.departureIATA,
            destination: this.destination,
            destinationairport: this.destinationAirport,
            destinationIATA: this.destinationIATA,
            leavingAt: this.leavingAt,
            arrivingAt: this.arrivingAt,
            leavingTime: this.leavingTime,
            arrivingTime: this.arrivingTime,
            capacity: this.capacity,
            economySeats: this.economySeats.items,
            businessSeats: this.businessSeats.items,
            firstClassSeats: this.firstClassSeats.items,
            economyPrice: this.economyPrice,
            businessPrice: this.businessPrice,
            firstClassPrice: this.firstClassPrice,
        }
        Database._flights.push(flight);

        // save active reservations in global reservations list
        let current = this.reservationsList.head;
        while(current) {
            Database._reservations.push(current);
            current = current.next;
        }
        this.reservationsList.head = null;

        // save active tickets in global tickets list
        current = this.ticketsList.head;
        while(current) {
            Database._tickets.push(current);
            current = current.next;
        }
        this.ticketsList.head = null;
    };

    addReservation() {

    }

    addTicket() {

    }

    cancelReservation() {

    }

    printReservation() {

    }

    checkReservation() {

    }

    displayPassengers() {
        
    }

}

export default ReservationSystem;