/**
 * Sinema Modu — arka plan betiği (Firefox, MV3 event page)
 * Tek işi var: simgeye tıklanınca ya da kısayola basılınca
 * aktif sekmedeki içerik betiğine "aç/kapat" mesajı yollamak.
 *
 * Chrome sürümünden farkı: promise tabanlı `browser.*` API'si ve
 * service worker yerine event page (Firefox MV3'te service worker yok).
 */

async function toggle(tab) {
  if (!tab || !tab.id) return;

  try {
    await browser.tabs.sendMessage(tab.id, { type: "sinema-modu:toggle" });
    return;
  } catch (err) {
    // İçerik betiği henüz yüklenmemiş olabilir (eklenti yeni kurulduysa,
    // sekme eklentiden önce açıldıysa ya da kullanıcı site iznini henüz
    // vermediyse). activeTab izniyle elle enjekte edip tekrar dene.
  }

  try {
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    await browser.tabs.sendMessage(tab.id, { type: "sinema-modu:toggle" });
  } catch (err) {
    // about:, addons.mozilla.org, PDF görüntüleyici vb. yerlerde çalışmaz.
    console.warn("Sinema Modu bu sayfada çalışamıyor:", err && err.message);
  }
}

browser.action.onClicked.addListener(toggle);

browser.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-focus") return;
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  toggle(tab);
});

// Sağ tuş menüsü — kurulumda bir kez oluşturulur.
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "sinema-modu-toggle",
    title: browser.i18n.getMessage("menuToggle"),
    contexts: ["all"]
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "sinema-modu-toggle") return;
  toggle(tab);
});
