import { reserveForm } from "../main";

export default function ticketForm({index, lastname, othernames, seatClass, age, gender}) {
    return `
        <div class="app_content__passenger">
            <div class="passenger-header">
                <h4><i class="fa-solid fa-caret-right"></i> 01</h4>
                <button type="button" class="remove-passenger" disabled="${reserveForm.passengers.length === 1}">Remove Passenger</button>
            </div>
            <div class="passenger-form">
                <div class="form-input">
                    <label for="lastname">Last name</label>
                    <input type="text" class="reserve-input" data-section="passenger" data-key="lastname" data-index="${index}" name="lastname" placeholder="Last name" value="${lastname}">
                </div>
                <div class="form-input">
                    <label for="firstname">First name and other names</label>
                    <input type="text" class="reserve-input" data-section="passenger" data-key="othernames" data-index="${index}" name="firstname" placeholder="First name and other names" value="${othernames}">
                </div>
                <div class="form-input">
                    <label for="class">Class</label>
                    <select name="class" class="reserve-input" data-section="passenger" data-key="seatClass" data-index="${index}">
                        <option value="" disabled selected="${seatClass === ""}" hidden>Class</option>
                        <option value="Economy" selected="${seatClass === "Economy"}">Economy</option>
                        <option value=""Business selected="${seatClass === "Business"}">Business</option>
                        <option value="First Class" selected="${seatClass === "First Class"}">First Class</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="age">Age</label>
                    <select name="age" class="reserve-input" data-section="passenger" data-key="age" data-index="${index}">
                        <option value="" disabled selected="${age === ""}" hidden>Age</option>
                        <option value="Adult" selected="${age === "Adult"}" hidden>Adult(18+)</option>
                        <option value="Child" selected="${age === "Child"}" hidden>Child(below 18)</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="gender">Gender</label>
                    <select name="gender" class="reserve-input" data-section="passenger" data-key="gender" data-index="${index}">
                        <option value="" disabled selected="${gender === ""}" hidden>Gender</option>
                        <option value="Male" selected="${gender === "Male"}">Male</option>
                        <option value="Female" selected="${gender === "Female"}">Female</option>
                    </select>
                </div>
            </div>
        </div>
    `
}