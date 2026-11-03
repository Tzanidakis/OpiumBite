(function () {
    'use strict';
    const MB = 1024 * 1024;
    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 10 * MB;
    const MAX_TOTAL_SIZE = 10 * MB;
    const allowedExtension = /\.(?:jpe?g|png|webp|gif|avif|heic|heif|bmp|tiff?|mp4|mov|m4v|webm|pdf|docx?|stl|obj|zip)$/i;
    let selected = [];

    function validateFiles(files) {
        if (!files.length) return 'Attach at least one reference file.';
        if (files.length > MAX_FILES) return 'Choose up to 5 files.';
        if (files.some(file => !allowedExtension.test(file.name))) return 'Choose an image, video, PDF, document, 3D file or ZIP.';
        if (files.some(file => file.size === 0)) return 'Empty files cannot be attached. Choose another file.';
        if (files.some(file => file.size > MAX_FILE_SIZE)) return 'Each file must be 10 MB or smaller.';
        if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_SIZE) return 'Attachments must be 10 MB or smaller in total.';
        return '';
    }
    window.OpiumAttachments = { validateFiles, get files() { return selected.slice(); } };

    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById('attachments');
        const dropzone = document.getElementById('attachment-dropzone');
        const list = document.getElementById('attachment-list');
        const status = document.getElementById('attachment-status');
        const form = document.getElementById('contact-form');
        if (!input || !dropzone || !list || !status || !form) return;
        const tr = text => window.OpiumI18n?.t(text) || text;
        let lastError = '';
        const formatSize = size => size >= MB ? (size / MB).toFixed(1) + ' MB' : Math.max(1, Math.ceil(size / 1024)) + ' KB';
        const render = () => {
            // Keep the native required picker in sync with additions, drops and removals.
            const transfer = new DataTransfer();
            selected.forEach(file => transfer.items.add(file));
            input.files = transfer.files;
            input.setCustomValidity(tr(validateFiles(selected)));
            list.replaceChildren();
            selected.forEach((file, index) => {
                const item = document.createElement('li');
                const info = document.createElement('span');
                info.className = 'attachment-file-info';
                const name = document.createElement('strong');
                name.setAttribute('data-no-translate', '');
                name.textContent = file.name;
                const size = document.createElement('span');
                size.textContent = formatSize(file.size);
                info.append(name, size);
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'attachment-remove';
                remove.setAttribute('aria-label', tr('Remove attachment') + ': ' + file.name);
                remove.setAttribute('data-no-translate', '');
                remove.textContent = '×';
                remove.addEventListener('click', () => {
                    if (form.getAttribute('aria-busy') === 'true') return;
                    selected.splice(index, 1);
                    lastError = '';
                    render();
                    const nextButton = list.querySelectorAll('button')[Math.min(index, selected.length - 1)];
                    (nextButton || input).focus();
                });
                item.append(info, remove);
                list.append(item);
            });
            status.textContent = tr(lastError || (selected.length ? 'Files ready to send.' : ''));
            status.classList.toggle('has-error', Boolean(lastError));
            const button = form.querySelector('.submit-btn');
            button.replaceChildren(document.createTextNode(tr('Send message') + ' '));
            const arrow = document.createElement('span');
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '↗';
            button.append(arrow);
        };
        const addFiles = files => {
            if (form.getAttribute('aria-busy') === 'true') return;
            const combined = selected.slice();
            Array.from(files).forEach(file => {
                if (!combined.some(existing => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified)) combined.push(file);
            });
            lastError = validateFiles(combined);
            if (!lastError) {
                selected = combined;
                // Tell the mobile lifecycle guard that this form now has local work.
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
            render();
        };
        input.addEventListener('change', () => { addFiles(input.files); });
        input.addEventListener('invalid', () => { lastError = validateFiles(selected); render(); });
        ['dragenter', 'dragover'].forEach(event => dropzone.addEventListener(event, e => {
            e.preventDefault();
            dropzone.classList.add('is-dragging');
        }));
        dropzone.addEventListener('dragleave', e => {
            if (!dropzone.contains(e.relatedTarget)) dropzone.classList.remove('is-dragging');
        });
        dropzone.addEventListener('drop', e => {
            e.preventDefault();
            dropzone.classList.remove('is-dragging');
            addFiles(e.dataTransfer?.files || []);
        });
        form.addEventListener('reset', () => { selected = []; lastError = ''; input.value = ''; render(); });
        window.addEventListener('opiumbite:language-change', render);
        render();
    });
})();
