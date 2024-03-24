import "@fortawesome/fontawesome-free/css/all.css"
import $ from "jquery";
import Database from "./classes/database";
import homePage from "./pages/home";
import reservePage from "./pages/reserve";
import checkPage from "./pages/check";
import { showPage } from "./pages/show";
import AirlineList from "./classes/airline";
import flatpickr from "flatpickr";
import { airlines, availableDeparturtimes, departureLocations, destinationLocations } from "./constants";
import ReservationSystem from "./classes/system";

const departureDateConfig = {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "F j, Y",
  minDate: "today",
  maxDate: new Date().fp_incr(14),
}

export const reserveForm = {
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

// initialise airline data
AirlineList.populate(airlines);

// initialise db
Database.init(getData("flights"),getData("reservations"),getData("tickets"));

// initialise system
export const app = new ReservationSystem();

$(function() {
    // use flatpickr for selecting date
    flatpickr("#departure-date", departureDateConfig);

    // provide options for neccesary options for select tags
    provideOptions($("#airline"), airlines, "airline", "airline");
    provideOptions($("#departure"), departureLocations, "location", "location");
    provideOptions($("#destination"), destinationLocations, "location", "location");
    provideOptions($("#time"), availableDeparturtimes, "name", "time");

    // handle flight booked
    handleBookFlight($("#confirm-flight"));

    // on page load set app content to home;
    homePage($("#app"));

    // function to add events to toggle pages
    togglePages($('.nav-btn'));

});

function togglePages(btns) {
    btns.on('click', function() {
        let body = $("#app");
        toggleActive(btns, this);
        const page = $(this).data('page');
        switch(page) {
          case 'home':
            homePage(body);
            break;
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

function toggleActive(btns, active) {
    btns.each(function() {
      $(this).attr('data-active', 'false');
    });
    $(active).attr('data-active', 'true');
}

function getData(name) {
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

function saveData(name, data) {
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Save the JSON string to local storage with the provided name
    localStorage.setItem(name, jsonData);
}

function provideOptions(element, data, name, value) {
  data.forEach(item => element.append(`<option value="${item[value]}">${item[name]}</option>`));
}

function handleBookFlight(element) {

  element.on('click', function(){
    let departure = $("#departure").val();
    let destination = $("#destination").val();
    let airline = $("#airline").val();
    let departureDate = $("#departure-date").val();
    let departureTime = $("#time").val();
    
    if(!departure|| !destination || !airline || !departureDate || !departureTime) return;
    
    app.init(airline, departure, destination, departureDate, departureTime);

    $('[data-page="reserve"]').trigger("click");
  })
}

export function handleInputChange(element){
  let section = $(element).data("section");
  let key = $(element).data("key");
  let index = Number($(element).data("index"));
  let value = $(element).val();

  reserveForm[section][index][key] = value;
}

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

export function handleDeletePassenger(element) {
  element.on("click", function() {
    let index = Number($(this).data("index"));

    reserveForm.passengers.splice(index, 1);

    reservePage($("#app"));
  })
}