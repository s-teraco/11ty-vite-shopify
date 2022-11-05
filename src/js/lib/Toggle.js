export default class Toggle {
  constructor(ele, options) {
    this.DOM = {};
    this.DOM.btn = document.querySelectorAll(ele);
    this.DOM.target = document.querySelector("html");

    this.defaultOptions = {
      focusTarget: false,
      hiddenTarget: false,
      overlay: false,
      relation: false,
      activeClass: false,
      focusOut: false,
      label: false,
    };
    this.options = Object.assign(this.defaultOptions, options);

    this.objectName = ele.substring(4);

    // フォーカス
    if (this.options.focusTarget !== false) {
      this.DOM.focusTarget = document.querySelector(this.options.focusTarget);
    }

    // リレーション
    if (this.options.relation !== false) {
      if (Array.isArray(this.options.relation)) {
        this.DOM.relation = [];
        this.relationObjectName = [];
        this.options.relation.forEach((val) => {
          this.DOM.relation.push(document.querySelector(val));
          this.relationObjectName.push(val.substring(4));
        });
      } else {
        this.DOM.relation = document.querySelector(this.options.relation);
        this.relationObjectName = this.options.relation.substring(4);
      }
    }

    // aria-hidden
    if (this.options.hiddenTarget !== false) {
      this.DOM.hiddenTarget = document.querySelector(this.options.hiddenTarget);
    }

    // console.log(this.DOM.btn);
    if (this.DOM.btn !== null) {
      this.DOM.btn.forEach((elem) => {
        elem.addEventListener("click", this._toggle.bind(this), { passive: true });
      });
    }
  }

  _toggle(e) {
    const isExpanded = e.currentTarget.getAttribute("aria-expanded") !== "false";
    e.currentTarget.setAttribute("aria-expanded", !isExpanded);

    // activeのクラス名
    if (this.options.activeClass) {
      const activeClass = e.currentTarget.getAttribute("data-active");

      this.DOM.target = document.querySelector(activeClass);
      this.objectName = activeClass.substring(1);
    }

    // フォーカスを外す
    if (this.options.focusOut) {
      e.currentTarget.blur();
    }

    // ラベルの付け替え
    if (this.options.label) {
      const label = isExpanded ? this.options.label.open : this.options.label.close;
      e.currentTarget.querySelector(this.options.label.el).innerText = label;
    }

    this.DOM.target.classList.toggle(`is-${this.objectName}Active`);

    // relation
    if (this.options.relation !== false) {
      if (Array.isArray(this.options.relation)) {
        this.DOM.relation.forEach((val, i) => {
          if (val !== null) {
            val.setAttribute("aria-expanded", !isExpanded);
            this.DOM.target.classList.remove(`is-${this.relationObjectName[i]}Active`);
          }
        });
      } else {
        this.DOM.relation.setAttribute("aria-expanded", !isExpanded);
        this.DOM.target.classList.remove(`is-${this.relationObjectName}Active`);
      }
    }

    // aria-hidden
    if (this.options.hiddenTarget !== false) {
      const isHidden = this.DOM.hiddenTarget.getAttribute("aria-hidden") !== "false";
      this.DOM.hiddenTarget.setAttribute("aria-hidden", !isHidden);
    }

    // フォーカス
    if (this.options.focusTarget !== false && !isExpanded) {
      this.DOM.focusTarget.focus();
    }

    // オーバーレイ
    if (this.options.overlay) {
      document.documentElement.classList.toggle("is-overlayActive");
      document.documentElement.classList.toggle("-noScrolling");
    }
  }
}
