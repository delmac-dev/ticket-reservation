import $ from "jquery";
import Database from "./classes/database";
import homePage from "./pages/home";
import reservePage from "./pages/reserve";
import checkPage from "./pages/check";
import { showPage } from "./pages/show";
import AirlineList from "./classes/airline";
import flatpickr from "flatpickr";

const dateConfig = {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  maxDate: new Date().fp_incr(14),
}

$(function() {
    // use flatpickr for selecting date
    flatpickr("#date", dateConfig);
    // initialise airline data
    AirlineList.populate(getData("airline"));

    // initialise db
    Database.init(getData("flights"),getData("reservations"),getData("tickets"));

    // on page load set app content to home;
    homePage($("#app"));

    // function to add events to toggle pages
    togglePages($('.nav-btn'));
});

function togglePages(btns) {
    btns.on('click', function() {
        let app = $("#app");
        toggleActive(btns, this);
        const page = $(this).data('page');
        switch(page) {
          case 'home':
            homePage(app);
            break;
          case 'reserve':
            reservePage(app);
            break;
          case 'check':
            checkPage(app);
            break;
          case 'show':
            showPage(app);
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

function saveData(data, name) {
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Save the JSON string to local storage with the provided name
    localStorage.setItem(name, jsonData);
}

const airlines = [
    {
        name: "Ghana Airways",
    }
]