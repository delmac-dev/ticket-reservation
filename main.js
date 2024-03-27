import "@fortawesome/fontawesome-free/css/all.css"
import $ from "jquery";
import reservePage from "./pages/reserve";
import checkPage from "./pages/check";
import { showPage } from "./pages/show";
import ReservationSystem from "./classes/system";

export var reserveForm = {}

// todo: check if this variable is neccessay
export var foundReservation = {};

// initialise system
export const app = new ReservationSystem();

/** JQUERY RUN ON DOCUMENT LOADED - 
 * this function is a jquery method that is ran when ever the DOM is loaded fully
 */
$(function() {
  // initialise reserve form state to default
  initReserverForm();

  // show reserve page on page loaded in #app element
  reservePage($("#app"));

  // function to add events to toggle pages
  togglePages($('.nav-btn'));

});

/** TOGGLES ALL THE PAGES - 
 * this function enables the pages in html to be toggled based on
 * the page button that was pressed
 * 
 * @param btns the buttons that are binded to the click event
 */
function togglePages(btns) {
  btns.on('click', function() {
    console.log("ran");
    // getting the element that is going to have the various pages renderd
    // in it to body
    let body = $("#app");

    // use jquery to filter through all page selection buttons for the button
    // with data-active equals true and setting it to false
    btns.filter('[data-active="true"]').attr('data-active', 'false');

    // set the data-active of the selected page selection button to true
    $(this).attr('data-active', 'true');

    // initializing foundRservation list to an empty array on page change occured
    foundReservation = {};
    
    // using a switch statement to render the respective pages based on the clicked button
    const page = $(this).data('page');
    switch(page) {
      case 'reserve':
        reservePage(body);
        break;
      case 'check':
        checkPage(body);
        break;
      case 'show':
        showPage(body);
        break;
      default:
        break;
    }
  })
}

/** GET DATA FROM LOCALSTORAGE-
 * get saved data from browser localstorage based on its name 
 * and return it in a form of a list
 * 
 * @param name the name the data was saved with
 * 
 * @returns a list of the saved data | []
 */
export function getData(name) {
    // Get the data from local storage based on the provided name
    const data = localStorage.getItem(name);

    // Check if data exists in local storage
    if (data) {
        // Parse the JSON data and return it
        return JSON.parse(data);
    } else {
        // If data doesn't exist, return null or handle the situation according to your needs
        return [];
    }
}

/** SAVE DATA TO LOCALSTORAGE - 
 * save any data in the application to localstorage
 * 
 * @param name the name to store the data by
 * @param data the data to be stored
 */
export function saveData(name, data) {
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Save the JSON string to local storage with the provided name
    localStorage.setItem(name, jsonData);
}

/** HANDLING INPUT ONCHANGE EVENT - 
 * save the state of the form input in make reservation form 
 * 
 * @param element the input form to bing the onchange event
 * 
 * @returns void
 */
export function handleInputChange(element){
  let section = $(element).data("section");
  let key = $(element).data("key");
  let index = Number($(element).data("index"));
  let value = $(element).val();

  // saving the current state of an input field in make reseravtion form
  reserveForm[section][index][key] = value;
}

/** HANDLING BUTTON CLICKED TO ADD PASSENGERS -
 *  this function is invoked in a reseravation form where
 *  a reserver books several tickets for a group of people.
 *  This function increases the number of booked tickets in 
 * a reservation by one
 * 
 * @param element the button to bind the click event
 * 
 * @returns void
 */
export function handleAddPassenger(element) {
  element.on("click", function() {
    reserveForm.passengers.push({
      lastname: "",
      othernames: "",
      seatClass: "",
      age: "",
      gender: ""
    })

    reservePage($("#app"));
  })
}

/** HANDLING BUTTON CLICKED TO DELETE PASSENGERS -
 *  this function is invoked when the delete button for a 
 *  ticket in pressed in the reservation form.
 * 
 * @param element the button to bind this click event to 
 * 
 * @returns void
 */
