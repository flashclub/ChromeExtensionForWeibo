let html = "",
  video;
window.onload = function (data) {
  //   console.log("window on load", document.body.innerHTML);

  html = document.body.innerHTML;
  video = document.getElementsByTagName("video");
};
console.log("--body", document.body);
chrome.extension.onMessage.addListener(function (request, sender, sendMessage) {
  console.log("send video", video);
  const videos = [...video];
  const videoInfo = videos.map((item) => {
    console.log(item.attributes[10].value);
    return {
      baseURI: item.baseURI,
      src: encodeURI( [...item.attributes][10].value),
    };
  });
  console.log("sendmessage", videoInfo);
  if (request.greeting == "hello") sendMessage({ html, video: videoInfo });
  else sendMessage("FUCK OFF"); // snub them.
});
