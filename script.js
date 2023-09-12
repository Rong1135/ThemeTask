class TodoListManager {
  constructor() {
    this.main = this.getElement("main");
    this.header = this.getElement("header");
    this.aside = this.getElement("aside");

    // 側邊欄按鈕
    this.openSidebarButton = this.getElement("#openSidebarButton");
    this.closeSidebarButton = this.getElement("#closeSidebarButton");

    this.setupEventListeners();
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  setupEventListeners() {
    // 開啟側邊欄事件
    this.openSidebarButton.addEventListener("click", () => {
      this.header.classList.add("move-right");
      this.main.classList.add("move-right");
      this.aside.classList.add("move-left");
      this.openSidebarButton.style.display = "none";
    });

    // 關閉側邊欄事件
    this.closeSidebarButton.addEventListener("click", () => {
      this.header.classList.remove("move-right");
      this.main.classList.remove("move-right");
      this.aside.classList.remove("move-left");

      this.aside.addEventListener(
        "transitionend",
        () => {
          this.openSidebarButton.style.display = "block";
        },
        { once: true }
      );
    });
  }
}

const todoListManager = new TodoListManager();
