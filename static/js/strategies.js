



// let activeStrategy = null;
// let strategyCount = 0;

// function handleStrategyClick(strategyData) {
//     const { factionKeyword, keywords } = strategyData;

//     const unitContainer = document.getElementById('unitsContainer');
//     if (!unitContainer) {
//         console.error('Unit container not found.');
//         return;
//     }

//     const units = unitContainer.querySelectorAll('.unit');

//     function matchesStrategy(unit) {
//         const unitFactionKeyword = unit.getAttribute('data-faction-keyword');
//         const unitKeywords = unit.getAttribute('data-keywords').split(', ').map(keyword => keyword.trim());

//         if (factionKeyword === 'general') {
//             return keywords.some(keyword => unitKeywords.includes(keyword));
//         }

//         return (unitFactionKeyword === factionKeyword) && keywords.some(keyword => unitKeywords.includes(keyword));
//     }

//     const isActive = (activeStrategy && activeStrategy.factionKeyword === factionKeyword && activeStrategy.keywords.join(',') === keywords.join(','));

//     if (activeStrategy && !isActive) {
//         units.forEach(unit => {
//             unit.classList.remove('unit-highlighted');
//         });
//     }

//     units.forEach(unit => {
//         if (matchesStrategy(unit)) {
//             if (isActive) {
//                 unit.classList.remove('unit-highlighted');
//             } else {
//                 unit.classList.add('unit-highlighted');
//             }
//         }
//     });

//     if (isActive) {
//         activeStrategy = null;
//     } else {
//         activeStrategy = strategyData;
//     }
// }


// export function openModal(strategyModal) {
//     strategyModal.style.display = 'block';
// }

// export function addStrategyField(strategiesContainer) {
//     strategyCount++;
//     const strategyDiv = document.createElement('div');
//     strategyDiv.className = 'strategy-field';
//     strategyDiv.innerHTML = `
//         <h3>Strategy ${strategyCount}</h3>
//         <label for="strategyName${strategyCount}">Strategy Name:</label>
//         <input type="text" id="strategyName${strategyCount}" name="strategyName${strategyCount}" required><br>
//         <label for="strategyDescription${strategyCount}">Description:</label><br>
//         <textarea id="strategyDescription${strategyCount}" name="strategyDescription${strategyCount}" rows="3" cols="50" placeholder="Describe your strategy here..." required></textarea><br><br>
//         <label for="keywords${strategyCount}">Applicable Keywords:</label>
//         <input type="text" id="keywords${strategyCount}" name="keywords${strategyCount}" required><br><br>
//         <label for="cpCost${strategyCount}">CP Cost:</label>
//         <input type="number" id="cpCost${strategyCount}" name="cpCost${strategyCount}" min="0" required><br><br>
//         <label>Phase of the Game:</label><br>
//         <input type="checkbox" id="commandPhase${strategyCount}" name="phase${strategyCount}" value="commandPhase">
//         <label for="commandPhase${strategyCount}">Command Phase</label><br>
//         <input type="checkbox" id="movementPhase${strategyCount}" name="phase${strategyCount}" value="movementPhase">
//         <label for="movementPhase${strategyCount}">Movement Phase</label><br>
//         <input type="checkbox" id="shootingPhase${strategyCount}" name="phase${strategyCount}" value="shootingPhase">
//         <label for="shootingPhase${strategyCount}">Shooting Phase</label><br>
//         <input type="checkbox" id="chargePhase${strategyCount}" name="phase${strategyCount}" value="chargePhase">
//         <label for="chargePhase${strategyCount}">Charge Phase</label><br>
//         <input type="checkbox" id="fightPhase${strategyCount}" name="phase${strategyCount}" value="fightPhase">
//         <label for="fightPhase${strategyCount}">Fight Phase</label><br><br>
//         <label>Turn Type:</label><br>
//         <input type="checkbox" id="enemyTurn${strategyCount}" name="turnType${strategyCount}" value="enemyTurn">
//         <label for="enemyTurn${strategyCount}">Enemy Turn</label><br>
//         <input type="checkbox" id="friendlyTurn${strategyCount}" name="turnType${strategyCount}" value="friendlyTurn">
//         <label for="friendlyTurn${strategyCount}">Friendly Turn</label><br><br>
//     `;
//     strategiesContainer.appendChild(strategyDiv);
// }

// export function closeModal(strategyModal) {
//     strategyModal.style.display = 'none';
// }

// export function handleFormSubmission(event) {
//     event.preventDefault();
//     const strategiesContainer = document.querySelector('.strategy-scroll-container');

//     const formData = new FormData(event.target);
//     const detachmentName = formData.get('detachmentName');
//     const armyType = formData.get('armyType');
//     const armyRuleName = formData.get('armyRuleName');
//     let armyRuleDescription = formData.get('armyRuleDescription');

