export const airlines = [
    {
      airline: "Ghana Airways",
      model: "Boeing 727",
      capacity: 137,
      economySeats: {
        total: 87,
        columns: ["A", "B", "D", "E", "F", "J", "K"],
        rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      },
      businessSeats: {
        total: 30,
        columns: ["A", "B", "D", "E", "J", "K"],
        rows: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      },
      firstClassSeats: {
        total: 20,
        columns: ["A", "D", "E", "K"],
        rows: [24, 25, 26, 27, 28]
      }
    }
]

export const departureLocations = [
  { name: 'GHA-ACC, Accra', airport: 'Kotoka International Airport'},
  { name: 'GHA-KMS, Kumasi', airport: 'Kumasi Airport'},
]

export const destinationLocations = [
  { name: 'GHA-TML, Tamale', airport: 'Tamale International Airport'},
  { name: 'GHA-TKD, Takoradi', airport: 'Takoradi Airport'},
  { name: 'CIV-ABJ, Abidjan', airport: 'Félix-Houphouët-Boigny International Airport'},
  { name: 'BFA-DIP, Diapaga', airport: 'Diapaga Airport'},
  { name: 'TOG-LFW, Lomé', airport: 'Lomé-Tokoin Airport'},
]

export const availableDeparturtimes = [
  {time: "4:30", name: "Dawn"},
  {time: "1:20", name: "Day"},
  {time: "5:45", name: "Dusk"}
]