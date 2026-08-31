document.addEventListener("DOMContentLoaded", function () {
  var chapters = document.querySelectorAll("#content > .sect1");

  chapters.forEach(function (chapter, index) {
    var heading = chapter.querySelector(":scope > h2");
    var body = chapter.querySelector(":scope > .sectionbody");

    if (!heading || !body) {
      return;
    }

    var panelId = body.id || "chapter-panel-" + (index + 1);
    body.id = panelId;

    heading.classList.add("chapter-toggle");
    heading.setAttribute("role", "button");
    heading.setAttribute("tabindex", "0");
    heading.setAttribute("aria-controls", panelId);
    heading.setAttribute("aria-expanded", "true");

    var toggleChapter = function () {
      var collapsed = chapter.classList.toggle("is-collapsed");
      heading.setAttribute("aria-expanded", collapsed ? "false" : "true");
      body.hidden = collapsed;
    };

    heading.addEventListener("click", toggleChapter);
    heading.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleChapter();
      }
    });
  });
});
