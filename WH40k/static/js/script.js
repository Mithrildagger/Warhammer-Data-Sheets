//importing necessary files
import { specialRulesDictionary, weaponSpecialRulesDictionary } from './specialRulesDictionary.js';
// import { deathleaper, intercessor, defaultUnitData } from './testUnits.js';
import { displayUnitDetails } from './displayUnitDetails.js'; // Import the function
import { initializeAlbumModal, handleAlbumFormSubmission, closeModalOnOutsideClick, showAlbumOptions, addToAlbum, filterUnitsByAlbum, albumNames, albumUnits } from './albums.js';
import { setupStrategyEventListeners} from './strategies.js';
import { addUnitToContainer } from './unitManager.js'; // Import the function from the new file
import { populateSpecialRuleSelect, addSpecialRule } from './unitForm.js';






document.addEventListener('DOMContentLoaded', () => {

    const addUnitButton = document.getElementById('addUnitButton');
    const unitFormContainer = document.getElementById('unitFormContainer');
    const closeButton = document.querySelector('.close-button');
    const unitForm = document.getElementById('unitForm');
    const unitsContainer = document.getElementById('unitsContainer');
    const addAbilityButton = document.getElementById('addAbilityButton');
    const abilitiesContainer = document.getElementById('abilitiesContainer');
    const addWeaponButton = document.getElementById('addWeaponButton');
    const weaponsContainer = document.getElementById('weaponsContainer');
    const unitDetailsContainer = document.getElementById('unitDetails');
    const unitStatsTableBody = document.getElementById('unitStatsTableBody');
    const addCoreAbilityButton = document.getElementById('addCoreAbilityButton');
    const specialRuleSelect = document.getElementById('specialRuleSelect');
    const addSpecialRuleButton = document.getElementById('addSpecialRuleButton');
    const selectedRulesContainer = document.getElementById('selectedRulesContainer');
    const optionsMenu = document.createElement('div');
    const strategyModal = document.getElementById('strategyModal');
    const addStrategyButton = document.querySelector('.add-strategy-button');
    const closeStrategyModal = document.getElementById('closeStrategyModal');
    const addAnotherStrategyButton = document.getElementById('addStrategyButton');
    const strategiesContainer = document.getElementById('strategiesContainer');
    const albums = {}; // This object will store album names and their associated units
    let isOptionsMenuOpen = false; // Flag to manage options menu state
    let currentOptionsMenu = null;


    //adding default units to test features
    // addUnitToContainer(defaultUnitData);
    // addUnitToContainer(deathleaper);
    // addUnitToContainer(intercessor);





    initializeAlbumModal();
    handleAlbumFormSubmission();
    closeModalOnOutsideClick();

    setupStrategyEventListeners();



    //declare unit variables
    let selectedRules = [];
    let abilitiesCount = 0;
    let weaponsCount = 0;
    let unitData = {
        name: "",
        movement: "",
        toughness: "",
        save: "",
        invulnerableSave: "",
        wounds: "",
        leadership: "",
        objectiveControl: "",
        points: "",
        unitNumber: "",
        abilities: [],
        coreAbilities: [],
        weapons: [],
        keywords: [],
        albums: [],
        image: null
    };





    // Counter for the strategy fields
    let strategyCount = 0;


    // Add event listener to the Add Special Rule button
    document.getElementById("addSpecialRuleButton").addEventListener("click", addSpecialRule);

    // Function to add selected rules to unitData or perform other actions
    function addSelectedRulesToUnitData(unitData) {
        unitData.specialRules = selectedRules;
    }



    addUnitButton.addEventListener('click', () => {
        unitFormContainer.style.display = 'block'; // Show the unit form container

        // Ensure the add buttons are always present
        abilitiesContainer.appendChild(addAbilityButton);
        weaponsContainer.appendChild(addWeaponButton);
    });

    closeButton.addEventListener('click', () => {
        unitFormContainer.style.display = 'none';
        unitDetailsContainer.style.display = 'none'; // Hide unit details container
    });

    window.addEventListener('click', (event) => {
        if (event.target === unitFormContainer) {
            unitFormContainer.style.display = 'none';
            unitDetailsContainer.style.display = 'none'; // Hide unit details container
        } else if (event.target === unitDetailsContainer) {
            unitDetailsContainer.style.display = 'none'; // Hide unit details container
        }
    });




    let unitKeywordsElement = document.createElement('div');
    unitKeywordsElement.classList.add('unit-keywords');




    // Function to handle file import and display unit details
    function importUnitData(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const unitData = JSON.parse(e.target.result);
            addUnitToContainer(unitData); // Directly display unit details
        };
        reader.readAsText(file);
    }

    document.getElementById('importUnitButton').addEventListener('click', () => {
        document.getElementById('importUnitFile').click();
    });

    document.getElementById('importUnitFile').addEventListener('change', importUnitData);



    // Event listener for the Save Unit button
    document.getElementById('saveUnitButton').addEventListener('click', function() {
        if (currentUnitData) {
            sendUnitDataToServer(currentUnitData);
        } else {
            console.error('No unit data to send');
        }
    });


    function populateFactionKeywordDropdown() {
        const factionKeywordSelect = document.getElementById('factionKeywordSelect');
        const armyTypeSelect = document.getElementById('armyType');
        const factionKeywords = new Set();

        // Collect unique faction keywords from existing units
        unitsContainer.querySelectorAll('.unit').forEach(unit => {
            const unitFactionKeyword = unit.getAttribute('data-faction-keyword');
            if (unitFactionKeyword && unitFactionKeyword !== 'undefined') {
                factionKeywords.add(unitFactionKeyword);
            }
        });

        // Clear existing options, keeping the first one for factionKeywordSelect
        factionKeywordSelect.innerHTML = '<option value="">All Faction Keywords</option>';
        // Clear existing options for armyTypeSelect
        armyTypeSelect.innerHTML = '';

        // Add the default "General" option at the top of the armyTypeSelect
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = 'Select Army';
        armyTypeSelect.appendChild(defaultOption);

        const generalOption = document.createElement('option');
        generalOption.value = 'general';
        generalOption.textContent = 'General';
        armyTypeSelect.appendChild(generalOption);

        // Populate the dropdowns with unique faction keywords
        factionKeywords.forEach(keyword => {
            const factionOption = document.createElement('option');
            factionOption.value = keyword;
            factionOption.textContent = keyword;
            factionKeywordSelect.appendChild(factionOption);

            const armyOption = document.createElement('option');
            armyOption.value = keyword;
            armyOption.textContent = keyword;
            armyTypeSelect.appendChild(armyOption);
        });
    }


    // Call this function after adding units to the container
    populateFactionKeywordDropdown();



    // Function to filter units by faction keyword

    function filterUnitsByFactionKeyword() {
        const factionKeywordSelect = document.getElementById('factionKeywordSelect');
        const selectedKeyword = factionKeywordSelect.value;

        unitsContainer.querySelectorAll('.unit').forEach(unit => {
            const unitFactionKeyword = unit.getAttribute('data-faction-keyword');
            if (selectedKeyword === "" || unitFactionKeyword === selectedKeyword) {
                unit.style.display = 'block';
            } else {
                unit.style.display = 'none';
            }
        });
    }

    // Add event listener to the faction keyword dropdown
    const factionKeywordSelect = document.getElementById('factionKeywordSelect');
    factionKeywordSelect.addEventListener('change', filterUnitsByFactionKeyword);


    // Add this JavaScript to your existing script.js or create a new file

    document.querySelector('.album-toggle-button').addEventListener('click', function() {
        const albumSection = document.querySelector('.album-section');
        albumSection.classList.toggle('open');

        // Adjust button position to move with the tab
        if (albumSection.classList.contains('open')) {
            document.querySelector('.album-toggle-button').style.right = '320px'; // Adjust based on tab width
        } else {
            document.querySelector('.album-toggle-button').style.right = '20px';
        }
    });


    document.querySelector('.strategy-toggle-button').addEventListener('click', function() {
        const strategySection = document.querySelector('.strategy-section');
        strategySection.classList.toggle('open');

        // Adjust button position to move with the tab
        if (strategySection.classList.contains('open')) {
            document.querySelector('.strategy-toggle-button').style.right = '320px'; // Adjust based on tab width
        } else {
            document.querySelector('.strategy-toggle-button').style.right = '20px';
        }
    });

    document.getElementById('closeStrategyModal').addEventListener('click', function() {
        document.getElementById('strategyModal').style.display = 'none';
    });

    document.getElementById('strategyForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle the form submission
    });

});
