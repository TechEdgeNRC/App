document.getElementById('addButton').addEventListener('click', addData);

function addData() {
    let transId = document.getElementById('transId').value;
    let location = document.getElementById('location').value;
    let tech = document.getElementById('tech').value;

    let data = {
        transId: transId,
        location: location,
        tech: tech,
        timestamp: new Date().getTime() // Store the current timestamp
    };
    // Add data to localStorage
    // Retrieve existing data and add new data
    let dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.push(data);
    localStorage.setItem('dataList', JSON.stringify(dataList));

    // Update UI
    addRowToTable(data);
}

function startTimer(displayElement, startTime) {
    updateTimer(displayElement, startTime); // Update immediately

    // Update every 60 seconds
    setInterval(function() {
        updateTimer(displayElement, startTime);
    }, 60000);
}

function updateTimer(displayElement, startTime) {
    let currentTime = new Date().getTime();
    let timeDiff = currentTime - startTime; // Difference in milliseconds
    let minutesElapsed = Math.floor(timeDiff / 60000); // Convert to minutes
    displayElement.textContent = `${minutesElapsed}`;
}


function deleteRow(index) {
    index = parseInt(index); // Convert index to integer to ensure proper handling

    // Update localStorage
    let dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    if (index >= 0 && index < dataList.length) { // Check if the index is valid
        dataList.splice(index, 1);
        localStorage.setItem('dataList', JSON.stringify(dataList));
    }

    // Re-render the table
    populateTable();
}

function populateTable() {
    let tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the table before repopulating

    // Get data from localStorage and repopulate the table
    let dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.forEach((data, index) => {
        addRowToTable(data, index);
    });
}

function addRowToTable(data, index) {
    let table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);

    cell1.textContent = data.transId;
    cell2.textContent = data.location;
    cell3.textContent = data.tech;

    // Add timer display
    let timerDisplay = document.createElement('span');
    timerDisplay.classList.add('timer-display', 'bg-orange-400', 'hover:bg-orange-700','text-white','font-bold','py-1','px-2', 'mr-2','rounded','focus:outline-none','focus:shadow-outline'); // Add Tailwind classes as needed
    cell4.appendChild(timerDisplay);

    // Add delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn', 'bg-red-500', 'hover:bg-red-700','text-white','font-bold','py-1','px-2','rounded','focus:outline-none','focus:shadow-outline'); // Add any Tailwind classes you need
    deleteButton.dataset.index = index;
    deleteButton.addEventListener('click', function() {
        deleteRow(deleteButton.dataset.index);
    });
    cell4.appendChild(deleteButton);

    // Start the timer for this row
    startTimer(timerDisplay, data.timestamp);
}


document.addEventListener('DOMContentLoaded', populateTable);

