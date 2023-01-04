var observer = new MutationObserver(function (e) {
  // Check for existing link
  if (document.getElementById("BottomNavWebPart_RandomPart")) return;

  // Create new link
  var link = document.createElement("a");
  link.textContent = "Random Part";
  link.classList.add("BottomNavLnk");
  link.setAttribute("id", "BottomNavWebPart_RandomPart");
  link.setAttribute("href", "javascript:void(0);");
  link.addEventListener("click", function () {
    // TODO: Somehow verify this is an actual part number.
    var partNum =
      (Math.random() * 1e5).toFixed(0) +
      String.fromCharCode(Math.floor(Math.random() * 26) + 65) +
      (Math.random() * 1e3).toFixed(0).padStart(3, "0");
    window.location = "https://www.mcmaster.com/" + partNum;
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
