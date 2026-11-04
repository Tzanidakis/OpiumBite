(function () {
'use strict';
const products = [
  {
    "name": "OFI",
    "category": "earrings",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_first.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_above.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_exact_front_0deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_exact_left_minus35deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_exact_right_35deg_elev2.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rose_gold_first.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_above.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_exact_front_0deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_exact_left_minus35deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_exact_right_35deg_elev2.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_first.webp",
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_above.webp",
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_exact_front_0deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_exact_left_minus35deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_exact_right_35deg_elev2.webp"
      ]
    },
    "id": "earrings-ofi",
    "currency": "EUR",
    "startingPriceMinor": 5000,
    "goldPriceMinor": {
      "9": 17000,
      "14": 22000,
      "18": 32000
    },
    "teeth": null,
    "sourceFolder": "earrings/OFI",
    "priceExcludesDiamonds": false
  },
  {
    "name": "PUSSY",
    "category": "earrings",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/earrings/PUSSY/gold/earring_pair_gold_first.webp",
        "https://media.opiumbite.com/earrings/PUSSY/gold/earring_pair_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/earrings/PUSSY/rosegold/earring_pair_rose_gold_first.webp",
        "https://media.opiumbite.com/earrings/PUSSY/rosegold/earring_pair_rosegold_front.webp",
        "https://media.opiumbite.com/earrings/PUSSY/rosegold/earring_pair_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/earrings/PUSSY/silver/earring_pair_silver_first.webp",
        "https://media.opiumbite.com/earrings/PUSSY/silver/earring_pair_silver_front.webp",
        "https://media.opiumbite.com/earrings/PUSSY/silver/earring_pair_silver_left.webp",
        "https://media.opiumbite.com/earrings/PUSSY/silver/earring_pair_silver_up.webp"
      ]
    },
    "id": "earrings-pussy",
    "currency": "EUR",
    "startingPriceMinor": 5000,
    "goldPriceMinor": {
      "9": 17000,
      "14": 22000,
      "18": 32000
    },
    "teeth": null,
    "sourceFolder": "earrings/PUSSY",
    "priceExcludesDiamonds": false
  },
  {
    "name": "1 CAP",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/1%20CAP/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/1%20CAP/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/1%20CAP/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20CAP/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-classic-1-cap",
    "currency": "EUR",
    "startingPriceMinor": 9000,
    "goldPriceMinor": {
      "9": 15000,
      "14": 22000,
      "18": 30000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/1 CAP",
    "priceExcludesDiamonds": false
  },
  {
    "name": "1 WINDOW",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/gold/mouthpiece_gold_left.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/rosegold/mouthpiece_rosegold_left.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/1%20WINDOW/silver/mouthpiece_silver_left.webp"
      ]
    },
    "id": "grillz-classic-1-window",
    "currency": "EUR",
    "startingPriceMinor": 9000,
    "goldPriceMinor": {
      "9": 15000,
      "14": 22000,
      "18": 30000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/1 WINDOW",
    "priceExcludesDiamonds": false
  },
  {
    "name": "6 WINDOW",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/6%20WINDOW/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-classic-6-window",
    "currency": "EUR",
    "startingPriceMinor": 54000,
    "goldPriceMinor": {
      "9": 90000,
      "14": 132000,
      "18": 180000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/6 WINDOW",
    "priceExcludesDiamonds": false
  },
  {
    "name": "CAP x BAR",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/gold/mouthpiece_gold_left.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/rosegold/mouthpiece_rosegold_left.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/CAP%20x%20BAR/silver/mouthpiece_silver_left.webp"
      ]
    },
    "id": "grillz-classic-cap-x-bar",
    "currency": "EUR",
    "startingPriceMinor": 18000,
    "goldPriceMinor": {
      "9": 30000,
      "14": 44000,
      "18": 60000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/CAP x BAR",
    "priceExcludesDiamonds": false
  },
  {
    "name": "DOWN BAR",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/DOWN%20BAR/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-classic-down-bar",
    "currency": "EUR",
    "startingPriceMinor": 36000,
    "goldPriceMinor": {
      "9": 60000,
      "14": 88000,
      "18": 120000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/DOWN BAR",
    "priceExcludesDiamonds": false
  },
  {
    "name": "HEART",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/HEART/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/gold/mouthpiece_gold_left.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/HEART/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/rosegold/mouthpiece_rosegold_left.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/HEART/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/HEART/silver/mouthpiece_silver_left.webp"
      ]
    },
    "id": "grillz-classic-heart",
    "currency": "EUR",
    "startingPriceMinor": 18000,
    "goldPriceMinor": {
      "9": 30000,
      "14": 44000,
      "18": 60000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/HEART",
    "priceExcludesDiamonds": false
  },
  {
    "name": "ROUGH CAPS",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/ROUGH%20CAPS/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-classic-rough-caps",
    "currency": "EUR",
    "startingPriceMinor": 54000,
    "goldPriceMinor": {
      "9": 90000,
      "14": 132000,
      "18": 180000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/ROUGH CAPS",
    "priceExcludesDiamonds": false
  },
  {
    "name": "SET WINDOW x VAMBIRE",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/SET%20WINDOW%20x%20VAMBIRE/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-classic-set-window-x-vambire",
    "currency": "EUR",
    "startingPriceMinor": 36000,
    "goldPriceMinor": {
      "9": 60000,
      "14": 88000,
      "18": 120000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/SET WINDOW x VAMBIRE",
    "priceExcludesDiamonds": false
  },
  {
    "name": "WINDOW x BAR",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/gold/mouthpiece_gold_left.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/rosegold/mouthpiece_rosegold_left.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20BAR/silver/mouthpiece_silver_left.webp"
      ]
    },
    "id": "grillz-classic-window-x-bar",
    "currency": "EUR",
    "startingPriceMinor": 18000,
    "goldPriceMinor": {
      "9": 30000,
      "14": 44000,
      "18": 60000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/WINDOW x BAR",
    "priceExcludesDiamonds": false
  },
  {
    "name": "WINDOW x STAR",
    "category": "classic",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/gold/mouthpiece_gold_front.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/rosegold/mouthpiece_rosegold_left.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/classic/WINDOW%20x%20STAR/silver/mouthpiece_silver_left.webp"
      ]
    },
    "id": "grillz-classic-window-x-star",
    "currency": "EUR",
    "startingPriceMinor": 18000,
    "goldPriceMinor": {
      "9": 30000,
      "14": 44000,
      "18": 60000
    },
    "teeth": null,
    "sourceFolder": "grillz/classic/WINDOW x STAR",
    "priceExcludesDiamonds": false
  },
  {
    "name": "ICED OUT WINDOW",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/ICED%20%20WINDOW/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-iced-out-iced-out-window",
    "currency": "EUR",
    "startingPriceMinor": 9000,
    "goldPriceMinor": {
      "9": 15000,
      "14": 22000,
      "18": 30000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/ICED  WINDOW",
    "priceExcludesDiamonds": true,
    "diamondOptions": true
  },
  {
    "name": "6 CAP+",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/6%20CAP%2B/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-opium-6-cap",
    "currency": "EUR",
    "startingPriceMinor": 27000,
    "goldPriceMinor": {
      "9": 45000,
      "14": 66000,
      "18": 90000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/6 CAP+",
    "priceExcludesDiamonds": false
  },
  {
    "name": "CROSS GRILL",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/CROSS%20GRILL/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-opium-cross-grill",
    "currency": "EUR",
    "startingPriceMinor": 54000,
    "goldPriceMinor": {
      "9": 90000,
      "14": 132000,
      "18": 180000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/CROSS GRILL",
    "priceExcludesDiamonds": false
  },
  {
    "name": "FILTER CAP",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/gold/mouthpiece_gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/gold/white-dental-cast-matched-angle-v2.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/rosegold/mouthpiece_rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/rosegold/white-dental-cast-matched-angle-v2.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/silver/mouthpiece_silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/FILTER%20CAP/silver/white-dental-cast-matched-angle-v2.webp"
      ]
    },
    "id": "grillz-opium-filter-cap",
    "currency": "EUR",
    "startingPriceMinor": 27000,
    "goldPriceMinor": {
      "9": 45000,
      "14": 66000,
      "18": 90000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/FILTER CAP",
    "priceExcludesDiamonds": false
  },
  {
    "name": "FLAME x CAP",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/FLAME%20x%20CAP/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-opium-flame-x-cap",
    "currency": "EUR",
    "startingPriceMinor": 18000,
    "goldPriceMinor": {
      "9": 30000,
      "14": 44000,
      "18": 160000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/FLAME x CAP",
    "priceExcludesDiamonds": false
  },
  {
    "name": "MAK TRAIBALL",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/gold/gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/gold/mouthpiece_gold_right.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/rosegold/rosegold_right.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/silver/silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/silver/mouthpiece_silver_right.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/MAK%20TRAIBALL/TRAIBAL%202/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "grillz-opium-mak-traiball",
    "currency": "EUR",
    "startingPriceMinor": 36000,
    "goldPriceMinor": {
      "9": 60000,
      "14": 88000,
      "18": 120000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/MAK TRAIBALL",
    "priceExcludesDiamonds": false
  },
  {
    "name": "Tribal",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/gold/mouthpiece_gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/gold/mouthpiece_gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/gold/mouthpiece_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/rosegold/mouthpiece_rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/rosegold/mouthpiece_rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/rosegold/mouthpiece_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/mouthpiece_silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/mouthpiece_silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/mouthpiece_silver_right.webp"
      ]
    },
    "id": "classic-six",
    "currency": "EUR",
    "startingPriceMinor": 36000,
    "goldPriceMinor": {
      "9": 60000,
      "14": 88000,
      "18": 120000
    },
    "teeth": 6,
    "sourceFolder": "grillz/opium/TRAIBALL",
    "priceExcludesDiamonds": false
  },
  {
    "name": "PENDAL OB",
    "category": "necklaces",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/pendants/PENDAL%20OB/gold/gold_front.webp",
        "https://media.opiumbite.com/pendants/PENDAL%20OB/gold/gold_left.webp",
        "https://media.opiumbite.com/pendants/PENDAL%20OB/gold/gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/pendants/PENDAL%20OB/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/pendants/PENDAL%20OB/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/pendants/PENDAL%20OB/rosegold/rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/pendants/PENDAL%20OB/silver/silver_front.webp",
        "https://media.opiumbite.com/pendants/PENDAL%20OB/silver/silver_left.webp",
        "https://media.opiumbite.com/pendants/PENDAL%20OB/silver/silver_right.webp"
      ]
    },
    "id": "pendants-pendal-ob",
    "currency": "EUR",
    "startingPriceMinor": null,
    "goldPriceMinor": {},
    "teeth": null,
    "sourceFolder": "pendants/PENDAL OB",
    "diamondOptions": true,
    "lengthOption": true
  },
  {
    "name": "XO",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/XO/gold/gold_front.webp",
        "https://media.opiumbite.com/grillz/opium/XO/gold/gold_front_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/gold/gold_left_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/gold/gold_left.webp",
        "https://media.opiumbite.com/grillz/opium/XO/gold/gold_right_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/gold/gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/XO/rosegold/rosegold_front.webp",
        "https://media.opiumbite.com/grillz/opium/XO/rosegold/rosegold_front_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/rosegold/rosegold_left_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/rosegold/rosegold_left.webp",
        "https://media.opiumbite.com/grillz/opium/XO/rosegold/rosegold_right_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/rosegold/rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/XO/silver/silver_front.webp",
        "https://media.opiumbite.com/grillz/opium/XO/silver/silver_front_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/silver/silver_left_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/silver/silver_left.webp",
        "https://media.opiumbite.com/grillz/opium/XO/silver/silver_right_teeth.webp",
        "https://media.opiumbite.com/grillz/opium/XO/silver/silver_right.webp"
      ]
    },
    "id": "grillz-opium-xo",
    "priceExcludesDiamonds": true,
    "diamondOptions": true,
    "currency": "EUR",
    "startingPriceMinor": 54000,
    "goldPriceMinor": {
      "9": 90000,
      "14": 132000,
      "18": 180000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/XO"
  },
  {
    "name": "UZI",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/UZI/gold/uzi_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/UZI/rosegold/uzi_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/UZI/silver/uzi_silver_right.webp"
      ]
    },
    "id": "grillz-opium-uzi",
    "currency": "EUR",
    "startingPriceMinor": 36000,
    "goldPriceMinor": {
      "9": 60000,
      "14": 88000,
      "18": 120000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/UZI"
  },
  {
    "name": "SKULL",
    "category": "opium",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/grillz/opium/SKULL/gold/skull_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/grillz/opium/SKULL/rosegold/skull_rosegold_right.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/grillz/opium/SKULL/silver/skull_silver_right.webp"
      ]
    },
    "id": "grillz-opium-skull",
    "currency": "EUR",
    "startingPriceMinor": 18000,
    "goldPriceMinor": {
      "9": 30000,
      "14": 44000,
      "18": 160000
    },
    "teeth": null,
    "sourceFolder": "grillz/opium/SKULL"
  }
];
const classic = products.find(p=>p.id==='classic-six');
function selection(material,color,karat) {
 const m=['silver','gold'].includes(material)?material:'';
 return {material:m,color:m==='gold'?(['rose','white'].includes(color)?color:'yellow'):'',karat:m==='gold'?(['9','14','18'].includes(String(karat))?String(karat):'9'):''};
}
function quote(state,product=classic) { const v=selection(state.material,state.color,state.karat); return v.material==='gold'?(product.goldPriceMinor[v.karat]??null):product.startingPriceMinor; }
function gallery(state,product=classic) { const v=selection(state.material,state.color,state.karat);const metal=!v.material?'yellow':v.material==='gold'&&v.color!=='white'?v.color:'silver'; return [...(product.images[metal]||[])]; }
function image(state,product=classic) {const v=selection(state.material,state.color,state.karat);const metal=v.material==='silver'||v.color==='white'?'silver':v.color||'yellow';return product.covers?.[metal]||gallery(state,product)[0]||null;}
function asset(url) {
 if (!url) return url;
 const revision=window.OpiumImageRevisions?.[url];
 if (!revision) return url;
 const versioned=new URL(url);versioned.searchParams.set('v',revision);return versioned.href;
}
const get=id=>products.find(p=>p.id===id);
const goldPreviewIds=new Set(['grillz-classic-window-x-star','grillz-classic-down-bar','grillz-classic-1-cap','grillz-opium-cross-grill','grillz-opium-filter-cap','grillz-opium-uzi','grillz-opium-xo','earrings-pussy']);
function listing(category) {
 const result=products.filter(p=>p.category===category);
 if(category==='classic'||category==='opium')result.sort((a,b)=>{
  if(a.startingPriceMinor==null)return b.startingPriceMinor==null?0:1;
  if(b.startingPriceMinor==null)return -1;
  return a.startingPriceMinor-b.startingPriceMinor;
 });
 return result;
}
function preview(product) {return image(selection(goldPreviewIds.has(product.id)?'gold':'silver','yellow','9'),product);}
const collectionRoutes=Object.freeze({classic:'classic.html',opium:'capital-custom.html','iced-out':'iced-out.html',earrings:'earrings.html',necklaces:'necklaces.html'});
function collectionURL(category) {return Object.hasOwn(collectionRoutes,category)?collectionRoutes[category]:'grillz.html';}
window.OpiumProducts={products,classic,get,selection,quote,gallery,image,asset,listing,preview,collectionURL};
})();
