function decodeStringBase64() {
  let elemsToDecode = document.querySelectorAll('[data-decode]');
  elemsToDecode.forEach(function(elem) {
    elem.href = 'mailto:' + atob(elem.getAttribute('data-decode'));
  });
}

let replyButton = document.querySelectorAll('[data-decode]');
replyButton.forEach(function(elem) {
  elem.addEventListener('click', e => {
    decodeStringBase64()
  });
});