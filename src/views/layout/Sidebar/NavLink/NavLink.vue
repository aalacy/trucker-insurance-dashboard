<template>
  <li v-if=" (!childrenLinks || childrenLinks && childrenLinks.length == 0) && isHeader" :class="{headerLink: true, className}">
    <router-link :to="link" class="sidebar-link">
      <img
        v-if="iconName"
        :src="iconName"
        class="icon"
        alt="Account info"
      >
      <span class="mini-icon" v-else>
        {{mini}}
      </span>
      <span>{{header}}</span>  <sup v-if="label" :class="'text-' + labelColor" class="headerLabel">{{label}}</sup>
      <b-badge v-if="badge" variant="primary" pill>{{badge}}</b-badge>
    </router-link>
  </li>
  <li v-else-if="childrenLinks" :class="{headerLink: true, className}">
    <div @click="() => togglePanelCollapse(link)">
      <router-link :to="link" :class="{'router-link-active': false}" event="" class="d-flex sidebar-link">
        <img
          v-if="iconName"
          :src="iconName"
          class="icon"
          alt="Account info"
        >
        <span class="mini-icon" v-else>
          {{mini}}
        </span>
        <span>{{header}}</span> 
        <sup v-if="label" :class="'text-' + labelColor" class="ml-1 headerLabel">{{label}}</sup>
        <div :class="{caretWrapper: true, carretActive: isActive}">
          <font-awesome-icon class="fontawesome" siz="2x" icon="caret-left" />
        </div>
      </router-link>
    </div>
    <b-collapse :id="'collapse' + index" :visible="isActive">
      <ul class="sub-menu">
        <NavLink v-for="link in childrenLinks"
          :activeItem="activeItem"
          :header="link.header"
          :index="link.header"
          :link="link.link"
          :childrenLinks="link.childrenLinks"
          :key="link.header"
          @click.native="tapHeader(link.link)"
        />
      </ul>
    </b-collapse>
  </li>
  <li v-else>
    <router-link :to="index !== 'menu' && link">
      {{header}} <sup v-if="label" :class="'text-' + labelColor" class="headerLabel">{{label}}</sup>
    </router-link>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import { API } from "../../../../api.js";

export default {
  name: 'NavLink',
  props: {
    badge: { type: String, dafault: '' },
    header: { type: String, default: '' },
    iconName: { type: String, default: '' },
    mini: { type: String, default: '' },
    headerLink: { type: String, default: '' },
    link: { type: Object, default: '' },
    childrenLinks: { type: Array, default: null },
    className: { type: String, default: '' },
    isHeader: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    deep: { type: Number, default: 0 },
    activeItem: { type: String, default: '' },
    label: { type: String },
    labelColor: { type: String, default: 'warning' },
    index: { type: String },
  },
  data() {
    return {
      headerLinkWasClicked: false,
      initialOpen: this.isOpen,
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive']),
    togglePanelCollapse(link) {
      this.initialOpen = false
      this.changeSidebarActive(link.name);
      this.headerLinkWasClicked = !this.headerLinkWasClicked
      || !this.activeItem == this.index;
    },

    async tapHeader (item) {
      if (item.name == 'Logout') {
        await this.logout()
      } else {
        this.$emit('update-headerlinks', item.name)
      } 
    },

    async logout(){
      this.loading = true;
      try {
        if (window.FB) {
          window.FB.logout();
        }
        let data = await API.post("users/logout");
        localStorage.removeItem("token");
        if (data.status === "ok") {
          setTimeout(()=>{
            this.myacchide = false;
            localStorage.removeItem("token");
            localStorage.removeItem("userId")
            if (this.$router.history.current.name !== 'Home') {
              this.$router.push({ name: "Home" });
            }
          },500)
        }
      } catch (err) {
        console.error("catch", err);
      } 
    },
  },
  computed: {
    fullIconName() {
      return `fi ${this.iconName}`;
    },
    isActive() {
      return ( this.initialOpen || this.activeItem
      && this.activeItem == this.index
      && this.headerLinkWasClicked);
    },
  },
};
</script>

<style src="./NavLink.scss" lang="scss" scoped />
