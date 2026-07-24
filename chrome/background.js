/**
 * Sinema Modu — arka plan servis işçisi
 * Tek işi var: simgeye tıklanınca ya da kısayola basılınca
 * aktif sekmedeki içerik betiğine "aç/kapat" mesajı yollamak.
 */

async function toggle(tab) {
  if (!tab || !tab.id) return;

  try {
    await chrome.tabs.sendMessage(tab.id, { type: "sinema-modu:toggle" });
    return;
  } catch (err) {
    // İçerik betiği henüz yüklenmemiş olabilir (eklenti yeni kurulduysa
    // veya sekme eklentiden önce açıldıysa). Elle enjekte edip tekrar dene.
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    await chrome.tabs.sendMessage(tab.id, { type: "sinema-modu:toggle" });
  } catch (err) {
    // chrome:// sayfaları, Web Store, PDF görüntüleyici vb. yerlerde çalışmaz.
    console.warn("Sinema Modu bu sayfada çalışamıyor:", err && err.message);
  }
}

chrome.action.onClicked.addListener(toggle);

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-focus") return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  toggle(tab);
});

// Sağ tuş menüsü — kurulumda bir kez oluşturulur.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sinema-modu-toggle",
    title: chrome.i18n.getMessage("menuToggle"),
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "sinema-modu-toggle") return;
  toggle(tab);
});
