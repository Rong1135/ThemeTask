class TodoListManager {
  constructor() {
    this.bodyClassList = document.body.classList;

    this.initializeElements();
    this.setupEventListeners();
    this.setupThemeButtons();
    this.setupFonts();
    this.setupFontSizes();

    this.setSetting();
  }

  initializeElements() {
    // main Elements
    this.main = document.querySelector("main");
    this.header = document.querySelector("header");
    this.aside = document.querySelector("aside");
    // aside Elements
    this.openSidebarButton = document.querySelector("#openSidebarButton");
    this.closeSidebarButton = document.querySelector("#closeSidebarButton");
    // To Do Elements
    this.todoForm = document.querySelector("#todoForm");
    this.inputText = document.querySelector("#inputText");
    this.addItemButton = document.querySelector("#addButton");
    this.todoContainer = document.querySelector(".todolist-container");
    this.completedContainer = document.querySelector(
      ".todo-completed-container"
    );
    // setting Elements
    this.toggleThemeButton = document.querySelector("#toggleThemeButton");
    this.fontChange = document.querySelector("#fontChange");
    this.fontSize = document.querySelector("#fontSize");
    this.SaveSettingButton = document.querySelector("#SaveSettingButton");
    this.ClearSettingButton = document.querySelector("#ClearSettingButton");
    // 主題預覽
    this.themePreview = document.querySelector("#themePreview");
  }

  // 儲存設定
  setSetting() {
    // 獲取本地存取值
    const nowThemeJSON = localStorage.getItem("theme");
    const nowFontJSON = localStorage.getItem("font");
    const nowFontSizeJSON = localStorage.getItem("fontSize");

    // 設置 "當前設定值"，從本地儲存取出或是直接設定為 default 值
    this.nowTheme = JSON.parse(nowThemeJSON) || "default-theme";
    this.nowFont = JSON.parse(nowFontJSON) || "default-font";
    this.nowFontSize = JSON.parse(nowFontSizeJSON) || "default-font-size";

    this.setTheme(this.nowTheme);
    this.setFont(this.nowFont);
    this.setFontSize(this.nowFontSize);
  }

  // 清除設定
  resetSetting() {
    // 重置設定值
    this.nowTheme = "default-theme";
    this.nowFont = "default-font";
    this.nowFontSize = "default-font-size";

    // 保存已重置的設定值
    this.saveSetting();

    this.setTheme(this.nowTheme);
    this.setFont(this.nowFont);
    this.setFontSize(this.nowFontSize);
  }

  // 設定主題背景色
  setTheme(themeName) {
    this.bodyClassList.remove(
      "default-theme",
      "light-theme",
      "night-theme",
      "nature-theme"
    );
    this.updateClassList(themeName);
  }
  // 設定選擇字體
  setFont(font) {
    this.bodyClassList.remove("default-font", "font1", "font2", "font3");
    this.updateClassList(font);
    // 更新字體後也要更新字型大小
    this.setFontSize(this.nowFontSize);
  }
  // 設定字型大小
  setFontSize(fontSize) {
    this.bodyClassList.remove(
      "default-font-size",
      "small-font-size",
      "large-font-size",
      "default-font-size2",
      "small-font-size2",
      "large-font-size2"
    );

    // 如果字體為"辰宇落雁體"，要重設字型大小
    if (this.nowFont == "font2") {
      if (fontSize === "default-font-size") fontSize = "default-font-size2";
      else if (fontSize === "small-font-size") fontSize = "small-font-size2";
      else if (fontSize === "large-font-size") fontSize = "large-font-size2";
    }

    this.updateClassList(fontSize);
  }
  // 更新 <body> 類別
  updateClassList(className) {
    this.bodyClassList.add(className);
  }

  // 為"主題背景色切換"選項綁定點擊事件
  setupThemeButtons() {
    const themes = {
      defaultThemeButton: "default-theme",
      lightThemeButton: "light-theme",
      nightThemeButton: "night-theme",
      natureThemeButton: "nature-theme",
    };

    for (const [buttonId, themeName] of Object.entries(themes)) {
      const button = document.querySelector(`#${buttonId}`);
      button.addEventListener("click", () => {
        this.nowTheme = themeName;
        this.setTheme(this.nowTheme);
      });
    }
  }
  // 為"字體切換"選項綁定點擊事件
  setupFonts() {
    const fonts = {
      defaultFont: "default-font",
      font1: "font1",
      font2: "font2",
      font3: "font3",
    };

    for (const [liId, fontName] of Object.entries(fonts)) {
      const font = document.querySelector(`#${liId}`);
      font.addEventListener("click", () => {
        this.nowFont = fontName;
        this.setFont(fontName);
      });
    }
  }
  // 為"字型大小切換"選項綁定點擊事件
  setupFontSizes() {
    const fontSizes = {
      mid: "default-font-size",
      small: "small-font-size",
      large: "large-font-size",
    };

    for (const [liId, fontSizeName] of Object.entries(fontSizes)) {
      const fontSize = document.querySelector(`#${liId}`);
      fontSize.addEventListener("click", () => {
        this.nowFontSize = fontSizeName;
        this.setFontSize(fontSizeName);
      });
    }
  }

  // 設定事件監聽器
  setupEventListeners() {
    // <aside> 的點擊事件
    this.openSidebarButton.addEventListener("click", () => this.openSidebar());
    this.closeSidebarButton.addEventListener("click", () =>
      this.closeSidebar()
    );
    // 表單送出事件
    this.todoForm.addEventListener("submit", (e) =>
      this.handleTodoFormSubmit(e)
    );
    // 主題預覽設定
    this.setupThemeOptionEvents();
    // 開啟設定 主題 & 字體相關 的子選單
    this.toggleThemeButton.addEventListener("click", () =>
      this.showToggleElement("themeMenu")
    );
    this.fontChange.addEventListener("click", () =>
      this.showToggleElement("fontChangeMenu")
    );
    this.fontSize.addEventListener("click", () =>
      this.showToggleElement("fontSizeMenu")
    );
    // 儲存 & 清除 設定選項
    this.SaveSettingButton.addEventListener("click", () => this.saveSetting());
    this.ClearSettingButton.addEventListener("click", () => {
      const isConfirmed = confirm("您確定要清除設定嗎?");
      if (isConfirmed) this.resetSetting();
    });
  }

  // 開啟/關閉 <aside>
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

  // 避免 To Do 提交空值
  handleTodoFormSubmit(e) {
    e.preventDefault();
    if (this.inputText.value === "") {
      alert("請輸入待辦事項!");
    } else {
      this.createTodoItem(this.inputText.value);
      this.todoForm.reset();
    }
  }

  // 主題預覽：當游標移到選項上時，出現預覽畫面
  setupThemeOptionEvents() {
    const themeOptions = document.querySelectorAll("#themeMenu li");

    themeOptions.forEach((option) => {
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
        // 將網頁主題變成游標所指主題
        this.setTheme(themeName);
        // 用以下方法捕捉 HTML 畫面
        this.captureWebpageScreenshot();
        // 顯示預覽畫面
        this.themePreview.style.display = "block";
        // 恢復原有主題設定
        this.setTheme(this.nowTheme);
      });

      // 當游標移開時，取消顯示預覽畫面
      option.addEventListener("mouseout", () => {
        this.themePreview.style.display = "none";
      });
    });
  }

  // 顯示設定子選項
  showToggleElement(elementName) {
    const element = document.querySelector(`#${elementName}`);
    element.classList.toggle("show");
  }

  // 將主題設定儲存到本地存儲
  saveSetting() {
    const themeJSON = JSON.stringify(this.nowTheme);
    const fontJSON = JSON.stringify(this.nowFont);
    const fontSizeJSON = JSON.stringify(this.nowFontSize);
    localStorage.setItem("theme", themeJSON);
    localStorage.setItem("font", fontJSON);
    localStorage.setItem("fontSize", fontSizeJSON);
  }

  // 捕捉網頁畫面
  captureWebpageScreenshot() {
    const themePreview = document.querySelector("#themePreview");
    html2canvas(document.body).then((canvas) => {
      themePreview.innerHTML = "";
      canvas.style.width = "60%";
      canvas.style.height = "60%";
      themePreview.appendChild(canvas);
    });
  }

  // 若是有勾選的 To Do 項目，就顯示已完成區塊
  hideCompletedContainer() {
    if (
      !this.completedContainer.querySelector("input[type=checkbox]:checked")
    ) {
      this.completedContainer.style.display = "none";
    }
  }

  // 新增 To Do 項目至 <section class="todolist-container"> 中
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

    deleteButton.addEventListener("click", () =>
      this.handleDeleteButtonClick(todoItemDiv)
    );
    checkboxInput.addEventListener("change", () =>
      this.handleCheckboxChange(checkboxInput, todoItemDiv)
    );

    todoItemDiv.appendChild(checkboxInput);
    todoItemDiv.appendChild(textParagraph);
    todoItemDiv.appendChild(deleteButton);

    this.todoContainer.appendChild(todoItemDiv);
  }

  // 刪除項目按鈕的方法，用 parentContainer 刪除項目，並檢查 completedContainer 內是否還有其他項目
  handleDeleteButtonClick(todoItemDiv) {
    const parentContainer = todoItemDiv.closest(
      ".todolist-container, .todo-completed-container"
    );
    if (parentContainer) {
      parentContainer.removeChild(todoItemDiv);
    }
    this.hideCompletedContainer();
  }

  // checkbox 勾選後操作
  handleCheckboxChange(checkboxInput, todoItemDiv) {
    if (checkboxInput.checked) {
      todoItemDiv.querySelector(".text-area").style.textDecoration =
        "line-through";
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
