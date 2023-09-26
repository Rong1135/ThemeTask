class TodoListManager {
  constructor() {
    this.nowTheme = "default-theme";
    this.nowFont = "default-font";
    this.nowFontSize = "default-font-size";
    this.bodyClassList = document.body.classList;

    this.initializeElements();
    this.setupEventListeners();
    this.setupThemeButtons();
    this.setupFonts();
    this.setupFontSizes();

    this.setSetting();
  }

  initializeElements() {
    // 基本元素
    this.main = this.getElement("main");
    this.header = this.getElement("header");
    this.aside = this.getElement("aside");

    // 側邊欄按鈕
    this.openSidebarButton = this.getElement("#openSidebarButton");
    this.closeSidebarButton = this.getElement("#closeSidebarButton");

    // 待辦事項相關
    this.todoForm = this.getElement("#todoForm");
    this.inputText = this.getElement("#inputText");
    this.addItemButton = this.getElement("#addButton");
    this.todoContainer = this.getElement(".todolist-container");
    this.completedContainer = this.getElement(".todo-completed-container");

    // 背景色切換相關
    this.toggleThemeButton = this.getElement("#toggleThemeButton");
    this.settingList = this.getElement(".setting-list");
    this.subSettingList = this.getElement(".sub-setting-list");
    this.themeMenu = this.getElement("#themeMenu");
    this.defaultThemeButton = this.getElement("#defaultThemeButton");
    this.lightThemeButton = this.getElement("#lightThemeButton");
    this.nightThemeButton = this.getElement("#nightThemeButton");
    this.natureThemeButton = this.getElement("#natureThemeButton");

    // 主題預覽相關
    this.themeOptions = document.querySelectorAll("#themeMenu li");
    this.themePreview = document.getElementById("themePreview");

    // 字體切換相關
    this.fontChange = this.getElement("#fontChange");
    this.fontChangeMenu = this.getElement("#fontChangeMenu");

    // 字體大小切換相關
    this.fontSize = this.getElement("#fontSize");
    this.fontSizeMenu = this.getElement("#fontSizeMenu");

    // 本地儲存
    this.SaveSettingButton = this.getElement("#SaveSettingButton");
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  setSetting() {
    let nowThemeJSON = localStorage.getItem("theme");
    let nowFontJSON = localStorage.getItem("font");
    let nowFontSizeJSON = localStorage.getItem("fontSize");

    // 將字符串轉回 JavaScript
    this.nowTheme = JSON.parse(nowThemeJSON);
    this.nowFont = JSON.parse(nowFontJSON);
    this.nowFontSize = JSON.parse(nowFontSizeJSON);

    this.setTheme(this.nowTheme);
    this.setFont(this.nowFont);
    this.setFontSize(this.nowFontSize);
  }

  // 設定 body 元素的 class
  setTheme(themeName) {
    this.bodyClassList.remove(
      "default-theme",
      "light-theme",
      "night-theme",
      "nature-theme"
    );
    this.updateClassList(themeName);
  }
  setFont(font) {
    this.bodyClassList.remove("default-font", "font1", "font2", "font3");

    this.updateClassList(font);
    this.setFontSize(this.nowFontSize);
  }
  setFontSize(fontSize) {
    this.bodyClassList.remove(
      "default-font-size",
      "small-font-size",
      "large-font-size",
      "default-font-size2",
      "small-font-size2",
      "large-font-size2"
    );

    if (this.nowFont == "font2") {
      if (fontSize === "default-font-size") fontSize = "default-font-size2";
      else if (fontSize === "small-font-size") fontSize = "small-font-size2";
      else if (fontSize === "large-font-size") fontSize = "large-font-size2";
    }

    this.updateClassList(fontSize);
  }
  updateClassList(className) {
    this.bodyClassList.add(className);
  }

  // 綁定點擊事件
  setupThemeButtons() {
    const themes = {
      defaultThemeButton: "default-theme",
      lightThemeButton: "light-theme",
      nightThemeButton: "night-theme",
      natureThemeButton: "nature-theme",
    };

    for (const [buttonId, themeName] of Object.entries(themes)) {
      const button = this.getElement(`#${buttonId}`);
      button.addEventListener("click", () => {
        this.nowTheme = themeName;
        this.setTheme(this.nowTheme);
      });
    }
  }
  setupFonts() {
    const fonts = {
      defaultFont: "default-font",
      font1: "font1",
      font2: "font2",
      font3: "font3",
    };

    for (const [liId, fontName] of Object.entries(fonts)) {
      const font = this.getElement(`#${liId}`);
      font.addEventListener("click", () => {
        this.nowFont = fontName;
        this.setFont(fontName);
      });
    }
  }
  setupFontSizes() {
    const fontSizes = {
      mid: "default-font-size",
      small: "small-font-size",
      large: "large-font-size",
    };

    for (const [liId, fontSizeName] of Object.entries(fontSizes)) {
      const fontSize = this.getElement(`#${liId}`);
      fontSize.addEventListener("click", () => {
        this.nowFontSize = fontSizeName;
        this.setFontSize(fontSizeName);
      });
    }
  }

  setupEventListeners() {
    // 開啟側邊欄事件
    this.openSidebarButton.addEventListener("click", () => this.openSidebar());

    // 關閉側邊欄事件
    this.closeSidebarButton.addEventListener("click", () =>
      this.closeSidebar()
    );

    // 待辦事項輸入表單事件
    this.todoForm.addEventListener("submit", (e) =>
      this.handleTodoFormSubmit(e)
    );

    this.themeOptions.forEach((option) => this.setupThemeOptionEvents(option));

    // 背景色切換
    this.toggleThemeButton.addEventListener("click", () =>
      this.showToggleElement(themeMenu)
    );

    // 字體選擇
    this.fontChange.addEventListener("click", () =>
      this.showToggleElement(fontChangeMenu)
    );

    // 字體大小
    this.fontSize.addEventListener("click", () =>
      this.showToggleElement(fontSizeMenu)
    );

    // 本地儲存
    this.SaveSettingButton.addEventListener("click", () => this.saveSetting());
  }

  openSidebar() {
    this.header.classList.add("move-right");
    this.main.classList.add("move-right");
    this.aside.classList.add("move-left");
    this.openSidebarButton.style.display = "none";
  }

  closeSidebar() {
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
  }

  handleTodoFormSubmit(e) {
    e.preventDefault(); // 防止頁面重新刷新

    if (this.inputText.value === "") {
      alert("請輸入待辦事項!");
    } else {
      this.createTodoItem(this.inputText.value);
      this.todoForm.reset();
    }
  }

  setupThemeOptionEvents(option) {
    option.addEventListener("mouseover", () => {
      let themeName = this.nowTheme;

      if (option.id === "defaultThemeButton") {
        themeName = "default-theme";
      } else if (option.id === "lightThemeButton") {
        themeName = "light-theme";
      } else if (option.id === "nightThemeButton") {
        themeName = "night-theme";
      } else if (option.id === "natureThemeButton") {
        themeName = "nature-theme";
      }
      this.setTheme(themeName);
      // 調用捕獲截圖函數
      this.captureWebpageScreenshot();

      this.themePreview.style.display = "block";
      this.setTheme(this.nowTheme);
    });

    option.addEventListener("mouseout", () => {
      this.themePreview.style.display = "none";
    });
  }

  // 顯示 <aside> 中的子清單
  showToggleElement(elementName) {
    elementName.classList.toggle("show");
  }

  saveSetting() {
    // 將變數轉換成 JSON 字符串
    let themeJSON = JSON.stringify(this.nowTheme);
    let fontJSON = JSON.stringify(this.nowFont);
    let fontSizeJSON = JSON.stringify(this.nowFontSize);

    console.log(themeJSON);
    console.log(fontJSON);
    console.log(fontSizeJSON);

    // 將資料存儲在 localStorage 中
    localStorage.setItem("theme", themeJSON);
    localStorage.setItem("font", fontJSON);
    localStorage.setItem("fontSize", fontSizeJSON);
  }

  // 在TodoListManager類中添加一個新方法用於捕獲網頁截圖
  captureWebpageScreenshot() {
    const themePreview = this.getElement("#themePreview");

    // 使用HTML2Canvas捕獲整個網頁
    html2canvas(document.body).then((canvas) => {
      themePreview.innerHTML = "";
      canvas.style.width = "60%";
      canvas.style.height = "60%";

      // 將捕獲的圖像添加到預覽框中
      themePreview.appendChild(canvas);
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
    deleteButton.classList.add("button-group");
    deleteButton.textContent = "\u00D7";

    // 刪除項目事件
    deleteButton.addEventListener("click", () =>
      this.handleDeleteButtonClick(todoItemDiv)
    );

    // 勾選checkbox時，更改`<p>`標籤的文字樣式
    checkboxInput.addEventListener("change", () =>
      this.handleCheckboxChange(checkboxInput, todoItemDiv)
    );

    todoItemDiv.appendChild(checkboxInput);
    todoItemDiv.appendChild(textParagraph);
    todoItemDiv.appendChild(deleteButton);

    this.todoContainer.appendChild(todoItemDiv);
  }

  handleDeleteButtonClick(todoItemDiv) {
    const parentContainer = todoItemDiv.closest(
      ".todolist-container, .todo-completed-container"
    );

    if (parentContainer) {
      parentContainer.removeChild(todoItemDiv);
    }

    this.hideCompletedContainer();
  }
  handleCheckboxChange(checkboxInput, todoItemDiv) {
    if (checkboxInput.checked) {
      todoItemDiv.querySelector(".text-area").style.textDecoration =
        "line-through";
      // 移動項目
      this.completedContainer.appendChild(todoItemDiv);
      this.completedContainer.style.display = "flex";
    } else {
      todoItemDiv.querySelector(".text-area").style.textDecoration = "none";
      this.todoContainer.appendChild(todoItemDiv);

      this.hideCompletedContainer();
    }
  }
}

const todoListManager = new TodoListManager();
