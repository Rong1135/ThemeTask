class TodoListManager {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.setupFilterOption();
    this.loadSettings();
    this.setupAutoSwitch();
  }

  initializeElements() {
    this.bodyClassList = document.body.classList;
    // main Elements
    this.main = document.querySelector("main");
    this.header = document.querySelector("header");
    this.aside = document.querySelector("aside");
    // header
    this.filterOptions = document.querySelector(".filter-options");
    this.filterLabel = document.querySelector("#filterLabel");
    this.filterSelect = document.querySelector("#filter");
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
    // 自動切換背景色
    this.autoSwitchButton = document.querySelector("#autoSwitchButton");

    // 映射物件
    this.themeMap = {
      "default-theme": "defaultThemeButton",
      "light-theme": "lightThemeButton",
      "night-theme": "nightThemeButton",
      "nature-theme": "natureThemeButton",
    };

    this.fontMap = {
      "default-font": "defaultFont",
      font1: "font1",
      font2: "font2",
      font3: "font3",
    };

    this.fontSizeMap = {
      "default-font-size": "mid",
      "small-font-size": "small",
      "large-font-size": "large",
    };
  }

  // 設定事件監聽器
  setupEventListeners() {
    // header
    this.filterLabel.addEventListener("click", () => this.openSelect());
    // <aside> 的點擊事件
    this.openSidebarButton.addEventListener("click", () => this.openSidebar());
    this.closeSidebarButton.addEventListener("click", () =>
      this.closeSidebar()
    );
    // 表單送出事件
    this.todoForm.addEventListener("submit", (e) =>
      this.handleTodoFormSubmit(e)
    );

    this.setupThemeButtons();
    this.setupFonts();
    this.setupFontSizes();

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
    this.SaveSettingButton.addEventListener("click", () => this.saveSettings());
    this.ClearSettingButton.addEventListener("click", () => {
      const isConfirmed = confirm("您確定要清除設定嗎?");
      if (isConfirmed) this.resetSettings();
    });
    this.autoSwitchButton.addEventListener("click", () =>
      this.toggleAutoSwitch()
    );
  }

  // To Do 的篩選器
  setupFilterOption() {
    this.filterSelect.addEventListener("change", () => {
      const selectedOption = this.filterSelect.value;

      if (selectedOption === "completed") {
        this.filterCompletedItems();
      } else {
        this.showAllItems();
      }
    });
  }

  // 篩選已標記項目
  filterCompletedItems() {
    const completedItems1 = this.todoContainer.querySelectorAll(
      ".todolist-item.completed"
    );
    const completedItems2 = this.completedContainer.querySelectorAll(
      ".todolist-item.completed"
    );
    const nonCompletedItems1 = this.todoContainer.querySelectorAll(
      ".todolist-item:not(.completed)"
    );
    const nonCompletedItems2 = this.completedContainer.querySelectorAll(
      ".todolist-item:not(.completed)"
    );

    // 隱藏未標記待辦事項
    nonCompletedItems1.forEach((item) => {
      item.style.display = "none";
    });
    nonCompletedItems2.forEach((item) => {
      item.style.display = "none";
    });

    // 顯示已標記待辦事項
    completedItems1.forEach((item) => {
      item.style.display = "flex";
    });
    completedItems2.forEach((item) => {
      item.style.display = "flex";
    });
  }

  // 顯示所有項目
  showAllItems() {
    const completedItems1 = this.todoContainer.querySelectorAll(
      ".todolist-item.completed"
    );
    const completedItems2 = this.completedContainer.querySelectorAll(
      ".todolist-item.completed"
    );
    const nonCompletedItems1 = this.todoContainer.querySelectorAll(
      ".todolist-item:not(.completed)"
    );
    const nonCompletedItems2 = this.completedContainer.querySelectorAll(
      ".todolist-item:not(.completed)"
    );

    // 隱藏未標記待辦事項
    nonCompletedItems1.forEach((item) => {
      item.style.display = "flex";
    });
    nonCompletedItems2.forEach((item) => {
      item.style.display = "flex";
    });

    // 顯示已標記待辦事項
    completedItems1.forEach((item) => {
      item.style.display = "flex";
    });
    completedItems2.forEach((item) => {
      item.style.display = "flex";
    });
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
      button.addEventListener("click", () => this.changeTheme(themeName));
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
      const item = document.querySelector(`#${liId}`);
      item.addEventListener("click", () => this.changeFont(fontName));
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
      const item = document.querySelector(`#${liId}`);
      item.addEventListener("click", () => this.changeFontSize(fontSizeName));
    }
  }

  // 主題預覽事件：當游標移到選項上時，出現預覽畫面
  setupThemeOptionEvents() {
    const themeOptions = document.querySelectorAll("#themeMenu li");

    for (const option of themeOptions) {
      option.addEventListener("mouseover", () => this.previewTheme(option.id));
      option.addEventListener("mouseout", () => this.hideThemePreview());
    }
  }

  // 初始化設定
  loadSettings() {
    const nowThemeJSON = localStorage.getItem("theme");
    const nowFontJSON = localStorage.getItem("font");
    const nowFontSizeJSON = localStorage.getItem("fontSize");

    this.nowTheme = nowThemeJSON || "default-theme";
    this.nowFont = nowFontJSON || "default-font";
    this.nowFontSize = nowFontSizeJSON || "default-font-size";

    this.updateClassList(this.themeMap, "themeMenu", this.nowTheme);
    this.updateClassList(this.fontMap, "fontChangeMenu", this.nowFont);
    this.updateClassList(this.fontSizeMap, "fontSizeMenu", this.nowFontSize);

    this.temporaryTheme = this.nowTheme;
    localStorage.setItem("temporaryTheme", this.temporaryTheme);

    this.applySettings();
  }

  // 設定主題
  changeTheme(themeName) {
    this.nowTheme = themeName;
    this.temporaryTheme = themeName;
    localStorage.setItem("temporaryTheme", this.temporaryTheme);
    this.updateClassList(this.themeMap, "themeMenu", this.nowTheme);
    this.applySettings();
  }

  // 設定字體
  changeFont(font) {
    this.nowFont = font;
    this.updateClassList(this.fontMap, "fontChangeMenu", this.nowFont);
    this.applySettings();
  }

  // 設定字型大小
  changeFontSize(fontSize) {
    this.nowFontSize = fontSize;
    this.updateClassList(this.fontSizeMap, "fontSizeMenu", this.nowFontSize);
    this.applySettings();
  }

  // 更新 <body> 類別
  updateClassList(mapping, menuId, value) {
    const menu = document.querySelector(`#${menuId}`);
    if (mapping[value]) {
      const liElement = document.querySelector(`#${mapping[value]}`);
      if (liElement) {
        // 移除所有li元素的selected類別
        menu.querySelectorAll("li").forEach((li) => {
          li.classList.remove("selected");
        });

        // 添加selected類別給當前點擊的li
        liElement.classList.add("selected");
      } else {
        console.log(`No matching li element found for value: ${value}`);
      }
    } else {
      console.log(`No mapping found for value: ${value}`);
    }
  }

  // 開啟篩選器
  openSelect() {
    this.filterSelect.classList.toggle("show");
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

  // 預覽主題
  previewTheme(themeId) {
    let themeName = this.nowTheme;
    if (themeId === "defaultThemeButton") {
      themeName = "default-theme";
    } else if (themeId === "lightThemeButton") {
      themeName = "light-theme";
    } else if (themeId === "nightThemeButton") {
      themeName = "night-theme";
    } else if (themeId === "natureThemeButton") {
      themeName = "nature-theme";
    }

    this.setTheme(themeName);
    this.captureWebpageScreenshot();
    this.themePreview.style.display = "block";
    this.setTheme(this.nowTheme);
    clearInterval(this.autoSwitchInterval);
    localStorage.setItem("autoSwitchEnabled", "false");
    this.autoSwitchButton.classList.remove("selected");
  }

  // 隱藏主題預覽
  hideThemePreview() {
    this.themePreview.style.display = "none";
  }

  // 顯示設定子選項
  showToggleElement(elementName) {
    const element = document.querySelector(`#${elementName}`);
    element.classList.toggle("show");
  }

  // 儲存設定
  saveSettings() {
    localStorage.setItem("theme", this.nowTheme);
    localStorage.setItem("font", this.nowFont);
    localStorage.setItem("fontSize", this.nowFontSize);
  }

  // 重置設定
  resetSettings() {
    this.nowTheme = "default-theme";
    this.nowFont = "default-font";
    this.nowFontSize = "default-font-size";
    this.saveSettings();
    this.applySettings();
  }

  // 自動切換主題
  setupAutoSwitch() {
    const autoSwitchEnabled = localStorage.getItem("autoSwitchEnabled");

    if (autoSwitchEnabled === "true") {
      this.autoSwitchButton.classList.add("selected");
      if (this.nowTheme !== "night-theme") {
        this.checkTheme();
        this.autoSwitchInterval = setInterval(() => this.checkTheme(), 60000);
      }
    }
  }

  toggleAutoSwitch() {
    this.autoSwitchButton.classList.toggle("selected");

    if (this.autoSwitchButton.className === "selected") {
      this.checkTheme();
      this.autoSwitchInterval = setInterval(() => this.checkTheme(), 60000);
      localStorage.setItem("autoSwitchEnabled", "true");
    } else {
      clearInterval(this.autoSwitchInterval);
      localStorage.setItem("autoSwitchEnabled", "false");
      this.nowTheme = localStorage.getItem("temporaryTheme");
      this.applySettings();
    }
  }

  // 檢查主題切換
  checkTheme() {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    const nightModeStartHour = 18;
    const nightModeEndHour = 6;

    let nightTheme = "night-theme";
    let newTheme = this.nowTheme;

    if (hours >= nightModeStartHour || hours < nightModeEndHour) {
      newTheme = nightTheme;
    } else {
      let saveTheme = localStorage.getItem("theme");
      let theme = localStorage.getItem("temporaryTheme");

      if (saveTheme === theme) {
        newTheme = saveTheme;
      } else {
        newTheme = theme;
      }
    }

    this.changeTheme(newTheme);
  }

  // 設定主題背景色
  setTheme(themeName) {
    this.bodyClassList.remove(
      "default-theme",
      "light-theme",
      "night-theme",
      "nature-theme"
    );
    this.bodyClassList.add(themeName);
  }

  // 設定字體
  setFont(font) {
    this.bodyClassList.remove("default-font", "font1", "font2", "font3");
    this.bodyClassList.add(font);
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

    if (this.nowFont == "font2") {
      if (fontSize === "default-font-size") fontSize = "default-font-size2";
      else if (fontSize === "small-font-size") fontSize = "small-font-size2";
      else if (fontSize === "large-font-size") fontSize = "large-font-size2";
    }

    this.bodyClassList.add(fontSize);
  }

  // 更新 <body> 類別
  applySettings() {
    this.setTheme(this.nowTheme);
    this.setFont(this.nowFont);
    this.setFontSize(this.nowFontSize);
  }

  // 捕捉網頁畫面
  captureWebpageScreenshot() {
    const themePreview = this.themePreview;
    html2canvas(document.body).then((canvas) => {
      themePreview.innerHTML = "";
      canvas.style.width = "60%";
      canvas.style.height = "60%";
      themePreview.appendChild(canvas);
    });
  }

  // 若有勾選的 To Do 項目，顯示已完成區塊
  hideCompletedContainer() {
    if (
      !this.completedContainer.querySelector("input[type=checkbox]:checked")
    ) {
      this.completedContainer.style.display = "none";
    }
  }

  // 新增 To Do 項目至 <section class="todolist-container">
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

    const flagButton = document.createElement("button");
    flagButton.classList.add("flag-button");
    flagButton.classList.add("button-group");
    flagButton.textContent = "\u2690";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.classList.add("button-group");
    deleteButton.textContent = "\u00D7";

    flagButton.addEventListener("click", () =>
      this.handleFlagButtonClick(flagButton)
    );
    deleteButton.addEventListener("click", () =>
      this.handleDeleteButtonClick(todoItemDiv)
    );
    checkboxInput.addEventListener("change", () =>
      this.handleCheckboxChange(checkboxInput, todoItemDiv)
    );

    todoItemDiv.appendChild(checkboxInput);
    todoItemDiv.appendChild(textParagraph);
    todoItemDiv.appendChild(flagButton);
    todoItemDiv.appendChild(deleteButton);

    this.todoContainer.appendChild(todoItemDiv);
  }

  // 切換旗幟(黑/白)，用來標記項目
  handleFlagButtonClick(flagButton) {
    const todoItemDiv = flagButton.parentNode;
    const flagIcon = flagButton.textContent;

    if (flagIcon === "\u2690") {
      flagButton.textContent = "\u2691";
      todoItemDiv.classList.add("completed");
    } else {
      flagButton.textContent = "\u2690";
      todoItemDiv.classList.remove("completed");
    }
  }

  // 刪除項目按鈕的方法，並檢查 completedContainer 內是否還有其他項目
  handleDeleteButtonClick(todoItemDiv) {
    const parentContainer = todoItemDiv.closest(
      ".todolist-container, .todo-completed-container,todo-flag-container"
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
