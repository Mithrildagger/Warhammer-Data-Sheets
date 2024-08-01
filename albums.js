import { detachmentNames } from './strategies.js'; // Adjust the path accordingly

// Variables
export let albumNames = {}; // Dictionary for album names and their images
export let albumUnits = {}; // Dictionary for album names and their associated units
export let albumDetachment = {}; // Dictionary for album names and their associated detachment

// DOM Elements
const albumForm = document.getElementById('albumForm');
const albumScrollContainer = document.querySelector('.album-scroll-container');
const modal = document.getElementById('albumModal');
const closeModal = document.getElementById('closeModal');
const addAlbumButton = document.querySelector('.add-album-button');

// Show the modal
export function initializeAlbumModal() {
    addAlbumButton.addEventListener('click', () => {
        modal.style.display = 'block';
        populateDetachmentDropdown(); // Populate dropdown when modal is shown
    });

    // Close the modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Populate the detachment dropdown
function populateDetachmentDropdown() {
    const detachmentDropdown = document.getElementById('detachmentDropdown');
    detachmentDropdown.innerHTML = ''; // Clear existing options

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select an army strategy';
    detachmentDropdown.appendChild(defaultOption);

    // Add detachment options
    detachmentNames.forEach(detachment => {
        const option = document.createElement('option');
        option.value = detachment;
        option.textContent = detachment;
        detachmentDropdown.appendChild(option);
    });
}

// Handle album form submission
export function handleAlbumFormSubmission() {
    albumForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const albumName = document.getElementById('albumName').value;
        const albumPicture = document.getElementById('albumPicture').files[0];
        const selectedDetachment = document.getElementById('detachmentDropdown').value;

        if (albumName && albumPicture && selectedDetachment) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Create album container
                const albumContainer = document.createElement('div');
                albumContainer.classList.add('album-container');
                albumContainer.dataset.albumName = albumName; // Add data attribute for album name

                const img = document.createElement('img');
                img.src = e.target.result; // Image source from FileReader
                img.alt = albumName;
                img.classList.add('album-image');

                const name = document.createElement('p');
                name.textContent = albumName;
                name.classList.add('album-name');

                const detachment = document.createElement('p');
                detachment.textContent = `Detachment: ${selectedDetachment}`;
                detachment.classList.add('album-detachment');

                albumContainer.appendChild(img);
                albumContainer.appendChild(name);
                albumContainer.appendChild(detachment); // Append detachment name

                albumScrollContainer.appendChild(albumContainer);

                // Add the album name to the dictionary with an empty list
                albumNames[albumName] = e.target.result;
                albumUnits[albumName] = [];
                albumDetachment[albumName] = selectedDetachment; // Associate detachment with album

                // Add click event to filter units by album and log the units in the album
                albumContainer.addEventListener('click', () => {
                    const clickedAlbumName = albumContainer.dataset.albumName;

                    // Log the album name and the units in the album
                    console.log(`Album "${clickedAlbumName}" clicked. Units in this album:`, albumUnits[clickedAlbumName]);

                    // Call the filter function (assuming you want to filter units)
                    filterUnitsByAlbum(clickedAlbumName);
                });

                // Close the modal
                modal.style.display = 'none';

                // Reset the form
                albumForm.reset();
            };

            reader.readAsDataURL(albumPicture); // Convert image file to base64 URL
        }
    });
}

// Close modal when clicking outside of it
export function closeModalOnOutsideClick() {
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Function to show album options
export function showAlbumOptions(unitData, optionsMenu) {
    const albumOptions = document.createElement('div');
    albumOptions.classList.add('album-options');

    const albumList = document.createElement('ul');

    Object.keys(albumNames).forEach(album => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `Add to ${album}`;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            addToAlbum(unitData, album); // Call the function to add the unit to the selected album
        });

        listItem.appendChild(link);
        albumList.appendChild(listItem);
    });

    albumOptions.appendChild(albumList);

    optionsMenu.innerHTML = '';
    optionsMenu.appendChild(albumOptions);
}

// Function to add a unit to an album
export function addToAlbum(unitData, albumName) {
    if (albumUnits[albumName] && unitData) {
        albumUnits[albumName].push(unitData.name);
        console.log(`Added ${unitData.name} to album "${albumName}".`);
    } else {
        console.log(`Failed to add ${unitData.name} to album "${albumName}".`);
    }
}

// Function to filter units by selected album
export function filterUnitsByAlbum(albumName) {
    const unitsContainer = document.getElementById('unitsContainer');

    if (!unitsContainer) {
        console.error('Units container not found');
        return;
    }

    // Get the list of unit names in the selected album
    const unitsInAlbum = albumUnits[albumName] || [];

    // Log the album being filtered and the units in it
    console.log(`Filtering units for album: "${albumName}"`);
    console.log(`Units in album "${albumName}":`, unitsInAlbum);

    unitsContainer.querySelectorAll('.unit').forEach(unit => {
        const unitName = unit.querySelector('.unit-name').textContent; // Get the unit name from the element

        // Log the name of the unit being checked
        console.log(`Checking unit: "${unitName}"`);

        if (unitsInAlbum.includes(unitName)) {
            unit.style.display = 'block'; // Show the unit
            console.log(`Showing unit: "${unitName}"`);
        } else {
            unit.style.display = 'none'; // Hide the unit
            console.log(`Hiding unit: "${unitName}"`);
        }
    });
}
