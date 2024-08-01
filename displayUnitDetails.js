import { specialRulesDictionary } from './specialRulesDictionary.js';

//variable that is used to keep track of the current selected unit
let currentUnitData = null;

//function that is responsible for making the unit datasheet visible to the user(aka when the unit is clicked it will show its stats)

export function displayUnitDetails(unitData) {
    currentUnitData = unitData;

    const unitNameElement = document.getElementById('unitName');
    const unitImageElement = document.getElementById('unitImage');
    const displayUnitPoints = document.getElementById('displayUnitPoints');
    const unitStatsTableBody = document.getElementById('unitStatsTableBody');
    const unitAbilitiesElement = document.getElementById('unitAbilities');
    const unitWeaponsElement = document.getElementById('unitWeapons');
    const unitSpecialRulesElement = document.getElementById('unitSpecialRules');
    const unitInvulSaveContainer = document.getElementById('unitInvulSaveContainer');
    const saveDescriptionContainer = document.getElementById('saveDescriptionContainer');
    const unitFactionKeywordsElement = document.getElementById('unitFactionKeywords');
    const unitKeywordsContainer = document.getElementById('unitKeywordsContainer');

    console.log('Displaying unit details:', unitData);


    //displays "special rules"

    unitSpecialRulesElement.innerHTML = '';

    if (unitData.specialRules && unitData.specialRules.length > 0) {
        const specialRulesList = document.createElement('ul');
        specialRulesList.classList.add('special-rules-list');

        unitData.specialRules.forEach(rule => {
            const ruleItem = document.createElement('li');
            const ruleName = rule.inputValue ? `${rule.name} ${rule.inputValue}` : rule.name;
            ruleItem.textContent = ruleName;
            ruleItem.classList.add('special-rules-bubble');

            const description = getSpecialRuleDescription(ruleName);

            ruleItem.setAttribute('data-description', description);

            specialRulesList.appendChild(ruleItem);
        });

        unitSpecialRulesElement.appendChild(specialRulesList);
    } else {
        unitSpecialRulesElement.textContent = '';
    }

    //displays unit stats

    unitStatsTableBody.innerHTML = `
        <tr>
            <td>${unitData.movement}"</td>
            <td>${unitData.toughness}</td>
            <td>${unitData.save}+</td>
            <td>${unitData.wounds}</td>
            <td>${unitData.leadership}</td>
            <td>${unitData.objectiveControl}</td>
        </tr>`;

    //display points

    displayUnitPoints.innerHTML = `<p class="points-bubble" data-description="This represents the total points cost of the unit.">Points: ${unitData.points}</p>`;

    //keywords

    const keywordsList = document.getElementById('keywordsList');
    keywordsList.innerHTML = '';

    unitData.keywords.forEach((keyword, index) => {
        const keywordSpan = document.createElement('span');
        keywordSpan.textContent = keyword;
        keywordSpan.classList.add('keyword');

        if (index < unitData.keywords.length - 1) {
            keywordSpan.textContent += ', ';
        }

        keywordsList.appendChild(keywordSpan);
    });
    //faction keyword (what faction this is part of)

    unitKeywordsContainer.innerHTML = 'Faction keywords: ' + unitData.factionKeyword;

    //abilities

    unitAbilitiesElement.innerHTML = '';
    unitData.abilities.forEach(ability => {
        const abilityDiv = document.createElement('div');
        abilityDiv.classList.add('ability');
        abilityDiv.innerHTML = `
            <p><strong>${ability.name}</strong>:<br> ${ability.effects}</p>`;
        unitAbilitiesElement.appendChild(abilityDiv);
    });

    //weapons
    //TODO: make it so that weapon "special rules" descriptions are available like in unit special rules

    unitWeaponsElement.innerHTML = '';
    unitData.weapons.forEach(weapon => {
        const weaponSection = document.createElement('div');
        weaponSection.classList.add('weapon-section');
        const header = document.createElement('div');
        header.classList.add('weapon-header');
        header.textContent = `${weapon.name} [${weapon.type}]`;
        weaponSection.appendChild(header);
        const details = document.createElement('div');
        details.classList.add('weapon-details');
        details.style.display = 'none';
        const table = document.createElement('table');
        table.classList.add('weapon-table');
        table.innerHTML = `
        <thead>
            <tr>
                <th class="tooltip-header" data-description="This represents the Range characteristic of the weapon.">Range</th>
                <th class="tooltip-header" data-description="This represents the Weapon Skill or Ballistic Skill of the weapon.">WS/BS</th>
                <th class="tooltip-header" data-description="This represents the number of attacks the weapon can make.">A</th>
                <th class="tooltip-header" data-description="This represents the weapon's strength characteristic.">S</th>
                <th class="tooltip-header" data-description="This represents the weapon's armor penetration characteristic.">AP</th>
                <th class="tooltip-header" data-description="This represents the weapon's damage characteristic.">D</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${weapon.range}</td>
                <td>${weapon.weaponS}</td>
                <td>${weapon.attacks}</td>
                <td>${weapon.strength}</td>
                <td>${weapon.armorPenetration}</td>
                <td>${weapon.damage}</td>
            </tr>
        </tbody>`;
        details.appendChild(table);
        if (weapon.specialRule) {
            const specialRuleDiv = document.createElement('div');
            specialRuleDiv.classList.add('weapon-special-rule');
            specialRuleDiv.textContent = weapon.specialRule;
            details.appendChild(specialRuleDiv);
        }
        weaponSection.appendChild(details);
        unitWeaponsElement.appendChild(weaponSection);
        header.addEventListener('click', () => {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        });
    });

    //invulnerable save (if the unit has one)

    if (unitData.invulnerableSave !== undefined && unitData.invulnerableSave !== null && unitData.invulnerableSave !== '') {
        unitInvulSaveContainer.innerHTML = `<strong class="save-bubble" data-description="This represents the invulnerable save characteristic of the unit.">Invulnerable save: ${unitData.invulnerableSave}++</strong>`;
        unitInvulSaveContainer.style.display = 'block';
    } else {
        unitInvulSaveContainer.style.display = 'none';
    }

    //image

    unitImageElement.src = unitData.image;

    const unitDetailsModal = document.getElementById('unitDetails');
    unitDetailsModal.style.display = 'block';




    //does nothing right now (sendUnitDataToServer does nothing)
    const saveUnitButton = document.getElementById('saveUnitButton');

    saveUnitButton.addEventListener('click', () => {
        console.log("sending data to server");
        console.log(unitData);
        sendUnitDataToServer(unitData);
    });

    const saveBubbles = document.querySelectorAll('save-bubble');
    saveBubbles.forEach(saveBubble => {
        saveBubble.addEventListener('mouseenter', showSaveDescription);
        saveBubble.addEventListener('mouseleave', hideSaveDescription);
    });
}

//function that retrieves the description of a rule from specialRulesDictionary.js

function getSpecialRuleDescription(ruleName) {
    const key = ruleName.replace(/\s+/g, '').charAt(0).toLowerCase() + ruleName.replace(/\s+/g, '').slice(1);

    if (specialRulesDictionary.hasOwnProperty(key)) {
        return specialRulesDictionary[key].description;
    } else {
        console.warn(`Special rule '${ruleName}' is not defined in specialRulesDictionary.`);
        return "Description not available";
    }
}

// Dummy function to represent sending data to server
function sendUnitDataToServer(unitData) {
    console.log('Data sent to server:', unitData);
}



// Export unit data to a JSON file
function exportUnitData() {
    if (currentUnitData) {
        const jsonString = JSON.stringify(currentUnitData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentUnitData.name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        console.error('No unit data to export');
    }
}

document.getElementById('exportUnitButton').addEventListener('click', exportUnitData);
