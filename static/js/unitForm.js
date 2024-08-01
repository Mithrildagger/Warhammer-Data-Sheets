// unitForm.js

import { addUnitToContainer } from './unitManager.js';
import { specialRulesDictionary } from './specialRulesDictionary.js'; // If needed


let abilitiesCount = 0;
let weaponsCount = 0;
let selectedRules = [];
const abilitiesContainer = document.getElementById('abilitiesContainer');
const weaponsContainer = document.getElementById('weaponsContainer');
const selectedRulesContainer = document.getElementById('selectedRulesContainer');
const unitForm = document.getElementById('unitForm');
const unitFormContainer = document.getElementById('unitFormContainer');

// Populate the dropdown with options from specialRulesDictionary
function populateSpecialRuleSelect() {
    const specialRuleSelect = document.getElementById('specialRuleSelect');
    for (const ruleKey in specialRulesDictionary) {
        if (specialRulesDictionary.hasOwnProperty(ruleKey)) {
            const rule = specialRulesDictionary[ruleKey];
            const option = document.createElement('option');
            option.value = ruleKey; // Use ruleKey as the value
            option.textContent = rule.name; // Display rule name in the dropdown
            specialRuleSelect.appendChild(option);
        }
    }
}

// Add special rule function
function addSpecialRule() {
    const select = document.getElementById("specialRuleSelect");
    const selectedOption = select.options[select.selectedIndex];

    if (selectedOption.value !== "") {
        const ruleName = selectedOption.value;
        const rule = specialRulesDictionary[ruleName];
        const selectedRule = { name: rule.name, inputValue: null };
        const ruleDiv = document.createElement("div");

        if (rule.requiresInput) {
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.name = `ruleInput_${ruleName}`;
            inputField.placeholder = `Enter value for ${rule.name}`;

            inputField.addEventListener('input', (event) => {
                selectedRule.inputValue = event.target.value;
                ruleDiv.textContent = `${rule.name} ${event.target.value}`;
            });

            ruleDiv.appendChild(inputField);
        } else {
            ruleDiv.textContent = rule.name;
        }

        selectedRules.push(selectedRule);
        selectedRulesContainer.appendChild(ruleDiv);
        select.selectedIndex = 0;
    }
}

// Add event listener to the Add Special Rule button
document.getElementById("addSpecialRuleButton").addEventListener("click", addSpecialRule);

// Add unit functionality
unitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(unitForm);
    const unitData = {
        name: formData.get('unitName'),
        movement: formData.get('unitMovement'),
        toughness: formData.get('unitToughness'),
        save: formData.get('unitSave'),
        wounds: formData.get('unitWounds'),
        invulnerableSave: formData.get('unitInvulnerableSave'),
        leadership: formData.get('unitLeadership'),
        objectiveControl: formData.get('unitObjectiveControl'),
        points: formData.get('unitPoints'),
        unitNumber: formData.get('unitNumber'),
        abilities: [],
        coreAbilities: [],
        weapons: [],
        specialRules: [],
        keywords: parseKeywords(formData.get('unitKeywords')),
        factionKeyword: formData.get('factionKeyword'),
        albums: [],
        image: null
    };

    // Add selected rules to unitData
    unitData.specialRules = selectedRules;

    // Handle image file upload (if any)
    const imageFile = formData.get('unitImageFile');
    if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        unitData.image = imageUrl;
    }

    // Add abilities to unitData
    for (let i = 0; i < abilitiesCount; i++) {
        unitData.abilities.push({
            name: formData.get(`abilityName${i}`) || formData.get(`coreAbilityName${i}`),
            description: formData.get(`abilityDescription${i}`) || formData.get(`coreAbilityDescription${i}`),
            phase: formData.get(`abilityPhase${i}`) || formData.get(`coreAbilityPhase${i}`),
            effects: formData.get(`abilityEffects${i}`) || formData.get(`coreAbilityEffects${i}`),
        });
    }

    // Add weapons to unitData
    for (let i = 0; i < weaponsCount; i++) {
        unitData.weapons.push({
            name: formData.get(`weaponName${i}`),
            range: formData.get(`weaponRange${i}`),
            type: formData.get(`weaponType${i}`),
            strength: formData.get(`weaponStrength${i}`),
            attacks: formData.get(`weaponAttacks${i}`),
            armorPenetration: formData.get(`weaponAP${i}`),
            damage: formData.get(`weaponDamage${i}`),
            weaponS: formData.get(`weaponWS${i}`),
            specialRule: formData.get(`weaponSpecialRule${i}`)
        });
    }

    // Add unitData to the container and perform necessary UI updates
    addUnitToContainer(unitData);
    unitFormContainer.style.display = 'none';

    // Clear the abilities and weapons containers
    while (abilitiesContainer.firstChild && abilitiesContainer.firstChild !== document.getElementById('addAbilityButton')) {
        abilitiesContainer.removeChild(abilitiesContainer.firstChild);
    }
    while (weaponsContainer.firstChild && weaponsContainer.firstChild !== document.getElementById('addWeaponButton')) {
        weaponsContainer.removeChild(weaponsContainer.firstChild);
    }

    abilitiesContainer.appendChild(document.getElementById('addAbilityButton'));
    weaponsContainer.appendChild(document.getElementById('addWeaponButton'));

    unitForm.reset();
    abilitiesCount = 0;
    weaponsCount = 0;

    // Reset the selectedRules array and clear the special rules UI
    selectedRules = [];
    selectedRulesContainer.innerHTML = '';
});

