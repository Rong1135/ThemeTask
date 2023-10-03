class TodoListManager {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.loadSettings();
    this.setupAutoSwitch();
  }

  initializeElements() {
    this.bodyClassList = document.body.classList;
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
    // const themeButtons = Object.entries(themes).map(([buttonId, themeName]) => {
    //   return {
    //     button: document.querySelector(`#${buttonId}`),
    //     themeName,
    //   };
    // });

    // themeButtons.forEach((item) => {
    //   item.button.addEventListener("click", () => {
    //     this.nowTheme = item.themeName;

    //     // 移除所有li元素的selected類別
    //     themeButtons.forEach((button) => {
    //       button.button.classList.remove("selected");
    //     });

    //     // 添加selected類別給當前點擊的li
    //     item.button.classList.add("selected");

    //     this.setTheme(this.nowTheme);
    //   });
    // });
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
    // const fontItems = Object.entries(fonts).map(([liId, fontName]) => {
    //   return {
    //     item: document.querySelector(`#${liId}`),
    //     fontName,
    //   };
    // });

    // fontItems.forEach((item) => {
    //   item.item.addEventListener("click", () => {
    //     // 移除所有li元素的selected類別
    //     fontItems.forEach((fontItem) => {
    //       fontItem.item.classList.remove("selected");
    //     });

    //     // 添加selected類別給當前點擊的li
    //     item.item.classList.add("selected");

    //     this.nowFont = item.fontName;
    //     this.setFont(item.fontName);
    //   });
    // });
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
    // const fontSizeItems = Object.entries(fontSizes).map(
    //   ([liId, fontSizeName]) => {
    //     return {
    //       item: document.querySelector(`#${liId}`),
    //       fontSizeName,
    //     };
    //   }
    // );

    // fontSizeItems.forEach((item) => {
    //   item.item.addEventListener("click", () => {
    //     // 移除所有li元素的selected類別
    //     fontSizeItems.forEach((fontSizeItem) => {
    //       fontSizeItem.item.classList.remove("selected");
    //     });

    //     // 添加selected類別給當前點擊的li
    //     item.item.classList.add("selected");

    //     this.nowFontSize = item.fontSizeName;
    //     this.setFontSize(item.fontSizeName);
    //   });
    // });
  }

  // 主題預覽事件：當游標移到選項上時，出現預覽畫面
  setupThemeOptionEvents() {
    const themeOptions = document.querySelectorAll("#themeMenu li");

    for (const option of themeOptions) {
      option.addEventListener("mouseover", () => this.previewTheme(option.id));
      option.addEventListener("mouseout", () => this.hideThemePreview());
    }

    // themeOptions.forEach((option) => {
    //   option.addEventListener("mouseover", () => {
    //     let themeName = this.nowTheme;
    //     if (option.id === "defaultThemeButton") {
    //       themeName = "default-theme";
    //     } else if (option.id === "lightThemeButton") {
    //       themeName = "light-theme";
    //     } else if (option.id === "nightThemeButton") {
    //       themeName = "night-theme";
    //     } else if (option.id === "natureThemeButton") {
    //       themeName = "nature-theme";
    //     }
    //     // 將網頁主題變成游標所指主題
    //     this.setTheme(themeName);
    //     // 用以下方法捕捉 HTML 畫面
    //     this.captureWebpageScreenshot();
    //     // 顯示預覽畫面
    //     this.themePreview.style.display = "block";
    //     // 恢復原有主題設定
    //     this.setTheme(this.nowTheme);

    //     // 當手動切換主題時，取消自動切換背景功能
    //     clearInterval(this.autoSwitchInterval);
    //     localStorage.setItem("autoSwitchEnabled", "false");
    //     this.autoSwitchButton.classList.remove("selected");
    //   });

    //   // 當游標移開時，取消顯示預覽畫面
    //   option.addEventListener("mouseout", () => {
    //     this.themePreview.style.display = "none";
    //   });
    // });
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

    this.applySettings();
  }

  // 設定主題
  changeTheme(themeName) {
    this.nowTheme = themeName;
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
      this.nowTheme = localStorage.getItem("theme");
      this.applySettings();
    }
  }

  // 檢查主題切換
  checkTheme() {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    const nightModeStartHour = 14;
    const nightModeEndHour = 6;

    let nightTheme = "night-theme";
    let newTheme = this.nowTheme;

    if (hours >= nightModeStartHour || hours < nightModeEndHour) {
      newTheme = nightTheme;
    } else {
      let theme = localStorage.getItem("theme");
      newTheme = theme;
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

  // 刪除項目按鈕的方法，並檢查 completedContainer 內是否還有其他項目
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
