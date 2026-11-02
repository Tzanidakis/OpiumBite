(function () {
    'use strict';
    // Native multipart submission supports attachments and the provider's spam check.
    // Delivery confirmation belongs to FormSubmit; never claim success in advance.
    function prepareAttachments(form, files) {
        const error = window.OpiumAttachments.validateFiles(files);
        if (error) throw new Error(error);
        const inputs = files.map((file, index) => {
            const transfer = new DataTransfer();
            transfer.items.add(file);
            const input = document.createElement('input');
            input.type = 'file';
            input.name = 'attachment' + (index + 1);
            input.hidden = true;
            input.files = transfer.files;
            input.dataset.submissionAttachment = 'true';
            return input;
        });
        form.querySelectorAll('[data-submission-attachment]').forEach(input => input.remove());
        inputs.forEach(input => form.appendChild(input));
    }
    window.OpiumContact = { prepareAttachments };
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (form.getAttribute('aria-busy') === 'true' || !form.reportValidity()) return;
            const status = document.getElementById('contact-form-status');
            const button = form.querySelector('button[type="submit"]');
            const picker = document.getElementById('attachments');
            const tr = text => window.OpiumI18n?.t(text) || text;
            try {
                prepareAttachments(form, window.OpiumAttachments.files);
                picker.disabled = true;
                form.setAttribute('aria-busy', 'true');
                button.disabled = true;
                status.textContent = tr('Continuing to the secure submission page…');
                HTMLFormElement.prototype.submit.call(form);
            } catch (_) {
                picker.disabled = false;
                form.removeAttribute('aria-busy');
                button.disabled = false;
                status.textContent = tr('Could not prepare your message. Your text and files are still here. Please try again.');
            }
        });
        // Back from the provider must leave a usable form rather than a busy button.
        window.addEventListener('pageshow', () => {
            form.removeAttribute('aria-busy');
            form.querySelector('button[type="submit"]').disabled = false;
            document.getElementById('attachments').disabled = false;
        });
    });
})();
