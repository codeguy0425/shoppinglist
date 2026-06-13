    // ── i18n ──
    const i18n = {
        en: {
            title: "Shopping List",
            appTitle: "Shopping List",
            appDesc: "Keep track of your shopping",
            listName: "List Name",
            listNamePlaceholder: "e.g. Grocery, Tech",
            itemName: "Item",
            itemPlaceholder: "e.g. Milk",
            price: "Price ($)",
            quantity: "Qty",
            addToList: "Add to List",
            item: "Item",
            qtyCol: "Qty",
            totalCol: "Total",
            empty: "Empty",
            emptyMsg: "No lists yet",
            emptySub: "Start by adding an item above!",
            deleteList: "Delete",
            deleteConfirm: 'Delete the entire "{{name}}" list?',
            alertFill: "Please fill in all fields correctly.",
            grandTotal: "Total: ${{amount}}",
            edit: "Edit",
            save: "Save",
            cancel: "Cancel",
            rename: "Rename",
            renamePlaceholder: "New list name",
            export: "Export",
            import: "Import",
            filterPlaceholder: "Search lists or items…",
            itemAdded: "Item added!",
            itemDeleted: "Item deleted",
            listDeleted: "List deleted",
            imported: "Data imported!",
            exportError: "No data to export",
            importError: "Invalid file",
            renameDone: "List renamed",
            addItems: "Add Items",
            shoppingModeOn: "Shopping mode is on",
            exitShoppingMode: "Exit",
            voiceBtn: "",
            voiceListening: "Listening…",
            voiceHint: 'Say "milk 3.50 2" or just the item name',
            voiceHintZh: '說「牛奶 3.5 2」或只說商品名稱',
            voiceError: "Voice not supported in this browser",
            voiceParsed: 'Added "{{name}}" via voice!',
        },
        zh: {
            title: "購物清單",
            appTitle: "購物清單",
            appDesc: "輕鬆管理您的採購項目",
            listName: "清單名稱",
            listNamePlaceholder: "例如：生鮮、3C",
            itemName: "商品",
            itemPlaceholder: "例如：牛奶",
            price: "價格 ($)",
            quantity: "數量",
            addToList: "加入清單",
            item: "項目",
            qtyCol: "數量",
            totalCol: "小計",
            empty: "無項目",
            emptyMsg: "尚無任何清單",
            emptySub: "請在上方新增項目！",
            deleteList: "刪除",
            deleteConfirm: '確定刪除「{{name}}」清單？',
            alertFill: "請正確填寫所有欄位。",
            grandTotal: "總計：${{amount}}",
            edit: "編輯",
            save: "儲存",
            cancel: "取消",
            rename: "重新命名",
            renamePlaceholder: "新清單名稱",
            export: "匯出",
            import: "匯入",
            filterPlaceholder: "搜尋清單或項目…",
            itemAdded: "已加入項目！",
            itemDeleted: "已刪除項目",
            listDeleted: "已刪除清單",
            imported: "資料已匯入！",
            exportError: "沒有資料可匯出",
            importError: "檔案格式錯誤",
            renameDone: "清單已重新命名",
            addItems: "新增項目",
            shoppingModeOn: "購物模式已啟用",
            exitShoppingMode: "結束",
            voiceBtn: "",
            voiceListening: "聆聽中…",
            voiceHint: '說「牛奶 3.5 2」或只說商品名稱',
            voiceHintZh: '說「牛奶 3.5 2」或只說商品名稱',
            voiceError: "此瀏覽器不支援語音輸入",
            voiceParsed: '已透過語音加入「{{name}}」！',
        }
    };

    let lang = localStorage.getItem('shopping_lang') || 'en';

    function t(key, vars = {}) {
        let str = i18n[lang][key];
        if (!str) { const el = document.querySelector(`[data-i18n="${key}"]`); str = el ? el.textContent : key; }
        for (const [k, v] of Object.entries(vars)) str = str.replace(`{{${k}}}`, v);
        return str;
    }

    function applyLang() {
        document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
        document.getElementById('langLabel').textContent = lang === 'zh' ? '中文' : 'EN';
        document.title = t('title');
        document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        const hint = document.getElementById('voiceHint');
        if (hint && !isRecording) hint.textContent = lang === 'zh' ? t('voiceHintZh') : t('voiceHint');
        filterLists();
        render();
    }

    document.getElementById('langToggle').addEventListener('click', () => {
        lang = lang === 'en' ? 'zh' : 'en';
        localStorage.setItem('shopping_lang', lang);
        applyLang();
    });

    // ── Theme (Dark Mode) ──
    function initTheme() {
        const saved = localStorage.getItem('shopping_theme');
        if (saved) { document.documentElement.setAttribute('data-theme', saved); return; }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        updateThemeIcon();
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? null : 'dark';
        if (next) document.documentElement.setAttribute('data-theme', next);
        else document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('shopping_theme', next || '');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.getElementById('themeIcon').innerHTML = isDark
            ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
            : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }

    // ── Collapsible Input ──
    let inputCollapsed = localStorage.getItem('shopping_input_collapsed') !== 'false';

    function toggleInput() {
        inputCollapsed = !inputCollapsed;
        localStorage.setItem('shopping_input_collapsed', inputCollapsed);
        applyInputState();
    }

    function applyInputState() {
        const wrap = document.getElementById('inputWrap');
        const fab = document.getElementById('fab');
        const toggle = document.getElementById('collapseToggle');
        if (!wrap) return;
        if (inputCollapsed) {
            wrap.classList.add('collapsed');
            fab.classList.add('visible');
            if (toggle) toggle.classList.add('collapsed');
        } else {
            wrap.classList.remove('collapsed');
            fab.classList.remove('visible');
            if (toggle) toggle.classList.remove('collapsed');
        }
    }

    // ── Shopping Mode ──
    let shoppingMode = localStorage.getItem('shopping_mode') === 'true';

    function toggleShoppingMode() {
        shoppingMode = !shoppingMode;
        localStorage.setItem('shopping_mode', shoppingMode);
        applyShoppingMode();
    }

    function applyShoppingMode() {
        document.body.classList.toggle('shopping-mode', shoppingMode);
    }

    // ── Toast ──
    function showToast(msg, type = '') {
        const container = document.getElementById('toastContainer');
        const el = document.createElement('div');
        el.className = 'toast' + (type ? ' ' + type : '');
        el.textContent = msg;
        container.appendChild(el);
        setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 2000);
    }

    // ── Data ──
    let shoppingData = JSON.parse(localStorage.getItem('shopping_data')) || {};

    // ── Enter key ──
    document.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const active = document.activeElement;
            const inputs = ['listName','itemName','itemPrice','itemQty'];
            if (active && inputs.includes(active.id)) addItem();
        }
    });

    // ── Voice Input ──
    let recognition = null;
    let isRecording = false;

    function toggleVoice() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { showToast(t('voiceError'), 'error'); return; }

        if (isRecording) { stopVoice(); return; }

        recognition = new SpeechRecognition();
        recognition.lang = lang === 'zh' ? 'zh-TW' : 'en-US';
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;

        const btn = document.getElementById('voiceBtn');
        const hint = document.getElementById('voiceHint');

        recognition.onstart = () => {
            isRecording = true;
            btn.classList.add('recording');
            btn.textContent = '⏹';
            hint.textContent = t('voiceListening');
            hint.className = 'voice-hint listening';
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript.trim().toLowerCase();
            parseVoice(transcript);
            stopVoice();
        };

        recognition.onerror = () => { stopVoice(); showToast(t('voiceError'), 'error'); };
        recognition.onend = () => { if (isRecording) stopVoice(); };

        recognition.start();
    }

    function stopVoice() {
        if (recognition) { try { recognition.abort(); } catch {} recognition = null; }
        isRecording = false;
        const btn = document.getElementById('voiceBtn');
        btn.classList.remove('recording');
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
        const hint = document.getElementById('voiceHint');
        hint.textContent = lang === 'zh' ? t('voiceHintZh') : t('voiceHint');
        hint.className = 'voice-hint';
    }

    function parseVoice(text) {
        const nameInput = document.getElementById('itemName');
        const priceInput = document.getElementById('itemPrice');
        const qtyInput = document.getElementById('itemQty');

        let name = text;
        let price = NaN;
        let qty = NaN;

        const patterns = [
            /(\d+\.?\d*)\s*(?:dollar|dollars|\$|price|for|at)\s*(?:and\s*)?(\d{1,2})?\s*(?:cent|cents)?/i,
            /(\d+\.?\d*)\s*(?:dollar|dollars|\$|price|for|at)/i,
            /(?:price|for|at)\s*(\d+\.?\d*)/i,
        ];

        for (const p of patterns) {
            const m = text.match(p);
            if (m) {
                price = parseFloat(m[1]);
                if (m[2] && m[1].indexOf('.') === -1) price = parseFloat(m[1]) + parseFloat(m[2]) / 100;
                name = name.replace(m[0], '').trim();
                break;
            }
        }

        const qtyMatch = name.match(/(?:^|\s)(\d+)\s*(?:x|qty|quantity|items?)\s*$/i);
        if (qtyMatch) {
            qty = parseInt(qtyMatch[1]);
            name = name.replace(qtyMatch[0], '').trim();
        }

        const numMatch = name.match(/(?:^|\s+)(\d+\.?\d*)\s*$/);
        if (numMatch && isNaN(price)) {
            price = parseFloat(numMatch[1]);
            name = name.replace(numMatch[0], '').trim();
        }

        if (!name) return;

        nameInput.value = name.charAt(0).toUpperCase() + name.slice(1);
        if (!isNaN(price) && price >= 0) priceInput.value = price.toFixed(2);
        if (!isNaN(qty) && qty >= 1) qtyInput.value = qty;

        showToast(t('voiceParsed', { name: nameInput.value }), 'success');
        addItem();
    }

    // ── Add Item ──
    function addItem() {
        const listNameInput = document.getElementById('listName').value.trim();
        const itemName = document.getElementById('itemName').value.trim();
        const price = parseFloat(document.getElementById('itemPrice').value);
        const qty = parseInt(document.getElementById('itemQty').value) || 1;

        if (!listNameInput || !itemName || isNaN(price) || price < 0) {
            showToast(t('alertFill'), 'error');
            return;
        }

        if (!shoppingData[listNameInput]) shoppingData[listNameInput] = [];

        shoppingData[listNameInput].push({ id: Date.now(), name: itemName, price, qty, checked: false });

        saveAndRender();
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemQty').value = '1';
        document.getElementById('itemName').focus();
        showToast(t('itemAdded'), 'success');
    }

    // ── Edit Item ──
    function editItem(listName, itemId) {
        const list = shoppingData[listName];
        const idx = list.findIndex(i => i.id === itemId);
        if (idx === -1) return;

        const card = document.querySelector(`[data-list="${CSS.escape(listName)}"]`);
        if (!card) return;
        const row = card.querySelector(`[data-item-id="${itemId}"]`);
        if (!row) return;

        const item = list[idx];
        row.innerHTML = `
            <td style="text-align:center"><button class="del-item-btn" onclick="cancelEdit('${listName}',${itemId})" title="${t('cancel')}">✕</button></td>
            <td><input type="text" class="edit-name" value="${item.name.replace(/"/g,'&quot;')}" style="width:100%"></td>
            <td style="text-align:center"><input type="number" class="edit-qty" value="${item.qty}" min="1" style="width:100%;text-align:center"></td>
            <td style="text-align:right"><input type="number" class="edit-price" value="${item.price}" step="0.01" min="0" style="width:100%;text-align:right"></td>
            <td style="text-align:center"><button class="edit-item-btn" onclick="saveItem('${listName}',${itemId})" title="${t('save')}">✓</button></td>
            <td></td>
        `;
    }

    function saveItem(listName, itemId) {
        const card = document.querySelector(`[data-list="${CSS.escape(listName)}"]`);
        if (!card) return;
        const row = card.querySelector(`[data-item-id="${itemId}"]`);
        if (!row) return;

        const name = row.querySelector('.edit-name').value.trim();
        const qty = parseInt(row.querySelector('.edit-qty').value) || 1;
        const price = parseFloat(row.querySelector('.edit-price').value);

        const list = shoppingData[listName];
        const idx = list.findIndex(i => i.id === itemId);
        if (idx === -1 || !name || isNaN(price)) { showToast(t('alertFill'), 'error'); return; }

        list[idx].name = name;
        list[idx].qty = qty;
        list[idx].price = price;
        saveAndRender();
        showToast(t('itemAdded'), 'success');
    }

    function cancelEdit(listName, itemId) {
        const card = document.querySelector(`[data-list="${CSS.escape(listName)}"]`);
        if (!card) return;
        const row = card.querySelector(`[data-item-id="${itemId}"]`);
        if (row) row.remove();
        render();
    }

    // ── Toggle Check ──
    function toggleCheck(listName, itemId) {
        const list = shoppingData[listName];
        const item = list.find(i => i.id === itemId);
        if (item) { item.checked = !item.checked; saveAndRender(); }
    }

    // ── Delete Item ──
    function deleteItem(listName, itemId) {
        shoppingData[listName] = shoppingData[listName].filter(i => i.id !== itemId);
        saveAndRender();
        showToast(t('itemDeleted'));
    }

    // ── Delete List ──
    function deleteList(listName) {
        if (confirm(t('deleteConfirm', { name: listName }))) {
            delete shoppingData[listName];
            saveAndRender();
            showToast(t('listDeleted'));
        }
    }

    // ── Rename List ──
    function startRename(listName) {
        const card = document.querySelector(`[data-list="${CSS.escape(listName)}"]`);
        if (!card) return;
        const titleWrap = card.querySelector('.list-title-wrap');
        const h3 = titleWrap.querySelector('h3');
        const existingInput = titleWrap.querySelector('input');
        if (existingInput) return;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = listName;
        input.placeholder = t('renamePlaceholder');
        input.dataset.orig = listName;
        h3.replaceWith(input);
        input.focus();
        input.select();

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') confirmRename(listName);
            if (e.key === 'Escape') cancelRename(listName);
        });
        input.addEventListener('blur', () => confirmRename(listName));

        const renameBtn = card.querySelector('.rename-btn');
        if (renameBtn) renameBtn.style.display = 'none';
    }

    function confirmRename(listName) {
        const card = document.querySelector(`[data-list="${CSS.escape(listName)}"]`);
        if (!card) return;
        const input = card.querySelector('.list-title-wrap input');
        if (!input) return;
        const newName = input.value.trim();
        if (!newName || newName === listName) { cancelRename(listName); return; }

        shoppingData[newName] = shoppingData[listName];
        delete shoppingData[listName];
        saveAndRender();
        showToast(t('renameDone'));
    }

    function cancelRename(listName) {
        render();
    }

    // ── Filter ──
    function filterLists() {
        const q = document.getElementById('filterInput').value.toLowerCase().trim();
        document.querySelectorAll('.list-card').forEach(card => {
            if (!q) { card.classList.remove('hidden'); return; }
            const text = card.textContent.toLowerCase();
            card.classList.toggle('hidden', !text.includes(q));
        });
    }

    // ── Export / Import ──
    function exportData() {
        const data = localStorage.getItem('shopping_data');
        if (!data || data === '{}') { showToast(t('exportError'), 'error'); return; }
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shopping-list-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const data = JSON.parse(ev.target.result);
                if (typeof data !== 'object' || Array.isArray(data)) throw Error();
                shoppingData = data;
                saveAndRender();
                showToast(t('imported'), 'success');
            } catch {
                showToast(t('importError'), 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    // ── Save & Render ──
    function saveAndRender() {
        localStorage.setItem('shopping_data', JSON.stringify(shoppingData));
        render();
    }

    // ── Render ──
    function render() {
        const display = document.getElementById('listsDisplay');
        const datalist = document.getElementById('saved-lists');
        const itemsDatalist = document.getElementById('saved-items');
        display.innerHTML = '';
        datalist.innerHTML = '';
        itemsDatalist.innerHTML = '';

        const listNames = Object.keys(shoppingData);

        if (listNames.length === 0) {
            display.innerHTML = `<div class="empty-msg"><strong>${t('emptyMsg')}</strong><p>${t('emptySub')}</p></div>`;
            return;
        }

        const allItems = new Set();

        listNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            datalist.appendChild(option);

            const card = document.createElement('div');
            card.className = 'list-card';
            card.dataset.list = name;

            let itemsHtml = '';
            let listTotal = 0;

            shoppingData[name].forEach(item => {
                const itemTotal = item.price * item.qty;
                listTotal += itemTotal;
                allItems.add(item.name);
                const checked = item.checked ? ' checked' : '';
                itemsHtml += `
                    <tr class="item-row${checked ? ' checked' : ''}" data-item-id="${item.id}">
                        <td><input type="checkbox" class="check-item" onchange="toggleCheck('${name}',${item.id})"${checked}></td>
                        <td>${item.name}</td>
                        <td>${item.qty}×$${item.price.toFixed(2)}</td>
                        <td>$${itemTotal.toFixed(2)}</td>
                        <td><button class="edit-item-btn" onclick="editItem('${name}',${item.id})" title="${t('edit')}">✎</button></td>
                        <td><button class="del-item-btn" onclick="deleteItem('${name}',${item.id})">×</button></td>
                    </tr>
                `;
            });

            card.innerHTML = `
                <div class="list-header">
                    <div class="list-title-wrap">
                        <h3>${name}</h3>
                    </div>
                    <div class="list-header-actions">
                        <button class="rename-btn btn-outline" onclick="startRename('${name}')" title="${t('rename')}"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></button>
                        <button class="delete-list-btn btn-outline" onclick="deleteList('${name}')" title="${t('deleteList')}"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width:32px"></th>
                            <th>${t('item')}</th>
                            <th style="width:80px;text-align:center">${t('qtyCol')}</th>
                            <th style="width:76px;text-align:right">${t('totalCol')}</th>
                            <th style="width:32px"></th>
                            <th style="width:32px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml || `<tr><td colspan="6" style="text-align:center;color:var(--muted)">${t('empty')}</td></tr>`}
                    </tbody>
                </table>
                <div class="grand-total">${t('grandTotal', { amount: listTotal.toFixed(2) })}</div>
            `;

            display.appendChild(card);
        });

        allItems.forEach(name => {
            const opt = document.createElement('option');
            opt.value = name;
            itemsDatalist.appendChild(opt);
        });

        filterLists();
    }

    applyLang();
    initTheme();
    applyInputState();
    applyShoppingMode();
