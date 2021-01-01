// 安装此扩展后，将需要来自持久变量的信息。
// 首先runtime.onInstalled在后台脚本中包含一个监听事件。
// 在onInstalled侦听器内部，扩展将使用存储API设置一个值。这将允许多个扩展组件访问该值并进行更新。
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757", top: "20" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "weibo.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
