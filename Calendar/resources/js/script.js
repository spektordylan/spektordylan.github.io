updateLocationOptions();

let editing = false;
let currentEvent = null;

document.querySelector('[data-bs-target="#event_modal"]').addEventListener('click', function() {
    editing = false;
    currentEvent = null;

    document.getElementById('eventModalLabel').textContent = 'Create Event';
    const form = document.getElementById('event_form');
    form.reset();
    form.classList.remove('was-validated');
    updateLocationOptions();
});

document.getElementById('event_form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }

    saveEvent();
});

function updateLocationOptions() {
    const modality = document.getElementById('event_modality').value;

    const locationElement = document.getElementById('location_group');
    const remoteURLElement = document.getElementById('remote_url_group');

    const locationInput = document.getElementById('event_location');
    const remoteInput = document.getElementById('event_remote_url');

    if (modality === 'in-person') {
        locationElement.style.display = 'block';
        remoteURLElement.style.display = 'none';

        locationInput.required = true;
        remoteInput.required = false;

    } else {
        locationElement.style.display = 'none';
        remoteURLElement.style.display = 'block';

        locationInput.required = false;
        remoteInput.required = true;
    }
}

function saveEvent() {
  const eventDetails = {
        name: document.getElementById('event_name').value,
        category: document.getElementById('event_category').value,
        weekday: document.getElementById('event_weekday').value,
        time: document.getElementById('event_time').value,
        modality: document.getElementById('event_modality').value,
        location: document.getElementById('event_location').value,
        remote_url: document.getElementById('event_remote_url').value,
        attendees: document.getElementById('event_attendees').value
    };

    console.log('Event Details:', eventDetails);

    if (editing && currentEvent) {
        updateEventCard(currentEvent, eventDetails);
    
        currentEvent = null;
        editing = false

        document.getElementById('eventModalLabel').textContent = 'Create Event';
    }
    else {
        addEventToCalendarUI(eventDetails);
    }

    document.getElementById('event_form').reset();

    const myModalElement = document.getElementById('event_modal');
    const myModal = bootstrap.Modal.getOrCreateInstance(myModalElement);
    myModal.hide();

    const form = document.getElementById('event_form');
    form.classList.remove('was-validated');
    updateLocationOptions();
}

function addEventToCalendarUI(eventInfo) {
    let event_card = createEventCard(eventInfo);

    document.getElementById(eventInfo.weekday).appendChild(event_card);
}

function createEventCard(eventDetails) {
    let event_element = document.createElement('div');

    event_element.classList = 'event row border rounded m-1 py-1';

    event_element.eventData = eventDetails;

    if (eventDetails.category === 'academic') {
        event_element.style.backgroundColor = '#ff909a';
    } else if (eventDetails.category === 'work') {
        event_element.style.backgroundColor = '#8ac2ff';
    } else if (eventDetails.category === 'personal') {
        event_element.style.backgroundColor = '#87ffa3';
    }

    let info = document.createElement('div');

    let infoHTML = `
        <strong>Event Name:</strong><br>${eventDetails.name}<br>
        <strong>Event Time:</strong><br>${eventDetails.time}<br>
        `;

        if (eventDetails.modality === "in-person") {
        infoHTML += `
            <strong>Event Modality:</strong><br>In-Person<br>
            <strong>Location:</strong><br>${eventDetails.location}<br>
        `;
        } else if (eventDetails.modality === "remote") {
        infoHTML += `
            <strong>Event Modality:</strong><br>Remote<br>
            <strong>Remote URL:</strong><br>${eventDetails.remote_url}<br>
        `;
        }

        infoHTML += `
        <strong>Attendees:</strong><br>${eventDetails.attendees}
        `;

    info.innerHTML = infoHTML;

    event_element.appendChild(info);

    document.getElementById('eventModalLabel').textContent = 'Create Event'

    event_element.addEventListener('click', function() {
        openEditingModal(event_element);
    });

    return event_element;
}

function openEditingModal(eventElement) {
    editing = true;
    currentEvent = eventElement;

    document.getElementById('eventModalLabel').textContent = 'Edit Event';

    const data = eventElement.eventData;
    
    document.getElementById('event_name').value = data.name;
    document.getElementById('event_category').value = data.category;
    document.getElementById('event_weekday').value = data.weekday;
    document.getElementById('event_time').value = data.time;
    document.getElementById('event_modality').value = data.modality;
    document.getElementById('event_location').value = data.location;
    document.getElementById('event_remote_url').value = data.remote_url;
    document.getElementById('event_attendees').value = data.attendees;

    updateLocationOptions();

    const myModalElement = document.getElementById('event_modal');
    const myModal = bootstrap.Modal.getOrCreateInstance(myModalElement);
    myModal.show();
}


function updateEventCard(eventElement, eventDetails) {
    eventElement.eventData = eventDetails;

    if (eventDetails.category === 'academic') {
        eventElement.style.backgroundColor = '#ff909a';
    } else if (eventDetails.category === 'work') {
        eventElement.style.backgroundColor = '#8ac2ff';
    } else if (eventDetails.category === 'personal') {
        eventElement.style.backgroundColor = '#87ffa3';
    }
    
    let infoHTML = `
        <strong>Event Name:</strong><br>${eventDetails.name}<br>
        <strong>Event Time:</strong><br>${eventDetails.time}<br>
        `;

    if (eventDetails.modality === "in-person") {
        infoHTML += `
            <strong>Event Modality:</strong><br>In-Person<br>
            <strong>Location:</strong><br>${eventDetails.location}<br>
        `;
    } else if (eventDetails.modality === "remote") {
        infoHTML += `
            <strong>Event Modality:</strong><br>Remote<br>
            <strong>Remote URL:</strong><br>${eventDetails.remote_url}<br>
        `;
    }

    infoHTML += `
        <strong>Attendees:</strong><br>${eventDetails.attendees}
    `;

    eventElement.querySelector('div').innerHTML = infoHTML;

    if (eventElement.parentElement.id !== eventDetails.weekday) {
        eventElement.parentElement.removeChild(eventElement);
        document.getElementById(eventDetails.weekday).appendChild(eventElement);
    }
}
