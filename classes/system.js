import Queue from "./queue";
import { TicketList } from "./ticket";
import { ReservationList } from "./reservation";
import Database from "./database";
import { data } from "jquery";
import { saveData } from "../main";

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
        if(!this.flightCode) return;
        // save active flight data to global flights list
        Database._flights.push(this.#instantiateFlight());

        // save active reservations in global reservations list
        this.reservationsList.iterate((current)=> {
            Database._reservations.push(current);
        }, false);
        this.reservationsList.head = null;

        // save active tickets in global tickets list
        this.ticketsList.iterate((current)=>{
            Database._tickets.push(current);
        }, false);
        this.ticketsList.head = null;
    };

    addReservation(reservation, tickets) {
        let newReservationCode = this.#generateReservationCode();
        this.reservationsList.push({flightCode: this.flightCode, reservationCode: newReservationCode, ...reservation});

        tickets.forEach(ticket => {
            let ticketCode = this.#generateTicketCode();

            // TODO: make sure to check if generated seat is null
            let ticketSeat = this.#generateSeat(ticket.seatClass);

            // TODO: make sure to check if generated price is null
            let ticketPrice = this.#generatePrice(ticket.seatClass);

            this.ticketsList.push({ticketCode, reservationCode: newReservationCode, flightCode: this.flightCode, seat:ticketSeat, price: ticketPrice, ...ticket });
            this.capacity -= 1;
        });

        // TODO: handle some errors

        this.saveProgress();

        return "success";
    }

    cancelReservation(rCode) {
        this.reservationsList.remove(rCode); // remove specific reservation
        let relinquishedSeats = this.ticketsList.remove(rCode); // remove all tickets having the reservation code

        relinquishedSeats.forEach(data => {
            switch (data.class) {
                case "Economy":
                    this.economySeats.enqueue(data.seat);
                    break;
                case "Business":
                    this.businessSeats.enqueue(data.seat);
                    break;
                case "First Class":
                    this.firstClassSeats.enqueue(data.seat);
                    break;
                default:
                    break;
            }

            this.capacity += 1;
        });

        this,this.saveProgress();

        return "success";
    }

    printReservation(rCode) {

    }

    checkReservation(lastname) {
        return this.reservationsList.getByName(lastname);
    }

    saveProgress() {
        let dbReservation = [], 
            dbFlights = [],
            dbTickets = [],
            activeFlight = this.#instantiateFlight(),
            activeReservations = [],
            activeTickets = []

        // save dbRservations to list
        Database._reservations.iterate((current)=> dbReservation.push({...current}), false);

        // save dbFlights to list
        Database._flights.iterate((current)=> dbFlights.push({...current}), false);

        // save dbTickets to list
        Database._tickets.iterate((current)=> dbTickets.push({...current}), false);

        // save reservationList to list
        this.reservationsList.iterate((current)=> activeReservations.push({...current}), false);

        // save ticketList to list
        this.ticketsList.iterate((current)=> activeTickets.push({...current}), false);

        // save reservations
        saveData("reservations", [...dbReservation, ...activeReservations]);

        // save tickets
        saveData("tickets", [...dbTickets, ...activeTickets]);

        // save flights
        saveData("flights", [...dbFlights, activeFlight]);
    }

    #generateReservationCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 14; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        return code;
    }

    #generateTicketCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        return code;
    }

    #generateSeat(seatClass) {
        switch (seatClass) {
            case "Economy":
                return this.economySeats.dequeue();
            case "Business":
                return this.businessSeats.dequeue();
            case "First Class":
                return this.firstClassSeats.dequeue();
            default:
                return null;
        }
    }

    #generatePrice(seatClass) {
        switch (seatClass) {
            case "Economy":
                return this.economyPrice
            case "Business":
                return this.businessPrice
            case "First Class":
                return this.firstClassPrice
            default:
                return null;
        }
    }

    #instantiateFlight(){
        return {
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
    }
}

export default ReservationSystem;