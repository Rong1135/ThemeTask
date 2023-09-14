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

    // 待辦事項輸入事件
    this.todoForm.addEventListener("submit", (e) => {
      e.preventDefault(); // 防止頁面重新刷新

      let inputValue = this.inputText.value;
      this.createTodoItem(inputValue);
      this.todoForm.reset();
    });
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
      this.todoContainer.removeChild(todoItemDiv);
    });

    todoItemDiv.appendChild(checkboxInput);
    todoItemDiv.appendChild(textParagraph);
    todoItemDiv.appendChild(deleteButton);

    this.todoContainer.appendChild(todoItemDiv);
  }
}

const todoListManager = new TodoListManager();
