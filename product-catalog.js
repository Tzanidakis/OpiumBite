(function () {
'use strict';
const products = [
  {
    "name": "OFI",
    "category": "earrings",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_exact_front_0deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_above.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_exact_left_minus35deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_exact_right_35deg_elev2.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_exact_front_0deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_above.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_exact_left_minus35deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/rosegold/earring_pair_rosegold_exact_right_35deg_elev2.webp"
      ],
      "silver": [
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_exact_front_0deg_elev2.webp",
        "https://media.opiumbite.com/earrings/OFI/silver/earring_pair_silver_above.webp",
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
    "priceExcludesDiamonds": false,
    "description": "The OFI earrings pair textured lettering with a serpent motif. View the front and side angles in silver or gold.",
    "descriptionEl": "Τα σκουλαρίκια OFI συνδυάζουν ανάγλυφα γράμματα με μοτίβο φιδιού. Δες τα από μπροστά και στο πλάι σε ασήμι ή χρυσό."
  },
  {
    "name": "PUSSY",
    "category": "earrings",
    "images": {
      "yellow": [
        "https://media.opiumbite.com/earrings/PUSSY/gold/earrings-gold-v2.webp",
        "https://media.opiumbite.com/earrings/PUSSY/gold/earring_pair_gold_right.webp"
      ],
      "rose": [
        "https://media.opiumbite.com/earrings/PUSSY/rosegold/earrings-rosegold-v2.webp",
        "https://media.opiumbite.com/earrings/PUSSY/rosegold/earring_pair_rosegold_front.webp",
        "https://media.opiumbite.com/earrings/PUSSY/rosegold/earring_pair_rosegold_right.webp"
      ],
      "silver": [
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
    "priceExcludesDiamonds": false,
    "description": "These sculptural stud earrings feature a hand motif. Browse photos in silver, yellow gold and rose gold.",
    "descriptionEl": "Αυτά τα γλυπτά καρφωτά σκουλαρίκια έχουν μοτίβο χεριού. Δες φωτογραφίες σε ασήμι, κίτρινο και ροζ χρυσό."
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
    "priceExcludesDiamonds": false,
    "description": "A single fitted tooth cap with a solid surface. Choose silver or gold for your custom fit.",
    "descriptionEl": "Ένα καπάκι με ενιαία επιφάνεια για ένα δόντι. Επίλεξε ασήμι ή χρυσό για τη δική σου εφαρμογή."
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
    "priceExcludesDiamonds": false,
    "description": "A single open-frame grill that leaves part of the tooth visible. Compare the silver and gold finishes.",
    "descriptionEl": "Ένα grill με ανοιχτό πλαίσιο που αφήνει μέρος του δοντιού ορατό. Σύγκρινε τις επιλογές σε ασήμι και χρυσό."
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
    "priceExcludesDiamonds": false,
    "description": "A six-tooth grill with open frames that show the teeth beneath. View the design in silver and gold.",
    "descriptionEl": "Ένα grill έξι δοντιών με ανοιχτά πλαίσια που αφήνουν τα δόντια ορατά. Δες το σχέδιο σε ασήμι και χρυσό."
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
    "priceExcludesDiamonds": false,
    "description": "A fitted cap paired with a bar for a mix of solid coverage and open space. Compare the available metals.",
    "descriptionEl": "Ένα καπάκι μαζί με μπάρα, με καλυμμένα και ανοιχτά σημεία. Σύγκρινε τα διαθέσιμα μέταλλα."
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
    "priceExcludesDiamonds": false,
    "description": "A bar designed for the lower teeth. See how its shape looks on the dental cast and compare silver and gold.",
    "descriptionEl": "Μια μπάρα σχεδιασμένη για τα κάτω δόντια. Δες το σχήμα της στο οδοντικό εκμαγείο και σύγκρινε ασήμι και χρυσό."
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
    "priceExcludesDiamonds": false,
    "description": "A custom grill with a heart motif. Browse the material photos to see how the design sits on the tooth.",
    "descriptionEl": "Ένα custom grill με μοτίβο καρδιάς. Δες τις φωτογραφίες για να δεις πώς εφαρμόζει το σχέδιο στο δόντι."
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
    "priceExcludesDiamonds": false,
    "description": "Fitted caps with an irregular, textured surface. Compare the details across silver and gold photos.",
    "descriptionEl": "Καπάκια με ακανόνιστη, ανάγλυφη επιφάνεια. Σύγκρινε τις λεπτομέρειες στις φωτογραφίες σε ασήμι και χρυσό."
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
    "priceExcludesDiamonds": false,
    "description": "A set combining an open window with a pointed fang. Browse the close-ups and dental cast views for each finish.",
    "descriptionEl": "Ένα σετ που συνδυάζει ανοιχτό πλαίσιο και μυτερό κυνόδοντα. Δες τις κοντινές φωτογραφίες και τα εκμαγεία για κάθε φινίρισμα."
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
    "priceExcludesDiamonds": false,
    "description": "An open window paired with a bar. Browse the silver and gold views to see how the two elements sit together.",
    "descriptionEl": "Ένα ανοιχτό πλαίσιο σε συνδυασμό με μπάρα. Δες σε ασήμι και χρυσό πώς ταιριάζουν τα δύο στοιχεία."
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
    "priceExcludesDiamonds": false,
    "description": "This design combines an open window and a star motif. Compare the silver and gold photos before enquiring.",
    "descriptionEl": "Το σχέδιο συνδυάζει ανοιχτό πλαίσιο και μοτίβο αστεριού. Σύγκρινε τις φωτογραφίες σε ασήμι και χρυσό πριν επικοινωνήσεις."
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
    "diamondOptions": true,
    "description": "An open-frame grill with a choice of stones. The starting price covers the metalwork, and stones are quoted separately.",
    "descriptionEl": "Ένα grill με ανοιχτό πλαίσιο και επιλογή πετρών. Η τιμή εκκίνησης καλύπτει τη μεταλλική κατασκευή. Οι πέτρες κοστολογούνται ξεχωριστά."
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
    "priceExcludesDiamonds": false,
    "description": "An Opium design spanning six teeth. Browse the standalone and dental cast photos to see its profile.",
    "descriptionEl": "Ένα σχέδιο Opium για έξι δόντια. Δες το προφίλ του στις φωτογραφίες του κοσμήματος και του εκμαγείου."
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
    "priceExcludesDiamonds": false,
    "description": "A sculptural grill with a prominent cross motif. View the form and details in silver and gold.",
    "descriptionEl": "Ένα γλυπτό grill με έντονο μοτίβο σταυρού. Δες τη μορφή και τις λεπτομέρειες σε ασήμι και χρυσό."
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
    "priceExcludesDiamonds": false,
    "description": "A two-tooth cap with a raised emblem beside a smooth cap. Compare the standalone photo with the fitted cast view.",
    "descriptionEl": "Ένα καπάκι δύο δοντιών με ανάγλυφο έμβλημα δίπλα σε λεία επιφάνεια. Σύγκρινε τις φωτογραφίες με και χωρίς εκμαγείο."
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
    "priceExcludesDiamonds": false,
    "description": "A flame motif paired with a fitted cap. Compare the silver and gold views to see the outline and fit.",
    "descriptionEl": "Ένα μοτίβο φλόγας μαζί με καπάκι. Σύγκρινε τις φωτογραφίες σε ασήμι και χρυσό για να δεις το περίγραμμα και την εφαρμογή."
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
    "priceExcludesDiamonds": false,
    "description": "A sculptural design from the Opium collection. The gallery includes different Tribal configurations and dental cast views.",
    "descriptionEl": "Ένα γλυπτό σχέδιο της συλλογής Opium. Η συλλογή φωτογραφιών περιλαμβάνει διαφορετικές εκδοχές Tribal και όψεις σε εκμαγείο."
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
    "priceExcludesDiamonds": false,
    "description": "A six-tooth Opium grill with a sculpted Tribal pattern. View the shape on the dental cast in silver or gold.",
    "descriptionEl": "Ένα grill έξι δοντιών της συλλογής Opium με γλυπτό μοτίβο Tribal. Δες το σχήμα στο εκμαγείο σε ασήμι ή χρυσό."
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
    "lengthOption": true,
    "description": "The PENDAL OB pendant features the Opium Bite design. Choose the metal, stone and preferred length for your quote.",
    "descriptionEl": "Το μενταγιόν PENDAL OB φέρει το σχέδιο Opium Bite. Επίλεξε μέταλλο, πέτρα και μήκος για την προσφορά σου."
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
    "sourceFolder": "grillz/opium/XO",
    "description": "Repeating XO motifs run across a sculpted bar. Choose the metal and stone for your quote. Stones are priced separately.",
    "descriptionEl": "Επαναλαμβανόμενα μοτίβα XO διατρέχουν μια γλυπτή μπάρα. Επίλεξε μέταλλο και πέτρα για την προσφορά σου. Οι πέτρες κοστολογούνται ξεχωριστά."
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
    "sourceFolder": "grillz/opium/UZI",
    "description": "Miniature UZI motifs sit on fitted tooth caps. View the design on a dental cast in silver, yellow gold and rose gold.",
    "descriptionEl": "Μικρά μοτίβα UZI τοποθετούνται σε καπάκια δοντιών. Δες το σχέδιο σε εκμαγείο, σε ασήμι, κίτρινο ή ροζ χρυσό."
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
    "sourceFolder": "grillz/opium/SKULL",
    "description": "A sculpted skull sits on a fitted single-tooth cap. The dental cast photos show its scale and placement.",
    "descriptionEl": "Ένα γλυπτό κρανίο κοσμεί καπάκι για ένα δόντι. Οι φωτογραφίες του εκμαγείου δείχνουν το μέγεθος και τη θέση του."
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
function productPath(product) { return '/products/' + encodeURIComponent(product.id) + '/'; }
function productTitle(product) {
 const type = {earrings:'earrings',necklaces:'pendant'}[product.category] ?? 'custom grillz';
 return product.name + ' ' + type + ' | Opium Bite';
}
window.OpiumProducts={products,classic,get,selection,quote,gallery,image,asset,listing,preview,collectionURL,productPath,productTitle};
})();
