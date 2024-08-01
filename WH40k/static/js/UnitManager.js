import { displayUnitDetails } from './displayUnitDetails.js';
import { showAlbumOptions } from './albums.js';

// Variables to track options menu state and reference
let currentPopover = null;
let isPopoverOpen = false;


export function addUnitToContainer(unitData) {
    const unitDiv = document.createElement('div');
    unitDiv.classList.add('unit');

    // Create unit name element
    const unitName = document.createElement('div');
    unitName.classList.add('unit-name');
    unitName.textContent = unitData.name;

    // Set faction keyword attribute for filtering
    unitDiv.setAttribute('data-faction-keyword', unitData.factionKeyword);

    // Set keywords attribute for filtering
    unitDiv.setAttribute('data-keywords', unitData.keywords.join(', ')); // Join keywords with commas

    // Add unit name to unit div
    unitDiv.appendChild(unitName);

    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    // Options button
    const optionsButton = document.createElement('button');
    optionsButton.classList.add('options-button');
    optionsButton.innerHTML = '⋮'; // Unicode for vertical ellipsis (three dots)
    optionsButton.addEventListener('click', (event) => togglePopover(event, unitData)); // Pass unitData to togglePopover
    optionsContainer.appendChild(optionsButton);

    // Popover
    const popover = document.createElement('div');
    popover.classList.add('popover-menu');
    popover.style.display = 'none'; // Initially hide the popover
    optionsContainer.appendChild(popover);

    // Add options container to unit div
    unitDiv.appendChild(optionsContainer);

    // Add unit image
    const unitImage = document.createElement('img');
    unitImage.classList.add('unit-image');
    unitImage.src = unitData.image || '/images/default-unit-image.jpg';
    unitImage.alt = unitData.name + ' Image';
    unitDiv.appendChild(unitImage);

    // Add click event to display details
    unitDiv.addEventListener('click', (event) => {
        if (!isPopoverOpen) {
            displayUnitDetails(unitData);
        }
    });

    // Append unit div to units container
    const unitsContainer = document.getElementById('unitsContainer');
    unitsContainer.appendChild(unitDiv);

    populateFactionKeywordDropdown(); // Update faction keyword dropdown
}

function togglePopover(event, unitData) {
    event.stopPropagation(); // Prevent click event from bubbling up
    const optionsButton = event.currentTarget; // Get the button that triggered the popover
    const optionsContainer = optionsButton.parentElement; // Get the options container

    // Close the current popover if it's open and different from the one being opened
    if (currentPopover && currentPopover !== optionsContainer.querySelector('.popover-menu')) {
        hidePopover();
    }

    const popover = optionsContainer.querySelector('.popover-menu'); // Get the popover
    if (popover.style.display === 'block') {
        // If the popover is already open, hide it
        hidePopover();
    } else {
        // Create the popover content
        const title = document.createElement('div');
        title.classList.add('popover-title');
        title.textContent = 'Add to';

        const listContainer = document.createElement('div');
        listContainer.classList.add('popover-list');

        showAlbumOptions(unitData, listContainer); // Populate list items in listContainer

        // Clear existing content and append the new content
        popover.innerHTML = ''; // Clear previous content
        popover.appendChild(title);
        popover.appendChild(listContainer);

        // Position the popover directly below the options button
        const buttonRect = optionsButton.getBoundingClientRect();
        popover.style.position = 'absolute';
        popover.style.top = `${buttonRect.bottom + window.scrollY}px`; // Align below the button
        popover.style.left = '0'; // Align to the left edge of the options container
        popover.style.display = 'block';

        // Update the reference to the current popover
        currentPopover = popover;
        isPopoverOpen = true;

        // Log the unit name to the console
        console.log(`Unit Name: ${unitData.name}`);

        // Add event listener to document to detect clicks outside the popover
        document.addEventListener('click', handleClickOutside);
    }
}

function handleClickOutside(event) {
    const target = event.target;

    // Check if the click is outside of the current popover and options button
    if (currentPopover && !currentPopover.contains(target) && !target.closest('.options-container')) {
        hidePopover();
        document.removeEventListener('click', handleClickOutside); // Clean up event listener
    }
}

function hidePopover() {
    if (currentPopover) {
        currentPopover.style.display = 'none';
        currentPopover = null;
        isPopoverOpen = false;
    }
}

function populateFactionKeywordDropdown() {
    const factionKeywordSelect = document.getElementById('factionKeywordSelect');
    const factionKeywords = new Set();

    // Collect unique faction keywords from existing units
    document.querySelectorAll('.unit').forEach(unit => {
        const unitFactionKeyword = unit.getAttribute('data-faction-keyword');
        if (unitFactionKeyword && unitFactionKeyword !== 'undefined') {
            factionKeywords.add(unitFactionKeyword);
        }
    });

    // Clear existing options, keeping the first one
    factionKeywordSelect.innerHTML = '<option value="">All Faction Keywords</option>';

    // Populate the dropdown with unique faction keywords
    factionKeywords.forEach(keyword => {
        const option = document.createElement('option');
        option.value = keyword;
        option.textContent = keyword;
        factionKeywordSelect.appendChild(option);
    });
}