//     // Convert newline characters to <br> tags
//     armyRuleDescription = armyRuleDescription.replace(/\n/g, '<br>');

//     const detachmentSection = document.createElement('div');
//     detachmentSection.className = 'detachment-section';
//     detachmentSection.innerHTML = `
//         <h2 class="detachment-header">${detachmentName} (${armyType})</h2>
//         <div class="strategy-list hidden">
//             <div class="army-rule">
//                 <h3 class="army-rule-header">${armyRuleName}</h3>
//                 <div class="army-rule-details hidden">
//                     <p>${armyRuleDescription}</p>
//                 </div>
//             </div>
//         </div>
//     `;

//     const strategyList = detachmentSection.querySelector('.strategy-list');
//     const armyRuleHeader = detachmentSection.querySelector('.army-rule-header');
//     const armyRuleDetails = detachmentSection.querySelector('.army-rule-details');

//     armyRuleHeader.addEventListener('click', () => {
//         armyRuleDetails.classList.toggle('hidden');
//     });

//     for (let i = 1; i <= strategyCount; i++) {
//         const strategyName = formData.get(`strategyName${i}`);
//         const strategyDescription = formData.get(`strategyDescription${i}`);
//         const keywords = formData.get(`keywords${i}`);
//         const cpCost = formData.get(`cpCost${i}`);
//         const phases = formData.getAll(`phase${i}`);
//         const turnTypes = formData.getAll(`turnType${i}`);

//         const strategyDisplayDiv = document.createElement('div');
//         strategyDisplayDiv.className = 'strategy-display';

//         let turnTypeContent = '';
//         let phaseContent = '';

//         function camelToTitleCase(camelCaseStr) {
//             const spacedStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
//             return spacedStr.charAt(0).toUpperCase() + spacedStr.slice(1).toLowerCase();
//         }

//         const phaseLabel = phases.map(camelToTitleCase).join(', ');

//         if (turnTypes.includes('enemyTurn') && turnTypes.includes('friendlyTurn')) {
//             phaseContent = `<div class="phase-container">${phaseLabel}</div>`;
//         } else {
//             if (turnTypes.includes('enemyTurn')) {
//                 turnTypeContent += `<div class="turn-type enemy-turn">Enemy ${phaseLabel}</div>`;
//             }
//             if (turnTypes.includes('friendlyTurn')) {
//                 turnTypeContent += `<div class="turn-type friendly-turn">Friendly ${phaseLabel}</div>`;
//             }
//         }

//         let htmlContent = `
//             <div class="strategy-header">
//                 <h3>${strategyName}</h3>
//                 <div class="cp-bubble">${cpCost} CP</div>
//             </div>
//             <div class="description-container">
//                 <p><strong>Description:</strong><br>${strategyDescription.replace(/\n/g, '<br>')}</p>
//             </div>
//             <p class="keywords"><strong>Keywords:</strong> ${keywords}</p>
//         `;

//         if (phaseContent) {
//             htmlContent += phaseContent;
//         } else if (turnTypeContent) {
//             htmlContent += `<div class="turn-type-container">${turnTypeContent}</div>`;
//         }

//         strategyDisplayDiv.innerHTML = htmlContent;

//         strategyDisplayDiv.addEventListener('click', () => {
//             handleStrategyClick({
//                 factionKeyword: armyType,
//                 keywords: keywords.split(',').map(keyword => keyword.trim())
//             });
//         });

//         strategyList.appendChild(strategyDisplayDiv);
//     }

//     strategiesContainer.appendChild(detachmentSection);

//     const detachmentHeader = detachmentSection.querySelector('.detachment-header');
//     detachmentHeader.addEventListener('click', () => {
//         strategyList.classList.toggle('hidden');
//     });

//     const strategyModal = document.getElementById('strategyModal');
//     closeModal(strategyModal);

//     event.target.reset();
//     strategyCount = 0;
//     document.getElementById('strategiesContainer').innerHTML = '';
// }




// export function setupStrategyEventListeners() {
//     const strategyModal = document.getElementById('strategyModal');
//     const addStrategyButton = document.querySelector('.add-strategy-button');
//     const closeStrategyModal = document.getElementById('closeStrategyModal');
//     const addAnotherStrategyButton = document.getElementById('addStrategyButton');
//     const strategiesContainer = document.getElementById('strategiesContainer');
//     const strategyForm = document.getElementById('strategyForm');

//     addStrategyButton.addEventListener('click', () => openModal(strategyModal));
//     closeStrategyModal.addEventListener('click', () => closeModal(strategyModal));
//     addAnotherStrategyButton.addEventListener('click', () => addStrategyField(strategiesContainer));
//     strategyForm.addEventListener('submit', handleFormSubmission);
// }