export function handleDeletePassenger(element) {
  element.on("click", function() {
    let index = Number($(this).data("index"));

    reserveForm.passengers.splice(index, 1);

    reservePage($("#app"));
  })
};

/** HANDLING BUTTON CLICKED TO MAKE RESERAVATION - 
 *  invoked by clicking on the make reservation button in the
 *  reservation form page and gets all the data from the input fields 
 *  passing them to the addReservation method of the reservationSystem class
 * 
 * @param element the html button to bind this click event
 * 
 * @returns void
 */
export function handleMakeReservation(element){
  element.on("click", function() {
    // get the reserver information from the reservation form
    let {lastname, othernames, email, number} = reserveForm.contact[0];

    // get the payment infomation from the reseravation form
    let {cardType, cardNumber, cardName, expiryDate, cvv} = reserveForm.payment[0];

    // get the reservation information from the reservation form
    let reservation = {
      lastname,
      othernames,
      email,
      number,
      cardType,
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      totalReserved: reserveForm.passengers.length,
    };

    // pass into the invoked method of instance of reservation system 
    // the reservation and the tickets in form of list of passengers
    let status = app.addReservation(reservation, reserveForm.passengers);

    if(status === "success") {
      // show reservation success popup;

      // initialise reserveForm
      initReserverForm();

      // rerender reservePage
      reservePage($("#app"));
    }
  })
}

/** HANDLING BUTTON CLICKED TO CANCEL RSERAVTION - 
 * invoked by clicking the cancel reservation button that appears 
 * after a particular reseravtion has been searched by a user
 * 
 * @param element the buttton to bind this click event
 * 
 * @returns void
*/
export function handleCancelReservation(element){
  element.on("click", function() {
    let rCode = $(this).data("code");

    
    let status = app.cancelReservation(rCode);
    
    if(status === "success") {
      // show deleted success toast

      // rerender checkpage
      checkPage($("#app"));
    }
  })
}

/** HANDLING BUTTON CLICKED TO CHECK RESERVATION - 
 * invoked when the button to check reservation in the check reservation page
 * is clicked and it gets the entered input code and reserver last name and passes
 * it to reservation system checkRservation method that returns the found reservation
 * object or null
 * 
 * @param form the form to bind the onsubmit event to
 * 
 * @returns void
 */
export function handleCheckReservation(form){
  form.on("submit", function(event) {
    // preventing browser default behaviour when a form input is pressed
    event.preventDefault();

    // getting the reservation code entered
    let rCode = $("#search-code").val();

    // getting the last name entered
    let lastname = $("#search-reservation").val();

    if(!rCode || !lastname) {
      // render error toast with msg: fill in all the inputs
      return
    }

    foundReservation = app.checkReservation(rCode, lastname);

    // re-render checkPage to show the foundReservation
    checkPage($("#app"));
  })
}

/** HANDLING BUTTON PRESSED TO PRINT RESERVATION - 
 *  invoked when a print button that appears after a reservation is made 
 *  or a particular reseravation is checked is clicked. it calls the 
 *  the reservation system printReservation method
 * 
 * @param element button to bind the click event to
 * 
 * @returns void
 */
export function handlePrintReservation(element){
  element.on("click", function() {
    let rCode = $(this).data("code");
    
    let status = app.printReservation(rCode);
    
    if(status === "success") {
      // show download started popup
    }
  })
}

/** INITIALIZE THE STATE OF RESERVATION FORM - 
 * sets the state of all the input elements in the make reseravtion form
 * 
 * @returns void
 */
function initReserverForm() {
  reserveForm = {
    passengers: [
      {
        lastname: "",
        othernames: "",
        seatClass: "",
        age: "",
        gender: ""
      }
    ],
    contact: [{
      lastname: "",
      othernames: "",
      email: "",
      number: ""
    }],
    payment: [{
      cardType: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: ""
    }]
  }
}