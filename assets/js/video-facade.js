/**
 * Video Facade (Progressive Enhancement)
 *
 * Replaces <video> elements with a lightweight poster image facade.
 * The real video source is removed during initial load to prevent
 * the browser from downloading the video file.
 *
 * When the user clicks the poster, the video source is restored,
 * the video element is shown, and playback begins.
 */

// Wait until the initial HTML document has been fully loaded and parsed // before running the enhancement script.
document.addEventListener('DOMContentLoaded', () => {
  // Select all video elements that should be enhanced with the facade behaviour. 
  const videos = document.querySelectorAll('.js-video-facade');
  // Loop through each video found on the page so we can enhance them individually.
  videos.forEach(video => {
    // Get the next sibling element after the video. This should be the <template> containing the poster image markup.
    const template = video.nextElementSibling;
    // If the template does not exist OR it is not the expected poster template, exit early and do not enhance this video.
    if (!template || !template.matches('.js-video-poster')) return;
    // Find the first <source> element inside the video. This contains the actual video file we want to delay loading.
    const source = video.querySelector('source');
    // If no video source exists, exit early because we cannot load a video later.
    if (!source) return;
    // Store the video file URL so we can re-attach it later when the user clicks.
    const src = source.src;
    // Store the MIME type of the video source (e.g. "video/mp4").
    const type = source.type;
    // Remove the source element from the video so the browser does not start downloading the video during the initial page load.
    source.remove();
    // Create a button element that will act as the clickable video facade.
    const button = document.createElement('button');
    // Assign a class for styling the facade button (e.g. poster image + play icon).
    button.className = 'video-facade';
    button.ariaLabel = 'Play video'
    // Clone the contents of the poster template. This typically contains a <picture> element with responsive images.
    const poster = template.content.cloneNode(true);
    // Insert the cloned poster markup inside the facade button.
    button.appendChild(poster);
    // Insert the facade button into the DOM just before the video element.
    video.parentNode.insertBefore(button, video);
    // Hide the original video element so only the poster facade is visible.
    video.hidden = true;
    // Listen for a user click on the facade button.
    button.addEventListener('click', () => {
      // Create a new <source> element that will restore the video source.
      const newSource = document.createElement('source');
      // Reapply the stored video URL.
      newSource.src = src;
      // Reapply the stored MIME type.
      newSource.type = type;
      // Append the new source back into the video element.
      video.appendChild(newSource);
      // Reveal the video element so it replaces the poster facade.
      video.hidden = false;
      // Tell the browser to reload the video element so it recognises the newly added <source>.
      video.load();
      // Start playing the video immediately after it loads.
      video.play();
      // Remove the facade button since the real video player is now visible.
      button.remove();

    });

  });

});