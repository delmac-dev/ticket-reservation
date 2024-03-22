import $ from "jquery";
import Database from "./classes/database";
import homePage from "./pages/home";
import reservePage from "./pages/reserve";
import checkPage from "./pages/check";
import { showPage } from "./pages/show";

$(function() {
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