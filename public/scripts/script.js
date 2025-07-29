const tabs = document.querySelectorAll(".tab");
const currentPath = window.location.pathname;
tabs.forEach((tab) => {
  if (tab.getAttribute("href") == currentPath) {
    tab.classList.add("bg-gray-950");
  } else {
    tab.classList.remove("bg-gray-950");
  }
});

const button = document.querySelector("[data-dismiss-target]");
button.addEventListener("click", function () {
  const targetSelector = button.getAttribute("data-dismiss-target");
  const alertElement = document.querySelector(targetSelector);
  if (alertElement) {
    alertElement.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-500"
    );
    alertElement.remove();
  }
});


