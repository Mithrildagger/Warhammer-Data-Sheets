
//dictionaries for special rules, requires input is all special rules that have a value tied to them


export const specialRulesDictionary = {
    "loneOperative": {
        name: "Lone Operative",
        description: "Unless part of an Attached unit (see Leader), this unit can only be selected as the target of a ranged attack if the attacking model is within 12.",
        requiresInput: false
    },
    "stealth": {
        name: "Stealth",
        description: "If every model in a unit has this ability, then each time a ranged attack is made against it, subtract 1 from that attack’s Hit roll.",
        requiresInput: false
    },
    "feelNoPain": {
        name: "Feel No Pain",
        description: "Feel No Pain x+: Each time this model would lose a wound, roll one D6: if the result equals or exceeds ‘x’, that wound is not lost.",
        requiresInput: true
    },
    "fightsFirst": {
        name: "Fights First",
        description: "Units with this ability that are eligible to fight do so in the Fights First step, provided every model in the unit has this ability.",
        requiresInput: false
    },
    "infiltrators": {
        name: "Infiltrators",
        description: "During deployment, if every model in a unit has this ability, then when you set it up, it can be set up anywhere on the battlefield that is more than 9in horizontally away from the enemy deployment zone and all enemy models.",
        requiresInput: false
    },
    "deadlyDemise": {
        name: "Deadly Demise",
        description: "Some models have ‘Deadly Demise x’ listed in their abilities. When such a model is destroyed, roll one D6 before removing it from play (if such a model is a TRANSPORT, roll before any embarked models disembark). On a 6, each unit within 6\" of that model suffers a number of mortal wounds denoted by ‘x’ (if this is a random number, roll separately for each unit within 6\").",
        requiresInput: true
    },
    "deepStrike": {
        name: "Deep Strike",
        description: "During the Declare Battle Formations step, if every model in a unit has this ability, you can set it up in Reserves instead of setting it up on the battlefield. If you do, in the Reinforcements step of one of your Movement phases you can set up this unit anywhere on the battlefield that is more than 9\" horizontally away from all enemy models. If a unit with the Deep Strike ability arrives from Strategic Reserves, the controlling player can choose for that unit to be set up either using the rules for Strategic Reserves or using the Deep Strike ability.",
        requiresInput: false
    },
    "firingDeck": {
        name: "Firing Deck",
        description: "Some TRANSPORT models have ‘Firing Deck x’ listed in their abilities. Each time such a model is selected to shoot in the Shooting phase, you can select up to ‘x’ models embarked within it whose units have not already shot this phase. Then, for each of those embarked models, you can select one ranged weapon that embarked model is equipped with (excluding weapons with the [ONE SHOT] ability). Until that TRANSPORT model has resolved all of its attacks, it counts as being equipped with all of the weapons you selected in this way, in addition to its other weapons. Until the end of the phase, those selected models’ units are not eligible to shoot.",
        requiresInput: true
    },
    "scouts": {
        name: "Scouts",
        description: "Some units have ‘Scouts x'’ listed in their abilities. If every model in a unit has this ability, then at the start of the first battle round, before the first turn begins, it can make a Normal move of up to x\" as if it were your Movement phase – as can any DEDICATED TRANSPORT model such a unit starts the battle embarked within (provided only models with this ability are embarked within that DEDICATED TRANSPORT model). A unit that moves using this ability must end that move more than 9\" horizontally away from all enemy models. If both players have units that can do this, the player who is taking the first turn moves their units first.",
        requiresInput: true
    }
};


//TODO: weapons should also have the type of input special rules have in the form


