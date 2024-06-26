import { app } from "../main";
import showError from "./error";

export function showPage(element) {
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
            <h3>All Passengers</h3>
            </div>
            <div class="app_content">
                <table class="app_content__reserve-table">
                    <thead>
                        <tr>
                            <th>TicketCode</th>
                            <th>ReservationCode</th>
                            <th>FlightCode</th>
                            <th>Fullname</th>
                            <th>Gender</th>
                            <th>Class</th>
                            <th>Seat</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.ticketsList.iterate(({ticketCode, reservationCode, flightCode, lastname, othernames, gender, seatClass, seat})=> (
                            `
                            <tr>
                                <td>${ticketCode}</td>
                                <td>${reservationCode}</td>
                                <td>${flightCode}</td>
                                <td>${lastname}, ${othernames}</td>
                                <td>${gender}</td>
                                <td>${seatClass}</td>
                                <td>${seat}</td>
                            </tr>
                            `
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    `)
}