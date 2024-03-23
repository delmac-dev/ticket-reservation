import { app } from "../main";
import showError from "./error";

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
                        <p>Accra, Ghana</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-plane-arrival"></i> Destination</h5>
                        <p>Lagos, Nigeria</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-calendar"></i> Date</h5>
                        <p>Thurs, 13 January</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-plane"></i> Airline</h5>
                        <p>Ghana Airways</p>
                    </div>
                    <div class="app_content__detail">
                        <h5><i class="fa-solid fa-couch"></i> Available Seats</h5>
                        <p>124</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ======================SECOND SECTION======================= -->
        <div class="app_section">
            <div class="app_header">
                <h3>Passengers</h3>
            </div>
            <div class="app_content">
                <div class="app_content__passenger">
                    <div class="passenger-header">
                        <h4><i class="fa-solid fa-caret-right"></i> 01</h4>
                        <div class="passenger-controls">
                            <button type="button" class="add-btn"><i class="fa-solid fa-square-plus"></i></button>
                            <button type="button" class="delete-btn"><i class="fa-solid fa-square-xmark"></i></button>
                        </div>
                    </div>
                    <div class="passenger-form">
                        <div class="form-input">
                            <label for="lastname">Last name</label>
                            <input type="text" name="lastname" placeholder="Last name">
                        </div>
                        <div class="form-input">
                            <label for="firstname">First name and other names</label>
                            <input type="text" name="firstname" placeholder="First name and other names">
                        </div>
                        <div class="form-input">
                            <label for="class">Class</label>
                            <select name="class">
                                <option value="" disabled selected hidden>Class</option>
                            </select>
                        </div>
                        <div class="form-input">
                            <label for="age">Age</label>
                            <select name="age">
                                <option value="" disabled selected hidden>Age</option>
                            </select>
                        </div>
                        <div class="form-input">
                            <label for="gender">Gender</label>
                            <select name="gender">
                                <option value="" disabled selected hidden>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
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
                        <input type="text" name="lastname" placeholder="Last name">
                    </div>
                    <div class="form-input">
                        <label for="firstname">First name and other names</label>
                        <input type="text" name="firstname" placeholder="First name and other names">
                    </div>
                    <div class="form-input">
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-input">
                        <label for="number">Number</label>
                        <input type="text" name="number" placeholder="Number">
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
                    <input type="text" name="cardtype" placeholder="Card Type">
                </div>
                <div class="form-input">
                    <label for="number">Card Number</label>
                    <input type="text" name="number" placeholder="Card Number">
                </div>
                <div class="form-input">
                    <label for="name">Name on card</label>
                    <input type="text" name="name" placeholder="Name on card">
                </div>
                <div class="form-input">
                    <label for="expirydate">Expiry Date</label>
                    <input type="text" name="expirydate" placeholder="Expiry Date">
                </div>
                <div class="form-input">
                    <label for="cvv">CVV</label>
                    <input type="text" name="cvv" maxlength="3" placeholder="CVV">
                </div>
                </div>
            </div>
        </div>

        <!-- ======================MAKE RESERVATION BUTTON======================= -->
        <div class="app_button">
            <button type="button" id="make-reservation">Make Reservation</button>
        </div>
    `)
}