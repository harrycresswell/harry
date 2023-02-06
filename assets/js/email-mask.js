function decodeStringBase64() {
  // Grab Reply by email link tag
  let elemsToDecode = document.querySelectorAll('[data-decode="email"]');
  // For each link found
  elemsToDecode.forEach(function(elem) {
    // listen for click event
    elem.addEventListener('click', e => {
      // Grab href data
      let hrefData = elem.href;
      // Split the href data after the colon
      let splitData = hrefData.split(/[:,]/);
      // Decode the second item in the array
      let decodedString = atob(splitData[1]);
      // Dump encodedString and “mailto:” in href
      elem.href = 'mailto:' + decodedString;
    });
  });
}

decodeStringBase64();