let activeStrategy = null;
let strategyCount = 0;
let detachmentNames = []; // Array to store detachment names

function handleStrategyClick(strategyData) {
    const { factionKeyword, keywords } = strategyData;

    const unitContainer = document.getElementById('unitsContainer');
    if (!unitContainer) {
        console.error('Unit container not found.');
        return;
    }

    const units = unitContainer.querySelectorAll('.unit');

    function matchesStrategy(unit) {
        const unitFactionKeyword = unit.getAttribute('data-faction-keyword');
        const unitKeywords = unit.getAttribute('data-keywords').split(', ').map(keyword => keyword.trim());

        if (factionKeyword === 'general') {
            return keywords.some(keyword => unitKeywords.includes(keyword));
        }

        return (unitFactionKeyword === factionKeyword) && keywords.some(keyword => unitKeywords.includes(keyword));
    }

    const isActive = (activeStrategy && activeStrategy.factionKeyword === factionKeyword && activeStrategy.keywords.join(',') === keywords.join(','));

    if (activeStrategy && !isActive) {
        units.forEach(unit => {
            unit.classList.remove('unit-highlighted');
        });
    }

    units.forEach(unit => {
        if (matchesStrategy(unit)) {
            if (isActive) {
                unit.classList.remove('unit-highlighted');
            } else {
                unit.classList.add('unit-highlighted');
            }
        }
    });

    if (isActive) {
        activeStrategy = null;
    } else {
        activeStrategy = strategyData;
    }
}

export function openModal(strategyModal) {
    strategyModal.style.display = 'block';
}

export function addStrategyField(strategiesContainer) {
    strategyCount++;
    const strategyDiv = document.createElement('div');
    strategyDiv.className = 'strategy-field';
    strategyDiv.innerHTML = `
        <h3>Strategy ${strategyCount}</h3>
        <label for="strategyName${strategyCount}">Strategy Name:</label>
        <input type="text" id="strategyName${strategyCount}" name="strategyName${strategyCount}" required><br>
        <label for="strategyDescription${strategyCount}">Description:</label><br>
        <textarea id="strategyDescription${strategyCount}" name="strategyDescription${strategyCount}" rows="3" cols="50" placeholder="Describe your strategy here..." required></textarea><br><br>
        <label for="keywords${strategyCount}">Applicable Keywords:</label>
        <input type="text" id="keywords${strategyCount}" name="keywords${strategyCount}" required><br><br>
        <label for="cpCost${strategyCount}">CP Cost:</label>
        <input type="number" id="cpCost${strategyCount}" name="cpCost${strategyCount}" min="0" required><br><br>
        <label>Phase of the Game:</label><br>
        <input type="checkbox" id="commandPhase${strategyCount}" name="phase${strategyCount}" value="commandPhase">
        <label for="commandPhase${strategyCount}">Command Phase</label><br>
        <input type="checkbox" id="movementPhase${strategyCount}" name="phase${strategyCount}" value="movementPhase">
        <label for="movementPhase${strategyCount}">Movement Phase</label><br>
        <input type="checkbox" id="shootingPhase${strategyCount}" name="phase${strategyCount}" value="shootingPhase">
        <label for="shootingPhase${strategyCount}">Shooting Phase</label><br>
        <input type="checkbox" id="chargePhase${strategyCount}" name="phase${strategyCount}" value="chargePhase">
        <label for="chargePhase${strategyCount}">Charge Phase</label><br>
        <input type="checkbox" id="fightPhase${strategyCount}" name="phase${strategyCount}" value="fightPhase">
        <label for="fightPhase${strategyCount}">Fight Phase</label><br><br>
        <label>Turn Type:</label><br>
        <input type="checkbox" id="enemyTurn${strategyCount}" name="turnType${strategyCount}" value="enemyTurn">
        <label for="enemyTurn${strategyCount}">Enemy Turn</label><br>
        <input type="checkbox" id="friendlyTurn${strategyCount}" name="turnType${strategyCount}" value="friendlyTurn">
        <label for="friendlyTurn${strategyCount}">Friendly Turn</label><br><br>
    `;
    strategiesContainer.appendChild(strategyDiv);
}

export function closeModal(strategyModal) {
    strategyModal.style.display = 'none';
}

