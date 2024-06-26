import { reserveForm } from "../main";

export default function ticketForm({index, lastname, othernames, seatClass, age, gender}) {
    return `
        <div class="app_content__passenger">
            <div class="passenger-header">
                <h4><i class="fa-solid fa-caret-right"></i> 0${index+1}</h4>
                <button type="button" data-index="${index}" class="remove-passenger" ${index === 0? 'disabled': ''}>Remove Passenger</button>
            </div>
            <div class="passenger-form">
                <div class="form-input">
                    <label for="lastname">Last name</label>
                    <input type="text" class="reserve-input" data-section="passengers" data-key="lastname" data-index="${index}" name="lastname" placeholder="Last name" value="${lastname}">
                </div>
                <div class="form-input">
                    <label for="firstname">First name and other names</label>
                    <input type="text" class="reserve-input" data-section="passengers" data-key="othernames" data-index="${index}" name="firstname" placeholder="First name and other names" value="${othernames}">
                </div>
                <div class="form-input">
                    <label for="class">Class</label>
                    <select name="class" class="reserve-input" data-section="passengers" data-key="seatClass" data-index="${index}">
                        <option value="" disabled  ${seatClass === "" ? 'selected' : ''} hidden>Class</option>
                        <option value="Economy"  ${seatClass === "Economy" ? 'selected' : ''}>Economy</option>
                        <option value="Business" ${seatClass === "Business" ? 'selected' : ''}>Business</option>
                        <option value="First Class"  ${seatClass === "First Class" ? 'selected' : ''}>First Class</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="age">Age</label>
                    <select name="age" class="reserve-input" data-section="passengers" data-key="age" data-index="${index}">
                        <option value="" disabled ${age === "" ? 'selected' : ''} hidden>Age</option>
                        <option value="Adult" ${age === "Adult" ? 'selected' : ''}>Adult(18+)</option>
                        <option value="Child" ${age === "Child" ? 'selected' : ''}>Child(below 18)</option>
                    </select>
                </div>
                <div class="form-input">
                    <label for="gender">Gender</label>
                    <select name="gender" class="reserve-input" data-section="passengers" data-key="gender" data-index="${index}">
                        <option value="" disabled ${gender === "" ? 'selected' : ''} hidden>Gender</option>
                        <option value="Male" ${gender === "Male" ? 'selected' : ''}>Male</option>
                        <option value="Female" ${gender === "Female" ? 'selected' : ''}>Female</option>
                    </select>
                </div>
            </div>
        </div>
    `
}