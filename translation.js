document.addEventListener('DOMContentLoaded', function () {
    const languageKey = 'opiumBiteLanguage';
    const greekTranslations = new Map([
        ['ABOUT US', 'ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ'],
        ['HANDCRAFTED IN CRETE', 'ΧΕΙΡΟΠΟΙΗΤΑ ΣΤΗΝ ΚΡΗΤΗ'],
        ['OUR SPECIALTY', 'Η ΕΙΔΙΚΟΤΗΤΑ ΜΑΣ'],
        ['Opium Bite was born in Heraklion, Crete, with the purpose of creating jewelry distinguished by its character and aesthetic.', 'Το Opium Bite γεννήθηκε στο Ηράκλειο της Κρήτης, με σκοπό τη δημιουργία κοσμημάτων που ξεχωρίζουν για τον χαρακτήρα και την αισθητική τους.'],
        ['Every creation is handcrafted with careful attention to detail, fit, weight, and overall quality. To us, jewelry should not simply be beautiful; it should have presence and be worn with confidence.', 'Κάθε δημιουργία κατασκευάζεται στο χέρι με ιδιαίτερη προσοχή στη λεπτομέρεια, την εφαρμογή, το βάρος και τη συνολική ποιότητα. Για εμάς, ένα κόσμημα δεν αρκεί να είναι όμορφο· πρέπει να έχει παρουσία και να φοριέται με αυτοπεποίθηση.'],
        ['Grillz are where Opium Bite began, and they remain our specialty. We do not see them as a simple accessory, but as a way to make your smile part of your personal style through a piece of jewelry made exclusively for you.', 'Τα grillz είναι το σημείο από όπου ξεκίνησε το Opium Bite και παραμένουν η ειδικότητά μας. Δεν τα βλέπουμε ως ένα απλό αξεσουάρ, αλλά ως έναν τρόπο να γίνει το χαμόγελό σας μέρος του προσωπικού σας στυλ, μέσα από ένα κόσμημα φτιαγμένο αποκλειστικά για εσάς.'],
        ['Alongside grillz, we design and create custom jewelry such as pendants, rings, and earrings, giving the same importance to quality, detail, and the individuality of every creation.', 'Παράλληλα με τα grillz, σχεδιάζουμε και δημιουργούμε εξατομικευμένα κοσμήματα, όπως μενταγιόν, δαχτυλίδια και σκουλαρίκια, δίνοντας την ίδια σημασία στην ποιότητα, τη λεπτομέρεια και τη μοναδικότητα κάθε δημιουργίας.'],
        ['Opium Bite is for people who see jewelry as an extension of their identity—for those seeking something authentic, designed around their own style and made to stand out.', 'Το Opium Bite απευθύνεται σε ανθρώπους που βλέπουν το κόσμημα ως προέκταση της ταυτότητάς τους — σε όσους αναζητούν κάτι αυθεντικό, σχεδιασμένο γύρω από το δικό τους στυλ και φτιαγμένο για να ξεχωρίζει.'],
        ["Grillz are removable pieces of jewelry worn over the teeth. They are made according to each person's mouth, dental impression, and individual style. They are not ready-made accessories, but custom pieces designed to fit correctly, feel comfortable, and give your smile a distinct identity.", 'Τα grillz είναι αφαιρούμενα κοσμήματα που φοριούνται πάνω στα δόντια. Κατασκευάζονται σύμφωνα με το στόμα, το οδοντικό αποτύπωμα και το προσωπικό στυλ κάθε ανθρώπου. Δεν είναι έτοιμα αξεσουάρ, αλλά εξατομικευμένα κομμάτια σχεδιασμένα για σωστή εφαρμογή, άνεση και ξεχωριστή ταυτότητα στο χαμόγελό σας.'],
        ['Quality metals and carefully selected stones chosen for lasting beauty.', 'Ποιοτικά μέταλλα και προσεκτικά επιλεγμένες πέτρες για ομορφιά που διαρκεί.'],
        ['Every custom piece is developed around your ideas, style, and fit.', 'Κάθε εξατομικευμένο κομμάτι δημιουργείται γύρω από τις ιδέες, το στυλ και την εφαρμογή που επιθυμείτε.'],
        ['Careful measurements and detailed finishing from concept to completion.', 'Προσεκτικές μετρήσεις και λεπτομερές φινίρισμα, από την ιδέα έως την ολοκλήρωση.'],
        ['Explore our Classic, Iced Out, and Opium grillz. Select a category to view its pieces.', 'Ανακαλύψτε τα Classic, Iced Out και Opium grillz μας. Επιλέξτε μια κατηγορία για να δείτε τα κομμάτια της.'],
        ['Timeless elegance meets urban style. Our classic grillz collection features premium materials and expert craftsmanship for a sophisticated look that never goes out of style.', 'Η διαχρονική κομψότητα συναντά το urban στυλ. Η συλλογή grillz συνδυάζει κορυφαία υλικά και εξειδικευμένη κατασκευή για μια εκλεπτυσμένη εμφάνιση που δεν φεύγει ποτέ από τη μόδα.'],
        ['Ready to create your custom grillz? Let\'s make it happen.', 'Έτοιμοι να δημιουργήσετε τα δικά σας custom grillz; Ας το κάνουμε πραγματικότητα.'],
        ['For orders, inquiries, and custom designs', 'Για παραγγελίες, ερωτήσεις και εξατομικευμένα σχέδια'],
        ['Mon-Fri: 9AM-6PM EST', 'Δευ–Παρ: 9:00–18:00'],
        ['Follow us for latest designs and updates', 'Ακολουθήστε μας για τα νεότερα σχέδια και ενημερώσεις'],
        ['Custom grillz typically take 2-3 weeks to complete from the time we receive your impressions. This includes design consultation, crafting, and quality control. Rush orders may be available for an additional fee.', 'Τα custom grillz χρειάζονται συνήθως 2–3 εβδομάδες από τη στιγμή που θα λάβουμε τα αποτυπώματά σας. Το διάστημα περιλαμβάνει τη συμβουλευτική σχεδιασμού, την κατασκευή και τον ποιοτικό έλεγχο. Ενδέχεται να διατίθεται ταχεία παραγγελία με επιπλέον χρέωση.'],
        ['We use only the highest quality materials including 10K, 14K, and 18K gold, sterling silver, and premium CZ stones. All materials are safe for oral use and hypoallergenic.', 'Χρησιμοποιούμε μόνο υλικά υψηλής ποιότητας, όπως χρυσό 10Κ, 14Κ και 18Κ, ασήμι sterling και premium πέτρες CZ. Όλα τα υλικά είναι ασφαλή για χρήση στο στόμα και υποαλλεργικά.'],
        ['We provide a dental impression kit with your order. Simply follow the included instructions, or you can visit your local dentist for professional impressions. We also offer virtual consultations.', 'Παρέχουμε κιτ οδοντικού αποτυπώματος με την παραγγελία σας. Ακολουθήστε τις οδηγίες που περιλαμβάνονται ή επισκεφθείτε τον οδοντίατρό σας για επαγγελματικά αποτυπώματα. Προσφέρουμε επίσης διαδικτυακές συμβουλευτικές συνεδρίες.'],
        ["Since all grillz are custom-made to your specifications, we don't accept returns unless there's a manufacturing defect. We offer free adjustments within 30 days if the fit isn't perfect.", 'Καθώς όλα τα grillz κατασκευάζονται σύμφωνα με τις δικές σας προδιαγραφές, δεν δεχόμαστε επιστροφές εκτός αν υπάρχει κατασκευαστικό ελάττωμα. Προσφέρουμε δωρεάν προσαρμογές εντός 30 ημερών, αν η εφαρμογή δεν είναι τέλεια.'],
        ["Yes, we ship worldwide! International shipping typically takes 5-10 business days. Customs duties and taxes may apply depending on your country's regulations.", 'Ναι, αποστέλλουμε σε όλο τον κόσμο! Η διεθνής αποστολή διαρκεί συνήθως 5–10 εργάσιμες ημέρες. Ενδέχεται να ισχύουν δασμοί και φόροι ανάλογα με τους κανονισμούς της χώρας σας.'],
        ['Prices vary depending on materials, design complexity, and number of teeth. Although we do offer an online price list, contact us for a personalized quote.', 'Οι τιμές διαφέρουν ανάλογα με τα υλικά, την πολυπλοκότητα του σχεδίου και τον αριθμό των δοντιών. Παρότι διαθέτουμε online τιμοκατάλογο, επικοινωνήστε μαζί μας για εξατομικευμένη προσφορά.'],
        ['Crete, Greece', 'Κρήτη, Ελλάδα'],
        ['Attica, Greece', 'Αττική, Ελλάδα'],
        ['Macedonia, Greece', 'Μακεδονία, Ελλάδα'],
        ['Your Experience', 'Η ΕΜΠΕΙΡΙΑ ΣΑΣ'],
        ['Professional dental impression taking • Precise measurements • Consultation with our design team • Comfortable, clinical environment', 'Επαγγελματική λήψη οδοντικού αποτυπώματος • Ακριβείς μετρήσεις • Συμβουλευτική με την ομάδα σχεδιασμού μας • Άνετο, κλινικό περιβάλλον'],
        ['We craft premium custom grillz and jewelry for those who demand excellence. Each piece is handmade with precision and care.', 'Δημιουργούμε premium custom grillz και κοσμήματα για όσους απαιτούν το καλύτερο. Κάθε κομμάτι κατασκευάζεται στο χέρι με ακρίβεια και φροντίδα.'],
        ['Premium craftsmanship tailored exactly to your style. Select your preferred options below to customize this piece to your exact measurements.', 'Premium κατασκευή προσαρμοσμένη ακριβώς στο στυλ σας. Επιλέξτε παρακάτω τις προτιμήσεις σας για να προσαρμόσετε το κομμάτι στις ακριβείς διαστάσεις σας.']
    ]);

    const translatableSelector = 'p, .product-description';

    function normalizeText(value) {
        return value.replace(/\s+/g, ' ').trim();
    }

    function registerTranslatableText() {
        document.querySelectorAll(translatableSelector).forEach(function (element) {
            if (element.children.length > 0 || element.dataset.i18nEnglish) return;
            const english = normalizeText(element.textContent);
            if (greekTranslations.has(english)) {
                element.dataset.i18nEnglish = english;
            }
        });
    }

    function readSavedLanguage() {
        try {
            return localStorage.getItem(languageKey) === 'el' ? 'el' : 'en';
        } catch (error) {
            return 'en';
        }
    }

    function saveLanguage(language) {
        try {
            localStorage.setItem(languageKey, language);
        } catch (error) {
            // Keep the current page translated if browser storage is unavailable.
        }
    }

    function applyLanguage(language) {
        registerTranslatableText();
        document.querySelectorAll('[data-i18n-english]').forEach(function (element) {
            const english = element.dataset.i18nEnglish;
            element.textContent = language === 'el' ? greekTranslations.get(english) : english;
        });

        document.documentElement.lang = language;
        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            const switchingToGreek = language === 'en';
            toggle.innerHTML = switchingToGreek
                ? '<span aria-hidden="true">🇬🇷</span><span>GR</span>'
                : '<span aria-hidden="true">🇬🇧</span><span>EN</span>';
            toggle.setAttribute('aria-label', switchingToGreek ? 'Μετάφραση στα Ελληνικά' : 'Translate to English');
            toggle.title = switchingToGreek ? 'Ελληνικά' : 'English';
        }
    }

    const icons = document.querySelector('#main-header .icons');
    if (!icons) return;

    icons.removeAttribute('aria-hidden');
    icons.querySelectorAll('.material-symbols-outlined').forEach(function (icon) {
        icon.setAttribute('aria-hidden', 'true');
    });

    const toggle = document.createElement('button');
    toggle.id = 'language-toggle';
    toggle.className = 'language-toggle';
    toggle.type = 'button';
    icons.prepend(toggle);

    let currentLanguage = readSavedLanguage();
    applyLanguage(currentLanguage);

    toggle.addEventListener('click', function () {
        currentLanguage = currentLanguage === 'en' ? 'el' : 'en';
        saveLanguage(currentLanguage);
        applyLanguage(currentLanguage);
    });
});
