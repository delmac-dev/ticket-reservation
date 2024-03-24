import { app, handleAddPassenger, handleDeletePassenger, handleInputChange, reserveForm } from "../main";
import $ from "jquery";
import showError from "./error";
import ticketForm from "./ticket";

const expiryDateConfig = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "F j, Y",
    minDate: "today",
  }

export default function reservePage(element) {
    if(!app.flightCode){
        showError(element, "No Flight Booked");
        return;
    };
    if(app.capacity === 0){
        showError(element, "This Flight Is Completely Booked");
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
                <h3>Passengers</h3>
                <button type="button" class="add-passenger" ${(app.capacity - reserveForm.passengers.length) < 1? 'disabled': ''}>Add Passenger</button>
            </div>
            <div class="app_content">
                ${reserveForm.passengers.map((passenger, index)=>(
                    ticketForm({index, ...passenger})
                ))}
            </div>
        </div>

        <!-- ======================THIRD SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
            <h3>Reserver Contact</h3>
            </div>
            <div class="app_content">
                <div class="app_content__contact">
                    <div class="form-input">
                        <label for="lastname">Last name</label>
                        <input type="text" class="reserve-input" data-section="contact" data-key="lastname" data-index="0" name="lastname" placeholder="Last name" value="${reserveForm.contact[0].lastname}">
                    </div>
                    <div class="form-input">
                        <label for="firstname">First name and other names</label>
                        <input type="text" class="reserve-input" data-section="contact" data-key="othernames" data-index="0" name="firstname" placeholder="First name and other names" value="${reserveForm.contact[0].othernames}">
                    </div>
                    <div class="form-input">
                        <label for="email">Email</label>
                        <input type="email" class="reserve-input" data-section="contact" data-key="email" data-index="0" name="email" placeholder="Email" value="${reserveForm.contact[0].email}">
                    </div>
                    <div class="form-input">
                        <label for="number">Number</label>
                        <input type="text" class="reserve-input" data-section="contact" data-key="number" data-index="0" name="number" placeholder="Number" value="${reserveForm.contact[0].number}">
                    </div>
                </div>
            </div>
        </div>

        <!-- ======================FOURTH SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
            <h3>Payment Details</h3>
            </div>
            <div class="app_content">
                <div class="app_content__payment">
                <div class="form-input">
                    <label for="cardtype">Number</label>
                    <select name="cardtype" class="reserve-input" data-section="payment" data-key="cardType" data-index="0">
                        <option value="" disabled ${reserveForm.payment[0].cardType === "" ? 'selected' : ''} hidden>Card Type</option>
                        <option value="Visa" ${reserveForm.payment[0].cardType === "Visa" ? 'selected' : ''}>Visa</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="number">Card Number</label>
                    <input type="text" class="reserve-input" data-section="payment" data-key="cardNumber" data-index="0" name="number" placeholder="Card Number" value="${reserveForm.payment[0].cardNumber}">
                </div>
                <div class="form-input">
                    <label for="name">Name on card</label>
                    <input type="text" class="reserve-input" data-section="payment" data-key="cardName" data-index="0" name="name" placeholder="Name on card" value="${reserveForm.payment[0].cardName}">
                </div>
                <div class="form-input">
                    <label for="expirydate">Expiry Date</label>
                    <input type="text" class="reserve-input" id="expiry-date" data-section="payment" data-key="expiryDate" data-index="0" name="expirydate" placeholder="Expiry Date" value="${reserveForm.payment[0].expiryDate}">
                </div>
                <div class="form-input">
                    <label for="cvv">CVV</label>
                    <input type="text" class="reserve-input" data-section="payment" data-key="cvv" data-index="0" name="cvv" maxlength="3" placeholder="CVV" value="${reserveForm.payment[0].cvv}">
                </div>
                </div>
            </div>
        </div>

        <!-- ======================MAKE RESERVATION BUTTON======================= -->
        <div class="app_button">
            <button type="button" id="make-reservation">Make Reservation</button>
        </div>
    `);

    // event handler to add new passenger
    handleAddPassenger($("button.add-passenger"));
    
    // event handler to remove passenger
    handleDeletePassenger($("button.remove-passenger"));

    flatpickr("#expiry-date", expiryDateConfig);

    return $(".reserve-input").on("change", function (){handleInputChange(this)});
}