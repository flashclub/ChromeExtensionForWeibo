let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function (element) {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, { greeting: "hello" }, function (response) {
      console.log("response", response); // 向content-script.js发送请求信息
      const { video } = response;

      getVideoArray(video);
    });
  });
  //   let color = element.target.value;
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.executeScript(tabs[0].id, {
  //       code: 'document.body.style.backgroundColor = "' + color + '";',
  //     });
  //   });
};
window.onload = function () {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, { greeting: "hello" }, function (response) {
      console.log("response", response); // 向content-script.js发送请求信息
      const { video } = response;

      getVideoArray(video);
    });
  });
};

const getVideoArray = (data) => {
  console.log("video:---", data);
  const { src } = data[0];
  const aLink = document.getElementById("downloadA");

  aLink.setAttribute("href", "http:" + decodeURI(src));
  aLink.setAttribute("download", "11--.mp4");
};