export function handleFormSubmission(event) {
    event.preventDefault();
    const strategiesContainer = document.querySelector('.strategy-scroll-container');

    const formData = new FormData(event.target);
    const detachmentName = formData.get('detachmentName');
    const armyType = formData.get('armyType');
    const armyRuleName = formData.get('armyRuleName');
    let armyRuleDescription = formData.get('armyRuleDescription');

    // Convert newline characters to <br> tags
    armyRuleDescription = armyRuleDescription.replace(/\n/g, '<br>');

    const detachmentSection = document.createElement('div');
    detachmentSection.className = 'detachment-section';
    detachmentSection.innerHTML = `
        <h2 class="detachment-header">${detachmentName} (${armyType})</h2>
        <div class="strategy-list hidden">
            <div class="army-rule">
                <h3 class="army-rule-header">${armyRuleName}</h3>
                <div class="army-rule-details hidden">
                    <p>${armyRuleDescription}</p>
                </div>
            </div>
        </div>
    `;

    const strategyList = detachmentSection.querySelector('.strategy-list');
    const armyRuleHeader = detachmentSection.querySelector('.army-rule-header');
    const armyRuleDetails = detachmentSection.querySelector('.army-rule-details');

    armyRuleHeader.addEventListener('click', () => {
        armyRuleDetails.classList.toggle('hidden');
    });

    for (let i = 1; i <= strategyCount; i++) {
        const strategyName = formData.get(`strategyName${i}`);
        const strategyDescription = formData.get(`strategyDescription${i}`);
        const keywords = formData.get(`keywords${i}`);
        const cpCost = formData.get(`cpCost${i}`);
        const phases = formData.getAll(`phase${i}`);
        const turnTypes = formData.getAll(`turnType${i}`);

        const strategyDisplayDiv = document.createElement('div');
        strategyDisplayDiv.className = 'strategy-display';

        let turnTypeContent = '';
        let phaseContent = '';

        function camelToTitleCase(camelCaseStr) {
            const spacedStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
            return spacedStr.charAt(0).toUpperCase() + spacedStr.slice(1).toLowerCase();
        }

        const phaseLabel = phases.map(camelToTitleCase).join(', ');

        if (turnTypes.includes('enemyTurn') && turnTypes.includes('friendlyTurn')) {
            phaseContent = `<div class="phase-container">${phaseLabel}</div>`;
        } else {
            if (turnTypes.includes('enemyTurn')) {
                turnTypeContent += `<div class="turn-type enemy-turn">Enemy ${phaseLabel}</div>`;
            }
            if (turnTypes.includes('friendlyTurn')) {
                turnTypeContent += `<div class="turn-type friendly-turn">Friendly ${phaseLabel}</div>`;
            }
        }

        let htmlContent = `
            <div class="strategy-header">
                <h3>${strategyName}</h3>
                <div class="cp-bubble">${cpCost} CP</div>
            </div>
            <div class="description-container">
                <p><strong>Description:</strong><br>${strategyDescription.replace(/\n/g, '<br>')}</p>
            </div>
            <p class="keywords"><strong>Keywords:</strong> ${keywords}</p>
        `;

        if (phaseContent) {
            htmlContent += phaseContent;
        } else if (turnTypeContent) {
            htmlContent += `<div class="turn-type-container">${turnTypeContent}</div>`;
        }

        strategyDisplayDiv.innerHTML = htmlContent;

        strategyDisplayDiv.addEventListener('click', () => {
            handleStrategyClick({
                factionKeyword: armyType,
                keywords: keywords.split(',').map(keyword => keyword.trim())
            });
        });

        strategyList.appendChild(strategyDisplayDiv);
    }

    strategiesContainer.appendChild(detachmentSection);

    // Add detachment name to the array
    detachmentNames.push(detachmentName);

    const detachmentHeader = detachmentSection.querySelector('.detachment-header');
    detachmentHeader.addEventListener('click', () => {
        strategyList.classList.toggle('hidden');
    });

    const strategyModal = document.getElementById('strategyModal');
    closeModal(strategyModal);

    event.target.reset();
    strategyCount = 0;
    document.getElementById('strategiesContainer').innerHTML = '';
    console.log(detachmentNames)
}

export function setupStrategyEventListeners() {
    const strategyModal = document.getElementById('strategyModal');
    const addStrategyButton = document.querySelector('.add-strategy-button');
    const closeStrategyModal = document.getElementById('closeStrategyModal');
    const addAnotherStrategyButton = document.getElementById('addStrategyButton');
    const strategiesContainer = document.getElementById('strategiesContainer');
    const strategyForm = document.getElementById('strategyForm');

    addStrategyButton.addEventListener('click', () => openModal(strategyModal));
    closeStrategyModal.addEventListener('click', () => closeModal(strategyModal));
    addAnotherStrategyButton.addEventListener('click', () => addStrategyField(strategiesContainer));
    strategyForm.addEventListener('submit', handleFormSubmission);
}

// Export detachmentNames for use in another file
export { detachmentNames };
