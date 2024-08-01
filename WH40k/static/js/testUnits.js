// testUnits.js

export const intercessor = {
  name: "intercessors",
  movement: "6",
  toughness: "4",
  save: "3",
  wounds: "2",
  invulnerableSave: "",
  leadership: "6",
  objectiveControl: "2",
  points: "100",
  unitNumber: "5",
  abilities: [
    {
      name: "Objective secured",
      description: "My objective foo",
      phase: "any ",
      effects: "If you control an objective marker at the end of your Command phase and this unit is within range of that objective marker, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn."
    }
  ],
  coreAbilities: [],
  weapons: [
    {
      name: "Bolt rifle",
      range: "24",
      type: "ASSAULT, HEAVY",
      strength: "4",
      attacks: "2",
      armorPenetration: "-1",
      damage: "1",
      weaponS: "3",
      specialRule: ""
    }
  ],
  specialRules: [],
  keywords: [
    "INFANTRY",
    "BATTLELINE",
    "GRENADES",
    "IMPERIUM",
    "TACTICUS",
    "INTERCESSOR SQUAD"
  ],
  factionKeyword: "ADEPTUS ASTARTES",
  image: "static/images/01 (1).jpg",
  albums: []
};

export const testUnit = {
  name: "Test Unit",
  movement: "6\"",
  toughness: "4",
  save: "3+",
  wounds: "10",
  leadership: "8",
  objectiveControl: "2",
  points: "100",
  unitNumber: "5",
  abilities: [
    {
      name: "Ability 1",
      description: "Description of ability 1",
      phase: "Start of Turn",
      effects: "Boost morale"
    },
    {
      name: "Ability 2",
      description: "Description of ability 2",
      phase: "Shooting Phase",
      effects: "Enhance accuracy"
    }
  ],
  coreAbilities: [
    {
      name: "Lone Operative",
      description: "Unless part of an Attached unit, this unit can only be selected as the target of a ranged attack if the attacking model is within 12\"."
    },
    {
      name: "Feel No Pain",
      description: "Each time this model would lose a wound, roll one D6: if the result equals or exceeds ‘5’, that wound is not lost."
    },
    {
      name: "Stealth",
      description: "If every model in a unit has this ability, then each time a ranged attack is made against it, subtract 1 from that attack’s Hit roll."
    }
  ],
  weapons: [
    {
      name: "Bolter",
      range: "24\"",
      type: "Rapid Fire 1",
      strength: "4",
      attacks: "1",
      armorPenetration: "-1",
      damage: "1",
      weaponS: "3",
      specialRule: "Rapid Fire: This weapon can make 2 attacks instead of 1 if the target is within half range."
    },
    {
      name: "Plasma Gun",
      range: "18\"",
      type: "Rapid Fire 1, Plasma",
      strength: "7",
      attacks: "1",
      armorPenetration: "-3",
      damage: "2",
      weaponS: "3",
      specialRule: "Overcharge: On a hit roll of 1, the bearer suffers 1 mortal wound after all of this weapon's shots have been resolved."
    }
  ],
  keywords: [
    "INFANTRY",
    "IMPERIUM",
    "MONSTER",
    "CHARACTER",
    "FLY",
    "EPIC HERO",
    "PSYKER",
    "CHAOS",
    "DAEMON",
    "BE’LAKOR"
  ],
  image: "static/images/default-unit-image.jpg",
  albums: []
};

export const deathleaper = {
  name: "Deathleaper",
  movement: "8",
  toughness: "6",
  save: "3",
  wounds: "7",
  invulnerableSave: "4",
  leadership: "7",
  objectiveControl: "1",
  points: "80",
  unitNumber: "1",
  abilities: [
    {
      name: "Feeder Tendrils",
      description: "kill char +1 CP",
      phase: "any ",
      effects: "Each time this model destroys an enemy CHARACTER model, you gain 1CP."
    },
    {
      name: "Fear of the Unseen (Aura)",
      description: "-1 ld",
      phase: "any/cmd",
      effects: "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent’s Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test."
    }
  ],
  coreAbilities: [],
  weapons: [
    {
      name: "Lictor claws and talons",
      range: "Melee",
      type: "PRECISION",
      strength: "7",
      attacks: "6",
      armorPenetration: "-2",
      damage: "2",
      weaponS: "2",
      specialRule: ""
    }
  ],
  specialRules: [
    {
      name: "Lone Operative",
      inputValue: null
    },
    {
      name: "Stealth",
      inputValue: null
    },
    {
      name: "Infiltrators",
      inputValue: null
    },
    {
      name: "Fights First",
      inputValue: null
    }
  ],
  keywords: [
    "INFANTRY",
    "CHARACTER",
    "EPIC HERO",
    "GREAT DEVOURER",
    "VANGUARD INVADER",
    "DEATHLEAPER"
  ],
  factionKeyword: "TYRANIDS",
  image: "static/images/99120106067_Deathleaper1.jpg"
};

export const defaultUnitData = [intercessor, testUnit, deathleaper];
