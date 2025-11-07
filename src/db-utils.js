// DB utilities — small helpers that operate on the shared `db` (Dexie)
(function () {
    async function normalizeAllOrders(app) {
        if (!app || !app.currentProject) return;

        // Normalize chapters
        const chs = await db.chapters.where('projectId').equals(app.currentProject.id).sortBy('order');
        for (let i = 0; i < chs.length; i++) {
            if (chs[i].order !== i) {
                try { await db.chapters.update(chs[i].id, { order: i }); } catch (e) { }
            }
        }

        // Normalize scenes within each chapter
        for (let ch of chs) {
            const scenes = await db.scenes.where('projectId').equals(app.currentProject.id).and(s => s.chapterId === ch.id).sortBy('order');
            for (let j = 0; j < scenes.length; j++) {
                if (scenes[j].order !== j) {
                    try { await db.scenes.update(scenes[j].id, { order: j }); } catch (e) { }
                }
            }
        }

        // Reload chapters/scenes so UI reflects normalized ordering
        try {
            await app.loadChapters();
        } catch (e) {
            // ignore
        }
    }

    window.DBUtils = window.DBUtils || {};
    window.DBUtils.normalizeAllOrders = normalizeAllOrders;
})();
