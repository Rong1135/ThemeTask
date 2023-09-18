class TodoListManager {
  constructor() {
    this.main = this.getElement("main");
    this.header = this.getElement("header");
    this.aside = this.getElement("aside");

    // 側邊欄按鈕
    this.openSidebarButton = this.getElement("#openSidebarButton");
    this.closeSidebarButton = this.getElement("#closeSidebarButton");

    // 待辦事項輸入區塊
    this.todoForm = this.getElement("#todoForm");
    this.inputText = this.getElement("#inputText");
    this.addItemButton = this.getElement("#addButton");
    this.todoContainer = this.getElement(".todolist-container");
    this.completedContainer = this.getElement(".todo-completed-container");

    // 背景色切換
    this.toggleThemeButton = this.getElement("#toggleThemeButton");
    this.subSettingList = this.getElement(".sub-setting-list");
    this.defaultThemeButton = this.getElement("#defaultThemeButton");
    this.lightThemeButton = this.getElement("#lightThemeButton");
    this.nightThemeButton = this.getElement("#nightThemeButton");
    this.NatureThemeButton = this.getElement("#NatureThemeButton");

    this.setupEventListeners();
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  setTheme(themeName) {
    document.body.className = themeName;
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

    // 待辦事項輸入表單事件
    this.todoForm.addEventListener("submit", (e) => {
      e.preventDefault(); // 防止頁面重新刷新

      if (this.inputText.value === "") {
        alert("請輸入待辦事項!");
      } else {
        let inputValue = this.inputText.value;
        this.createTodoItem(inputValue);
        this.todoForm.reset();
      }
    });

    // 背景色切換
    this.toggleThemeButton.addEventListener("click", () => {
      this.subSettingList.classList.toggle("show");
    });

    this.defaultThemeButton.addEventListener("click", () => {
      this.setTheme("default-theme");
    });

    this.lightThemeButton.addEventListener("click", () => {
      this.setTheme("light-theme");
    });

    this.nightThemeButton.addEventListener("click", () => {
      this.setTheme("night-theme");
    });

    this.NatureThemeButton.addEventListener("click", () => {
      this.setTheme("nature-theme");
    });
  }

  hideCompletedContainer() {
    if (
      !this.completedContainer.querySelector("input[type=checkbox]:checked")
    ) {
      this.completedContainer.style.display = "none";
    }
  }

  // 創建待辦事項項目
  createTodoItem(inputValue) {
    const todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todolist-item");

    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("name", "checkbox");
    checkboxInput.setAttribute("id", "checkbox");

    const textParagraph = document.createElement("p");
    textParagraph.classList.add("text-area");
    textParagraph.textContent = inputValue;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "\u00D7";

    // 刪除項目事件
    deleteButton.addEventListener("click", () => {
      const parentContainer = todoItemDiv.closest(
        ".todolist-container, .todo-completed-container"
      );

      if (parentContainer) {
        parentContainer.removeChild(todoItemDiv);
      }

      this.hideCompletedContainer();
    });

    // 勾選checkbox時，更改`<p>`標籤的文字樣式
    checkboxInput.addEventListener("change", () => {
      if (checkboxInput.checked) {
        textParagraph.style.textDecoration = "line-through";
        // 移動項目
        this.completedContainer.appendChild(todoItemDiv);
        this.completedContainer.style.display = "flex";
      } else {
        textParagraph.style.textDecoration = "none";
        this.todoContainer.appendChild(todoItemDiv);

        this.hideCompletedContainer();
      }
    });

    todoItemDiv.appendChild(checkboxInput);
    todoItemDiv.appendChild(textParagraph);
    todoItemDiv.appendChild(deleteButton);

    this.todoContainer.appendChild(todoItemDiv);
  }
}

const todoListManager = new TodoListManager();
