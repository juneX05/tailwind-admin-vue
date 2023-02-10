import '../js/libs/forms.js'
import '../js/libs/components.js'

/**
 * Drag & Drop Library
 * @see https://github.com/SortableJS/Sortable
 */
import Sortable from "sortablejs";


/**
 * Collapse/Accordion Library
 * @see https://github.com/michu2k/Accordion
 */
import Accordion from "accordion-js";

/**
 * Scrollbar Library
 * @see https://github.com/Grsmto/simplebar
 */
import SimpleBar from "simplebar";

/**
 * Date Utility Library
 * @see https://day.js.org/
 */
import dayjs from "dayjs";

/**
 * Code highlighting library
 * JUST FOR DEMO PURPOSE ONLY FOR HIGHLIGHTING CODE
 * IF YOU DON'T NEED THIS IN THE YOUR APPLICATION
 * REMOVE THIS CODE
 * @see https://highlightjs.org/
 */
// import hljs from "highlight.js/lib/core";
// import xml from "highlight.js/lib/languages/xml";
// import javascript from "highlight.js/lib/languages/javascript";

/**
 *  Breakpont Service
 */
import Breakpont from "./services/breakpoint";

/**
 * Darkmode Service
 */
import DarkMode from "./services/darkMode";

/**
 * Monochrome Mode Service
 */
// import MonochromeMode from "./services/monochromeMode";

/**
 * Notification Service
 */
// import Notification from "./services/notification";

/**
 * Clipboard Service
 */
// import Clipboard from "./services/clipboard";

/**
 * Helper Functions
 */
import * as helpers from "./utils/helpers";

/**
 * Popper JS
 * @see https://popper.js.org/
 */
import {Popper, PopperMultiple} from "./components/popper";

/**
 * Tab Component
 */
import Tab from "./components/tab";

/**
 * Tab Component
 */
import Modal from "./components/modal";

/**
 * Drawer Component
 */
import Drawer from "./components/drawer";

/**
 * Tooltip Component
 */
import * as tooltip from "./components/tooltip";

/**
 * Register HTML, XML, JS language for highlight.js
 * JUST FOR DEMO PURPOSE ONLY FOR HIGHLIGHTING CODE
 * IF YOU DON'T NEED THIS IN THE YOUR APPLICATION
 * REMOVE THIS CODE
 */
// hljs.registerLanguage("xml", xml);
// hljs.registerLanguage("javascript", javascript);
// hljs.configure({ ignoreUnescapedHTML: true });

window.Sortable = Sortable;
/**
 * Application Services
 */
window.$breakpoint = new Breakpont();
window.$darkmode = new DarkMode();
// window.$monochromemode = new MonochromeMode();
// window.$notification = Notification;
// window.$clipboard = Clipboard;

window.helpers = helpers;
window.Popper = Popper;
window.PopperMultiple = PopperMultiple;
// window.Tab = Tab;
window.Modal = Modal;
window.Drawer = Drawer;

// window.hljs = hljs; // JUST FOR DEMO PURPOSE ONLY FOR HIGHLIGHTING CODE
window.Accordion = Accordion;
window.SimpleBar = SimpleBar;
window.dayjs = dayjs;
// window.tooltip = tooltip;

const PRELOADER_CLASS = "app-preloader";
const ROOT_APP_ID = "root";


const DARKMODE_TOGGLE_BTN_CLASS = "darkmode-toggle";
const MONOCHROME_TOGGLE_BTN_CLASS = "monochrome-toggle";

const NOTIFICATION_WRAPPER_ID = "notification-wrapper";
const NOTIFICATION_REF_ID = "notification-ref";
const NOTIFICATION_BOX_ID = "notification-box";

// const SEARCHBAR_WRAPPER_ID = "searchbar-wrapper";
// const SEARCHBAR_REF_ID = "searchbar-ref";
// const SEARCHBAR_BOX_ID = "searchbar-box";
//
// const MOBILE_SEARCHBAR_CLASS = "mobile-searchbar";
// const MOBILE_SEARCHBAR_SHOW_CLASS = "mobile-searchbar-show";
// const MOBILE_SEARCHBAR_HIDE_CLASS = "mobile-searchbar-hide";
// const MOBILE_SEARCHBAR_INPUT_CLASS = "mobile-searchbar-input";

const PROFILE_WRAPPER_ID = "profile-wrapper";
const PROFILE_REF_ID = "profile-ref";
const PROFILE_BOX_ID = "profile-box";

const NOTIFICATION_TAB_CLASS = "notification-tab-wrapper";
// const SEARCH_TAB_CLASS = "search-tab-wrapper";
// const MOBILE_SEARCH_TAB_CLASS = "mobile-search-tab-wrapper";
// const RIGHT_SIDEBAR_TAB_CLASS = "right-sidebar-tab-wrapper";

const TABLE_SEARCH_CLASS = "table-search-wrapper";
const TABLE_SEARCH_INPUT_CLASS = "table-search-input";
const TABLE_SEARCH_TOGGLE_CLASS = "table-search-toggle";

export default class Main {
  _html = document.documentElement;
  _body = document.body;
  _root = document.querySelector(`#${ROOT_APP_ID}`);

  currentLocation = helpers.getCurrentLocation();

  popperNotification = null;
  popperSearchbar = null;
  popperProfile = null;
  sidebarNav = null;
  notificationTab = null;
  // rightSidebarTab = null;

  /**
   * The constructor method is a special method of a class
   * for creating and initializing an object instance of that class.
   */
  constructor() {
    this._uiInit();
  }

  _uiInit() {

    // this._uiInitDarkModeBtn();
    //
    // this._uiInitNotification();
    //
    // this._uiInitNotificationTab();

  }


}
