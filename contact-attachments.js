(function () {
    'use strict';
    const MB = 1024 * 1024;
    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 10 * MB;
    const MAX_TOTAL_SIZE = 10 * MB;
    const allowedExtension = /\.(?:jpe?g|png|webp|gif|avif|heic|heif|bmp|tiff?|mp4|mov|m4v|webm|pdf|docx?|stl|obj|zip)$/i;
    let selected = [];

    function validateFiles(files) {
        if (files.length > MAX_FILES) return 'Choose up to 5 files.';
        if (files.some(file => !allowedExtension.test(file.name))) return 'Choose an image, video, PDF, document, 3D file or ZIP.';
        if (files.some(file => file.size === 0)) return 'Empty files cannot be attached. Choose another file.';
        if (files.some(file => file.size > MAX_FILE_SIZE)) return 'Each file must be 10 MB or smaller.';
        if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_SIZE) return 'Attachments must be 10 MB or smaller in total.';
        return '';
    }
    function base64(bytes) {
        let binary = '';
        for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
        return btoa(binary);
    }
    const wrapped = value => (value.match(/.{1,76}/g) || ['']).join('\r\n');
    const utf8 = value => new TextEncoder().encode(value);
    // Encoded headers and RFC 2231 filenames prevent line breaks or Unicode from
    // corrupting the email. Each file is a real MIME attachment, not a mailto link.
    async function createDraft({ subject, body, files }) {
        const validation = validateFiles(files);
        if (validation) throw new Error(validation);
        const boundary = 'opium-' + crypto.randomUUID();
        const cleanSubject = subject.replace(/[\r\n\0]/g, ' ');
        // Fold long RFC 2047 headers at Unicode character boundaries.
        const subjectChunks = [];
        let chunk = '';
        for (const character of cleanSubject) {
            if (utf8(chunk + character).length > 42) { subjectChunks.push(chunk); chunk = ''; }
            chunk += character;
        }
        subjectChunks.push(chunk);
        const encodedSubject = subjectChunks.map(value => '=?UTF-8?B?' + base64(utf8(value)) + '?=').join('\r\n ');
        const parts = [
            'To: opiumbite@gmail.com',
            'Subject: ' + encodedSubject,
            'X-Unsent: 1',
            'MIME-Version: 1.0',
            'Content-Type: multipart/mixed; boundary="' + boundary + '"',
            '',
            '--' + boundary,
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
            '',
            wrapped(base64(utf8(body.replace(/\r?\n/g, '\r\n'))))
        ];
        for (const file of files) {
            const bytes = new Uint8Array(await file.arrayBuffer());
            if (bytes.byteLength !== file.size) throw new Error('The selected file changed.');
            const filename = file.name.replace(/[\r\n\0]/g, '').slice(0, 180) || 'attachment';
            const type = /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/i.test(file.type) ? file.type : 'application/octet-stream';
            const encodedName = encodeURIComponent(filename).replace(/['()*]/g, char => '%' + char.charCodeAt(0).toString(16).toUpperCase());
            const nameSegments = [];
            let segment = '';
            for (const token of encodedName.match(/%[A-F0-9]{2}|./g) || []) {
                if (segment.length + token.length > 48) { nameSegments.push(segment); segment = ''; }
                segment += token;
            }
            nameSegments.push(segment);
            const filenameHeaders = nameSegments.map((value, index) =>
                ' filename*' + index + '*=' + (index === 0 ? "UTF-8''" : '') + value + (index < nameSegments.length - 1 ? ';' : ''));
            parts.push('--' + boundary, 'Content-Type: ' + type, 'Content-Transfer-Encoding: base64',
                'Content-Disposition: attachment;',
                ...filenameHeaders,
                '', wrapped(base64(bytes)));
        }
        parts.push('--' + boundary + '--', '');
        return parts.join('\r\n');
    }
    window.OpiumAttachments = { validateFiles, createDraft, get files() { return selected.slice(); } };

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
        input.addEventListener('change', () => { addFiles(input.files); input.value = ''; });
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
    });
})();
