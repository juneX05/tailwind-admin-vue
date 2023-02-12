<template>
  <!-- Sidebar -->
  <div class="sidebar sidebar-panel print:hidden">
    <div
        class="flex h-full grow flex-col border-r border-navy-700 bg-navy-750"
    >
      <div class="flex items-center justify-between px-3 pt-4">
        <!-- Application Logo -->
        <div class="flex">
          <a href="/">
            <img
                class="h-11 w-11 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                src="/src/assets/images/app-logo.svg"
                alt="logo"
            />
          </a>
        </div>
        <button @click="uiCloseSidebar"
            class="sidebar-close btn h-7 w-7 rounded-full p-0 text-accent-light/80 hover:bg-navy-300/20 focus:bg-navy-300/20 active:bg-navy-300/25 xl:hidden"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div
          class="nav-wrapper mt-5 h-[calc(100%-4.5rem)] overflow-x-hidden pb-6"
          data-simplebar
      >
        <ul class="flex flex-1 flex-col font-inter">

          <Sidebar></Sidebar>

        </ul>
      </div>

      <div class="flex flex-col p-4">
        <div class="mt-3 px-4">
          <form @submit.prevent = 'logout'>
            <button type="submit"
                    class="btn h-9 w-full space-x-2 bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>

  <!-- App Header Wrapper-->
  <nav class="header print:hidden">
    <!-- App Header  -->
    <div
        class="header-container relative flex w-full bg-white dark:bg-navy-700 print:hidden"
    >
      <!-- Header Items -->
      <div class="flex w-full items-center justify-between">
        <Navbar></Navbar>
      </div>
    </div>
  </nav>

  <slot></slot>
</template>

<script setup>
import { onMounted } from 'vue';

import '../assets/js/app.js'
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import * as helpers from "../assets/js/utils/helpers";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const SIDEBAR_CLASS = "sidebar";
const SIDEBAR_OPEN_CLASS = "is-sidebar-open";
const SIDEBAR_TOGGLE_BTN_CLASS = "sidebar-toggle";
const SIDEBAR_CLOSE_BTN_CLASS = "sidebar-close";
const SIDEBAR_NAV_WRAPPER = "nav-wrapper";
const SIDEBAR_NAV_LINK_CLASS = "nav-link";
const SIDEBAR_NAV_PARENT_CLASS = "nav-parent";

const BODY = document.body;

const SIDEBAR = document.querySelector(`.${SIDEBAR_CLASS}`);

// Declaring the toggle buttons for sidebar
const toggleBtns = document.querySelectorAll(
    `.${SIDEBAR_TOGGLE_BTN_CLASS}`
);

const uiInitSidebar = () => {

  // Closing the sidebar at the breakponts smaller than "XL"
  if (!$breakpoint.xlAndUp) uiCloseSidebar();

  // checking the existing of the left sidebar
  // if (!SIDEBAR) return;

  console.log(toggleBtns);
  // Declaring the close buttons for sidebar
  const closeBtns = document.querySelectorAll(`.${SIDEBAR_CLOSE_BTN_CLASS}`);

  // Closing the sidebar when breakpoint changed
  window.addEventListener("change:breakpoint", () => {
    // if (BODY.classList.contains(SIDEBAR_OPEN_CLASS))
    //   uiCloseSidebar();
    if (!$breakpoint.xlAndUp) {
      console.log('closing')
      uiCloseSidebar()
    } else {
      console.log('opening')
      uiOpenSidebar()
    }
  });

  toggleBtns.forEach((node) =>
      node.addEventListener("click", () => uiToggleSidebar())
  );

  closeBtns.forEach((node) =>
      node.addEventListener("click", () => uiCloseSidebar())
  );
}

const uiInitSidebarNav = () => {
  // Select the navigation links
  const navLinks = document.querySelectorAll(`.${SIDEBAR_NAV_LINK_CLASS}`);
  const navParents = document.querySelectorAll(
      `.${SIDEBAR_NAV_PARENT_CLASS}`
  );

  // checking the existing of the navigation links
  if (!(navLinks.length > 0)) return;

  // Declaring default opened parent active navigation link
  let openOnInit = null;

  // Add index for parent navigation links
  if (navParents) {
    navParents.forEach((node, i) => {
      node.dataset.navParentIndex = i;
    });
  }

  navLinks.forEach((node) => {
    // checking if the HTML element is link
    if (!node.href) return;

    // checking if navigation link have parent
    const parent = node.parentNode.closest(`.${SIDEBAR_NAV_PARENT_CLASS}`);

    // get active and default classes for navigation links from "data-active-class" and "data-default-class"
    const activeClass = node.dataset.activeClass.split(" ");
    const defaultClass = node.dataset.defaultClass.split(" ");

    // cleaning the "href" value of the navigation link
    const href = node.href.split("?")[0].split("#")[0];

    // comparing current link with location
    const isActive = href === helpers.getCurrentLocation();

    if (isActive) {
      node.classList.add(...activeClass);
      setTimeout(() => node.scrollIntoView({ block: "center" }));
      if (parent) {
        openOnInit = parseInt(parent.dataset.navParentIndex);
      }
    } else {
      node.classList.add(...defaultClass);
    }

    node.addEventListener("click", () => {
      if (!$breakpoint.xlAndUp) {
        return uiCloseSidebar()
      }
    })
  });

  new Accordion(`.${SIDEBAR_NAV_WRAPPER}`, {
    onlyChildNodes: false,
    duration: 200,
    openOnInit: [openOnInit],
  });
}

const uiCloseSidebar = () => {
  BODY.classList.remove(SIDEBAR_OPEN_CLASS);
}

const uiOpenSidebar = () => {
  if(!BODY.classList.contains(SIDEBAR_OPEN_CLASS))
    BODY.classList.add(SIDEBAR_OPEN_CLASS);
}

const uiToggleSidebar = () => {
  BODY.classList.toggle(SIDEBAR_OPEN_CLASS);
}

onMounted(() => {
  uiInitSidebar()
  uiInitSidebarNav()
})

const logout = () => {
  router.push('/')
}
</script>