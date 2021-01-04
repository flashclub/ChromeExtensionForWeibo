window.onload = function () {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, { greeting: "hello" }, function (response) {
      console.log("response", response); // 向content-script.js发送请求信息
      const { video } = response;
      const { src, title, baseURI } = [...video][0];
      baseData.src = src;
      baseData.title = title;
      baseData.baseURI = baseURI;
      getVideoArray();
    });
  });
};
let baseData = { src: "", title: "", baseURI: "" };
const getVideoArray = (data) => {
  const aLink = document.getElementById("downloadA");
  aLink.setAttribute("href", decodeURI(baseData.src));
  aLink.setAttribute("download", `${baseData.title}.mp4.zip`);
};

let changeNameButton = document.getElementById("downloadChangeName");
// 不支持绑定点击事件，通过事件监听实现点击下载
changeNameButton.addEventListener("click", function () {
  console.log("点击了", baseData.src);
  console.log("fileserver", FileSaver);

  var x = new XMLHttpRequest();
  x.open("GET", decodeURI(baseData.src), true);
  x.responseType = "blob";
  x.onload = function (e) {
    //会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
    // 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    var url = window.URL.createObjectURL(x.response);
    var a = document.createElement("a");
    a.href = url;
    a.download = baseData.title;
    a.click();
  };
  x.send();
});
