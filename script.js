/* ============================================================
   Poonam Portfolio - Intro Video Popup
   Shows your video centered in a popup once, when the site opens.
   Drop-in script — add this line before </body>:
       <script src="intro-video.js"></script>
   Put your video file at: videos/intro.mp4
   ============================================================ */

(function () {
  const style = document.createElement("style");
  style.textContent = `
    #poonamVideoOverlay{
      position:fixed; inset:0; background:rgba(14,36,49,.85);
      display:flex; align-items:center; justify-content:center;
      z-index:2000; opacity:0; pointer-events:none; transition:opacity .4s ease;
    }
    #poonamVideoOverlay.show{ opacity:1; pointer-events:auto; }
    #poonamVideoBox{
      position:relative; max-width:340px; width:88%;
      background:#0E2431; border-radius:16px; padding:14px;
      box-shadow:0 10px 40px rgba(0,0,0,.5);
      transform:scale(.92); transition:transform .4s ease;
    }
    #poonamVideoOverlay.show #poonamVideoBox{ transform:scale(1); }
    #poonamVideoBox video{
      width:100%; border-radius:10px; display:block; background:#000;
    }
    #poonamVideoClose{
      position:absolute; top:-14px; right:-14px; width:32px; height:32px;
      border-radius:50%; background:#4070f4; color:#fff; border:none;
      font-size:16px; cursor:pointer; box-shadow:0 3px 8px rgba(0,0,0,.3);
    }
    #poonamVideoBox p{
      color:#fff; text-align:center; margin-top:10px; font-size:13px;
      font-family:Poppins,Arial,sans-serif; opacity:.8;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "poonamVideoOverlay";
  overlay.innerHTML = `
    <div id="poonamVideoBox">
      <button id="poonamVideoClose">✕</button>
      <video id="poonamIntroVideo" src="videos/intro.mp4" playsinline muted autoplay></video>
      <p>Tap video to unmute</p>
    </div>
  `;
  document.body.appendChild(overlay);

  const video = overlay.querySelector("#poonamIntroVideo");
  const closeBtn = overlay.querySelector("#poonamVideoClose");

  function closeVideo() {
    overlay.classList.remove("show");
    video.pause();
  }

  // Show once page finishes loading
  window.addEventListener("load", () => {
    overlay.classList.add("show");
    video.play().catch(() => {}); // autoplay may need muted, already set
  });

  // Tap video to toggle sound on
  video.addEventListener("click", () => {
    video.muted = !video.muted;
  });

  closeBtn.addEventListener("click", closeVideo);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeVideo();
  });
  video.addEventListener("ended", closeVideo);
})();
