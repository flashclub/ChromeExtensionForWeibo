// 在document_end时触发此文件，将插件需要的内容发送出去
let html = "",
  video;
window.onload = function (data) {
  //   console.log("window on load", document.body.innerHTML);

  html = document.body.innerHTML;
  video = document.getElementsByTagName("video");
};
// console.log("--body", document.body);
// onMessage监听事件，
chrome.extension.onMessage.addListener(function (request, sender, sendMessage) {
  console.log("send video", video);
  const videos = [...video];
  const title = document.getElementsByClassName("Detail_tith3_2pyML")[0]
    .innerText;
  const videoInfo = videos.map((item) => {
    // console.log("--item", item);
    return {
      baseURI: item.baseURI,
      src: encodeURI('http:'+[...item.attributes][10].value),
      title,
    };
  });
  //   console.log("sendmessage", videoInfo);
  if (request.greeting == "hello") sendMessage({ html, video: videoInfo });
  else sendMessage("FUCK OFF"); // snub them.
});
