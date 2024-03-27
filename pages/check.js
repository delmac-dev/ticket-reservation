import { app, foundReservation, handleCancelReservation, handleCheckReservation } from "../main";
import $ from 'jquery';

export default function checkPage(element) {
    element.html(`
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