export const weaponSpecialRulesDictionary = {
    "assault": {
        name: "Assault",
        description: "Weapons with [ASSAULT] in their profile can be shot even if the bearer’s unit Advanced. If a unit that Advanced this turn contains any models equipped with Assault weapons, it is still eligible to shoot in this turn’s Shooting phase. When such a unit is selected to shoot, you can only resolve attacks using Assault weapons its models are equipped with.",
        requiresInput: false
    },
    "rapidFire": {
        name: "Rapid Fire",
        description: "Weapons with [RAPID FIRE X] in their profile have their Attacks characteristic increased by the amount denoted by ‘X’ when targeting units within half that weapon’s range.",
        requiresInput: true
    },
    "ignoresCover": {
        name: "Ignores Cover",
        description: "Weapons with [IGNORES COVER] in their profile negate the Benefit of Cover for the target.",
        requiresInput: false
    },
    "twinLinked": {
        name: "Twin-Linked",
        description: "Weapons with [TWIN-LINKED] in their profile allow the bearer to re-roll that attack’s Wound roll.",
        requiresInput: false
    },
    "pistol": {
        name: "Pistol",
        description: "Weapons with [PISTOL] in their profile can be shot even if the bearer’s unit is within Engagement Range of enemy units, but must target one of those enemy units. Pistols cannot be shot alongside any other non-Pistol weapon (except by a Monster or Vehicle).",
        requiresInput: false
    },
    "torrent": {
        name: "Torrent",
        description: "Weapons with [TORRENT] in their profile automatically hit the target.",
        requiresInput: false
    },
    "lethalHits": {
        name: "Lethal Hits",
        description: "Weapons with [LETHAL HITS] in their profile automatically wound the target on a Critical Hit.",
        requiresInput: false
    },
    "lance": {
        name: "Lance",
        description: "Weapons with [LANCE] in their profile add 1 to the attack’s Wound roll if the bearer made a Charge move this turn.",
        requiresInput: false
    },
    "indirectFire": {
        name: "Indirect Fire",
        description: "Weapons with [INDIRECT FIRE] in their profile can target and make attacks against units that are not visible to the attacking unit. If no models are visible in a target unit when it is selected, subtract 1 from that attack’s Hit roll and the target has the Benefit of Cover against that attack.",
        requiresInput: false
    },
    "precision": {
        name: "Precision",
        description: "Weapons with [PRECISION] in their profile allow the attacking model’s player to allocate an attack to a Character model in an Attached unit if that Character model is visible to the attacking model.",
        requiresInput: false
    },
    "blast": {
        name: "Blast",
        description: "Weapons with [BLAST] in their profile add 1 to the Attacks characteristic for every five models in the target unit (rounding down). Blast weapons cannot be used to make attacks against a unit that is within Engagement Range of any units from the attacking model’s army (including its own unit).",
        requiresInput: false
    },
    "melta": {
        name: "Melta",
        description: "Weapons with [MELTA X] in their profile increase the Damage characteristic by the amount denoted by ‘X’ when targeting units within half that weapon’s range.",
        requiresInput: true
    },
    "heavy": {
        name: "Heavy",
        description: "Weapons with [HEAVY] in their profile add 1 to the Hit roll if the bearer’s unit Remained Stationary this turn.",
        requiresInput: false
    },
    "hazardous": {
        name: "Hazardous",
        description: "Weapons with [HAZARDOUS] in their profile pose a risk to the wielder. After a unit shoots or fights, roll one Hazardous test (one D6) for each Hazardous weapon used. For each 1, one model equipped with a Hazardous weapon is destroyed (Characters, Monsters, and Vehicles suffer 3 mortal wounds instead).",
        requiresInput: false
    },
    "devastatingWounds": {
        name: "Devastating Wounds",
        description: "Weapons with [DEVASTATING WOUNDS] in their profile inflict mortal wounds equal to the weapon’s Damage characteristic on a Critical Wound, ending the attack sequence.",
        requiresInput: false
    },
    "sustainedHits": {
        name: "Sustained Hits",
        description: "Weapons with [SUSTAINED HITS X] in their profile score a number of additional hits equal to ‘X’ on a Critical Hit.",
        requiresInput: true
    },
    "extraAttacks": {
        name: "Extra Attacks",
        description: "Weapons with [EXTRA ATTACKS] in their profile allow the bearer to make attacks with this weapon in addition to any other weapons they can make attacks with. The number of attacks made with an Extra Attacks weapon cannot be modified by other rules.",
        requiresInput: false
    },
    "anti": {
        name: "Anti",
        description: "Weapons with [ANTI-KEYWORD X+] in their profile score a Critical Wound on an unmodified Wound roll of ‘X+’ against targets with the matching keyword.",
        requiresInput: true
    }
};
