import { app, foundReservations, handleCancelReservation, handleCheckReservation } from "../main";
import showError from "./error";
import $ from 'jquery';

export default function checkPage(element) {

    if(!app.flightCode){
        showError(element, "No Flight Selected Yet");
        return;
    };

    element.html(`
        <!-- ======================FIRST SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
            <h3>Flight Details</h3>
            </div>
            <div class="app_content">
                <div class="app_content__flight">
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-plane-departure"></i> Departure</h5>
                        <p>${app.departure}</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-plane-arrival"></i> Destination</h5>
                        <p>${app.destination}</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-calendar"></i> Date</h5>
                        <p>${app.leavingAt}</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-plane"></i> Airline</h5>
                        <p>${app.airline}</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-couch"></i> Available Seats</h5>
                        <p>${app.capacity}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ======================SECOND SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
            <h3>Check Reservation</h3>
            </div>
            <div class="app_content">
                <div class="app_content__check">
                    <div class="form-input">
                        <label for="search-reservation">Search for a reservation in this flight by last name</label>
                        <form>
                            <input type="text" name="search-reservation" id="search-reservation" placeholder="Enter last name">
                            <button type="submit">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ======================THIRD SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
            <h3>Found Reservations</h3>
            </div>
            <div class="app_content">
                <table class="app_content__reserve-table">
                    <thead>
                        <tr>
                        <th>ReservationCode</th>
                        <th>FlightCode</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Tickets</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${foundReservations.map(({reservationCode, flightCode, lastname, othernames, email, totalReserved}, index) => (
                            `<tr>
                                <td>${reservationCode}</td>
                                <td>${flightCode}</td>
                                <td>${lastname}, ${othernames}</td>
                                <td>${email}</td>
                                <td>${totalReserved}</td>
                                <td>
                                    <button type="button" data-code="${reservationCode}" data-index="${index}" class="print">Print</button>
                                    <button type="button" data-code="${reservationCode}" data-index="${index}" class="cancel">Cancel</button>
                                </td>
                            </tr>
                            `
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    `);
    
    // added eventlistener to search for reservation on click
    handleCheckReservation($(".app_content__check form"));

    // added eventlistener to cancel reservation on click 
    handleCancelReservation($("button.cancel"));
}