// Add ability button functionality
document.getElementById('addAbilityButton').addEventListener('click', () => {
    const abilityDiv = document.createElement('div');
    abilityDiv.innerHTML = `
        <label for="abilityName${abilitiesCount}">Name:</label>
        <input type="text" id="abilityName${abilitiesCount}" name="abilityName${abilitiesCount}" required>
        <label for="abilityDescription${abilitiesCount}">Description:</label>
        <input type="text" id="abilityDescription${abilitiesCount}" name="abilityDescription${abilitiesCount}" required>
        <label for="abilityPhase${abilitiesCount}">Phase:</label>
        <input type="text" id="abilityPhase${abilitiesCount}" name="abilityPhase${abilitiesCount}" required>
        <label for="abilityEffects${abilitiesCount}">Effects:</label>
        <input type="text" id="abilityEffects${abilitiesCount}" name="abilityEffects${abilitiesCount}" required><br>`;
    abilitiesContainer.insertBefore(abilityDiv, document.getElementById('addAbilityButton'));
    abilitiesCount++;
});

// Add weapon button functionality
document.getElementById('addWeaponButton').addEventListener('click', () => {
    const weaponDiv = document.createElement('div');
    weaponDiv.innerHTML = `
        <label for="weaponName${weaponsCount}">Name:</label>
        <input type="text" id="weaponName${weaponsCount}" name="weaponName${weaponsCount}" required>
        <label for="weaponRange${weaponsCount}">Range:</label>
        <input type="text" id="weaponRange${weaponsCount}" name="weaponRange${weaponsCount}" required>
        <label for="weaponType${weaponsCount}">Type(s):</label>
        <input type="text" id="weaponType${weaponsCount}" name="weaponType${weaponsCount}" required>
        <label for="weaponStrength${weaponsCount}">Strength:</label>
        <input type="number" id="weaponStrength${weaponsCount}" name="weaponStrength${weaponsCount}" required>
        <label for="weaponAttacks${weaponsCount}">Attacks:</label>
        <input type="number" id="weaponAttacks${weaponsCount}" name="weaponAttacks${weaponsCount}" required>
        <label for="weaponAP${weaponsCount}">Armor Penetration:</label>
        <input type="number" id="weaponAP${weaponsCount}" name="weaponAP${weaponsCount}" required>
        <label for="weaponDamage${weaponsCount}">Damage:</label>
        <input type="number" id="weaponDamage${weaponsCount}" name="weaponDamage${weaponsCount}" required>
        <label for="weaponWS${weaponsCount}">Weapon Skill:</label>
        <input type="number" id="weaponWS${weaponsCount}" name="weaponWS${weaponsCount}" required>
        <label for="weaponSpecialRule${weaponsCount}">Special Rule:</label>
        <input type="text" id="weaponSpecialRule${weaponsCount}" name="weaponSpecialRule${weaponsCount}" required><br>`;
    weaponsContainer.insertBefore(weaponDiv, document.getElementById('addWeaponButton'));
    weaponsCount++;
});

function parseKeywords(keywordString) {
    // Split the keywords string by commas and trim whitespace
    const keywords = keywordString.split(',').map(keyword => keyword.trim());
    return keywords;
}

// Initialize the form
populateSpecialRuleSelect();

export { populateSpecialRuleSelect, addSpecialRule };
