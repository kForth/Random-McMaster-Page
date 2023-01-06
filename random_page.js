var observer = new MutationObserver(function (e) {
  // Check for existing link
  if (document.getElementById("BottomNavWebPart_RandomPage")) return;

  // Create new link
  var link = document.createElement("a");
  link.textContent = "Random Page";
  link.classList.add("BottomNavLnk");
  link.setAttribute("id", "BottomNavWebPart_RandomPage");
  link.setAttribute("href", "javascript:void(0);");
  link.addEventListener("click", async function () {
    // Add loading icon
    var loader = document.createElement("div");
    loader.classList.add("ShellLayout_WaitIcon");
    var loaderParent = document.getElementById("MainContent");
    var contentDiv = loaderParent.childNodes[0]
    loaderParent.insertBefore(loader, contentDiv);

    try {
      // Load sitemap and extract links
      var response = await fetch("https://www.mcmaster.com/sitemap.xml", {
        mode: 'same-origin',
        referrerPolicy: 'origin',
      });
      var content = await response.text();
      var links = [...content.matchAll(/<loc>(.*)<\/loc>/g)].map(m => m[1]);
      // Choose random link
      var link = links[Math.floor(Math.random() * links.length)];
      window.location = link;
    } finally {
      // Remove loading icon
      loader.remove();
    }
  });

  // Create seperator
  var separator = document.createElement("span");
  separator.textContent = "|";
  separator.classList.add("VerticalSeprt");

  //Add link to bottom nav
  var container = document.getElementById("BottomNavWebPart_LnksCntnr");
  container.appendChild(separator);
  container.appendChild(link);
});

observer.observe(document.body, { childList: true, subtree: true });
