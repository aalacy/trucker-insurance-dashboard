<template>
  <div class="sidebar-wrapper">
    <nav
      :class="{sidebar: true, sidebarStatic, sidebarOpened}"
      @mouseenter="sidebarMouseEnter"
      @mouseleave="sidebarMouseLeave"
    >
      <header class="mt-2">
        <!-- <router-link to="/app"><span class="primary-word">Sing</span> App</router-link> -->
        <router-link :to="{ name: 'Home' }" class="navbar-brand font-weight-bold ml-1" > 
          <!-- <div class="home_logo_text text-center">LT</div>  -->
          <img class="sidebar-logo" src="../../../assets/images/logo.svg" alt="logo" height="46px" width="269px">
        </router-link>
        <!-- <hr role="separator" aria-orientation="horizontal" class="mb-0 v-divider">
        <ul class="nav avatar" >
          <NavLink
            :activeItem="activeItem"
            :header="username"
            :link="{name: 'avatar'}"
            :iconName="avatar"
            index="avatar"
            isHeader
            :childrenLinks="headerLinks"
          />
        </ul>
        <hr role="separator" aria-orientation="horizontal" class="mb-0 mt-0 v-divider"> -->
      </header>

      <ul class="nav" >
        <NavLink
          v-for="(item, index) in items" :key="index"
            :activeItem="activeItem"
            :header="item.header"
            :link="item.link"
            :iconName="item.icon"
            :mini="item.mini"
            :isOpen="item.isOpen"
            :index="item.link.name"
            :isHeader="!item.subItems"
            :childrenLinks="populateChildren(item)"
            @update-headerlinks="updateHeaderLinks"
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '../../../core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      avatar: '/img/tracktor.png',
      username: 'John',
      headerLinks: [
        {
          header: 'View Quotes',
          link: { name: 'AccountInfo'}
        },
        {
          header: 'Logout',
          link: { name: 'Logout' }
        }
      ],
      logoutLinks: {
            header: 'Logout',
            link: { name: 'Logout' }
          }
    };
  },

  props: {
    items: {
      type: Array,
      default: []
    }
  },

  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    populateChildren (item) {
      let subItems = []
      if (item.subItems && item.subItems.length > 0) {
        item.subItems.map(sub => {
          subItems.push(sub)
        })
      } 
      return subItems
    },

    setActiveByRoute() {
      // const paths = this.$route.fullPath.split('/');
      // paths.pop();
      this.changeSidebarActive(this.$router.history.current.name);
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },

    updateHeaderLinks (cur) {
      if (cur == 'AccountInfo') {
        this.headerLinks = [
          {
            header: 'My Account',
            link: { name: 'QuotesAllQuotes'}
          },
          this.logoutLinks
        ]
      } else if (cur == 'QuotesAllQuotes') {
        this.headerLinks = [
          {
            header: 'View Quotes',
            link: { name: 'AccountInfo'}
          },
          this.logoutLinks
        ]
      }
    }
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>

<style lang="scss">
  .sidebar-logo {
    //min-width: 180px;
  }
</style>