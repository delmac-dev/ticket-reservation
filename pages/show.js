export function showPage(element) {
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
                    <tr>
                        <td>WQ8674WQ</td>
                        <td>4898737246</td>
                        <td>ERG4562T</td>
                        <td>John Doe</td>
                        <td>Female</td>
                        <td>Economy</td>
                        <td>R45</td>
                    </tr>
                    <tr>
                        <td>OKJ342XD</td>
                        <td>2897867533</td>
                        <td>GJK487IO</td>
                        <td>Jane Smith</td>
                        <td>Female</td>
                        <td>First Class</td>
                        <td>K09</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    `)
}