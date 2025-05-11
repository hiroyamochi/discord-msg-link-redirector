const DISCORD_MESSAGE_PREFIX = "https://discord.com/channels/";
const DISCORD_URL_PREFIX = "discord://discord.com/channels/";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "loading" &&
    tab.url &&
    tab.url.startsWith(DISCORD_MESSAGE_PREFIX) &&
    !tab.url.startsWith(DISCORD_URL_PREFIX)
  ) {
    const discordUrl = tab.url.replace(DISCORD_MESSAGE_PREFIX, DISCORD_URL_PREFIX);
    chrome.tabs.update(tabId, { url: discordUrl }, () => {
      setTimeout(() => {
        chrome.tabs.remove(tabId);
      }, 1000); // 1秒後にタブを閉じる
    });
  }
});