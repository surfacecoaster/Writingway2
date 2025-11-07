// Simple Compendium module backed by Dexie `db` defined in app.js
(function () {
    try {
        const Compendium = {
            async createEntry(projectId, { category = 'lore', title = '', body = '', tags = [] } = {}) {
                const id = Date.now().toString() + '-' + Math.random().toString(36).slice(2, 8);
                const now = new Date();
                const entry = { id, projectId, category, title, body, summary: '', tags: (tags || []).slice(0, 10), created: now, modified: now, order: 0 };
                await db.compendium.add(entry);
                return entry;
            },

            async updateEntry(id, updates) {
                updates.modified = new Date();
                await db.compendium.update(id, updates);
                return db.compendium.get(id);
            },

            async deleteEntry(id) {
                await db.compendium.delete(id);
            },

            async getEntry(id) {
                return db.compendium.get(id);
            },

            async listByCategory(projectId, category) {
                return db.compendium.where({ projectId, category }).sortBy('order');
            },

            async search(projectId, q, options = {}) {
                q = (q || '').trim().toLowerCase();
                const limit = options.limit || 20;
                if (!q) {
                    return (await db.compendium.where('projectId').equals(projectId).limit(limit).toArray()) || [];
                }
                const all = await db.compendium.where('projectId').equals(projectId).toArray();
                const results = all.filter(e => {
                    const hay = ((e.title || '') + '\n' + (e.tags || []).join(' ') + '\n' + (e.body || '')).toLowerCase();
                    return hay.indexOf(q) !== -1;
                }).slice(0, limit);
                return results;
            },

            async summaries(projectId, ids = []) {
                const out = {};
                for (const id of ids) {
                    const e = await db.compendium.get(id);
                    if (!e) continue;
                    if (e.summary && e.summary.length > 10) out[id] = e.summary;
                    else out[id] = (e.body || '').slice(0, 300) + ((e.body || '').length > 300 ? '…' : '');
                }
                return out;
            },

            async export(projectId) {
                return db.compendium.where('projectId').equals(projectId).toArray();
            },

            async import(projectId, items = [], opts = { merge: true }) {
                const added = [];
                for (const it of items) {
                    const entry = Object.assign({}, it);
                    entry.projectId = projectId;
                    entry.id = entry.id || (Date.now().toString() + '-' + Math.random().toString(36).slice(2, 6));
                    entry.created = entry.created ? new Date(entry.created) : new Date();
                    entry.modified = new Date();
                    await db.compendium.put(entry);
                    added.push(entry);
                }
                return added;
            }
        };

        window.Compendium = Compendium;

        // Test helper
        window.__test = window.__test || {};
        window.__test.seedCompendium = async function (projectId, entries) {
            const created = [];
            for (const e of (entries || [])) {
                const en = await Compendium.createEntry(projectId, e);
                created.push(en);
            }
            return created;
        };
    } catch (e) {
        console.warn('Failed to attach Compendium module:', e && e.message ? e.message : e);
    }
})();
