const state = {
  rooms: [
    { id: "A", name: "Room A", capacity: 4 },
    { id: "B", name: "Room B", capacity: 6 },
    { id: "C", name: "Room C", capacity: 8 }
  ],

  slots: ["9-10", "10-11", "11-12", "12-1", "2-3"],
  date: new Date().toISOString().split("T")[0],

  // capacity filter
  filter: "all",

  // load saved bookings if they exist
  bookings: JSON.parse(localStorage.getItem("bookings")) || {}
};


// get elements from HTML
const roomsDiv = document.getElementById("rooms");
const bookingList = document.getElementById("bookingList");
const dateInput = document.getElementById("datePicker");
const filterSelect = document.getElementById("capacityFilter");
const clearBtn = document.getElementById("clearBookings");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const confirmBtn = document.getElementById("confirmBooking");
const cancelModal = document.getElementById("cancelModal");

const darkBtn = document.getElementById("darkToggle");

// used to temporarily store booking before confirm
let tempBooking = null;


// set today's date in the input
dateInput.value = state.date;


// save bookings to localStorage
function saveBookings() {
  localStorage.setItem("bookings", JSON.stringify(state.bookings));
}


// create a unique key for every booking
function makeKey(roomId, slot) {
  return state.date + "-" + roomId + "-" + slot;
}


// show modal before confirming booking
function showModal(roomId, slot) {
  tempBooking = { roomId, slot };

  modalText.textContent = "Book Room " + roomId + " at " + slot + "?";

  modal.classList.remove("hidden");
}


// confirm booking
function confirmBooking() {

  const room = tempBooking.roomId;
  const slot = tempBooking.slot;

  const key = makeKey(room, slot);

  state.bookings[key] = true;

  saveBookings();

  modal.classList.add("hidden");

  render();
}


// cancel an existing booking
function cancelBooking(key) {

  delete state.bookings[key];

  saveBookings();

  render();
}


// create the room UI
function renderRooms() {

  roomsDiv.innerHTML = "";

  let filteredRooms = state.rooms.filter(function (room) {

    if (state.filter === "all") return true;

    return room.capacity >= Number(state.filter);

  });


  filteredRooms.forEach(function (room) {

    const roomCard = document.createElement("div");
    roomCard.className = "room";

    roomCard.innerHTML = `
      <h3>${room.name}</h3>
      <p>Capacity: ${room.capacity}</p>
      <div id="room-${room.id}"></div>
    `;

    roomsDiv.appendChild(roomCard);

    const slotContainer = document.getElementById("room-" + room.id);


    state.slots.forEach(function (slot) {

      const key = makeKey(room.id, slot);

      const btn = document.createElement("button");
      btn.textContent = slot;

      if (state.bookings[key]) {

        btn.className = "slot booked";
        btn.disabled = true;

      } else {

        btn.className = "slot available";

        btn.onclick = function () {
          showModal(room.id, slot);
        };

      }

      slotContainer.appendChild(btn);

    });

  });

}


// show list of bookings
function renderBookings() {

  bookingList.innerHTML = "";

  const keys = Object.keys(state.bookings).filter(function (k) {
    return k.startsWith(state.date);
  });


  if (keys.length === 0) {
    bookingList.innerHTML = "<li>No bookings</li>";
    return;
  }


  keys.forEach(function (key) {

    const li = document.createElement("li");

    li.innerHTML = `
      ${key}
      <button onclick="cancelBooking('${key}')">Cancel</button>
    `;

    bookingList.appendChild(li);

  });

}


// main render function
function render() {

  renderRooms();

  renderBookings();

}


// when date changes
dateInput.onchange = function (e) {

  state.date = e.target.value;

  render();

};


// capacity filter
filterSelect.onchange = function (e) {

  state.filter = e.target.value;

  render();

};


// clear all bookings
clearBtn.onclick = function () {

  state.bookings = {};

  saveBookings();

  render();

};


// confirm modal booking
confirmBtn.onclick = confirmBooking;


// close modal
cancelModal.onclick = function () {

  modal.classList.add("hidden");

};


// dark mode toggle
darkBtn.onclick = function () {

  document.body.classList.toggle("dark");

};


// first render when page loads
render();
