<template>
  <div class="pos-rel h-100">
    <div class="containera">
      <div class="sidebar-menu">
        <div class="d-flex menu-item p-1">
          <b class="pl-2">Pro Version</b>
          <div class="ml-auto mr-2" @click="showNav">
            <font-awesome-icon class="fontawesome" :icon="['fas', 'times']" />
          </div>
        </div>
        <div v-for="(item, index) in items" :key="index" class="menu-item navigation-links" style="height: calc(100% - 34px);">
          <router-link
            :to="item.to"
            tag="div"
            class="title-wrapper"
            :class="{
          'has-sub-items': item.subItems,
          active: $route.name.indexOf(item.to.name) === 0
        }"
          >
            <a class="title link">{{ item.title }}</a>
          </router-link>

          <router-link
            v-for="(subItem, subIndex) in item.subItems"
            :key="subIndex"
            :to="subItem.to"
            tag="div"
            exact
            class="sub-item"
          >
            <a class="link">{{ subItem.title }}</a>
          </router-link>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
export default {
  name: "SidebarMenu",
  mounted(){
          this.msg = isMobile
        ? true
        : false
        console.log("isMobileSide",this.msg)
  },
  methods: {
    clicked: function(e) {
      console.log('prevented!')
      e.preventDefault()
    },
    showNav() {
      this.$emit("showNav")
    }
  },
  data() {
    return {
      msg:false,
      showLink: false,
      showLabel:  isMobile
        ? false
        : true,
      showLabelLink: false,
      itemsa:
      [
        {
          
        }
      ],

      items: [
        {
          title: "Your Quote Progress",
          to: { name: "AccountInfo" },
          subItems: [
            { title: "Business Information", to: { name: "AccountInfoPersonalInfo" } },
            {
              title: "Business Structure",
              to: { name: "AccountInfoBusinessStructure" }
            },
            { title: "Cargo Group", to: { name: "AccountInfoCargoGroup" } },
            { title: "Cargo Hauled", to: { name: "AccountInfoCargoHauled" } },
            { title: "Vehicles & Trailers",to:{name:"AccountInfoVehiclesAndTrailers"}},
            { title: "ELD Provider", to: { name: "AccountInfoEldProvider" } },
            { title: "Drivers", to: { name: "AccountInfoDrivers" } },
            { title: "Owner", to: { name: "AccountInfoOwners" } },
            { title: "Comments", to: { name: "AccountInfoQuestions" } },
            {
              title: "Document Upload",
              to: { name: "AccountInfoDocumentUpload" }
            },
            {title:"Sign & Complete", to:{name:"AccountInfoSignComplete"}},
          ]
        },
      ],
        itemMobile: [
        {
          title: "Your Quote Progress",
          to: { name: "AccountInfo" },
          subItems: [
            { title: "Business Information", to: { name: "AccountInfoPersonalInfo" } },
            {
              title: "Business Structure",
              to: { name: "AccountInfoBusinessStructure" }
            },
            { title: "Cargo Group", to: { name: "AccountInfoCargoGroup" } },
            { title: "Cargo Hauled", to: { name: "AccountInfoCargoHauled" } },
            { title: "Vehicles & Trailers",to:{name:"AccountInfoVehiclesAndTrailers"}},
            { title: "ELD Provider", to: { name: "AccountInfoEldProvider" } },
            { title: "Drivers", to: { name: "AccountInfoDrivers" } },
            { title: "Owner", to: { name: "AccountInfoOwners" } },
            { title: " Comments", to: { name: "AccountInfoQuestions" } },
            {
              title: "Document Upload",
              to: { name: "AccountInfoDocumentUpload" }
            },
            {title:"Sign & Complete", to:{name:"AccountInfoSignComplete"}},
          ]
        },
      
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.emergencya {
  background-color: #e3e3e3;
  //  height: 200px;
 
  // display: flex;
  text-align: center;
}
.pos-rel{
  position: relative;
}
.emergency {
  background-color: hsl(0, 0%, 89%);
  //  height: 200px;
  width: 280px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  // display: flex;
  text-align: center;
}
.bt-call {
  border-radius: 12px;
    color: #f7f7f7;
    background-color: #1c4894;
    height: 38px;
    display: block;
    max-width: 148px;
    line-height: 38px;
    margin: 0 auto;
}

.controla {
  position: absolute;
  z-index: 1;
  top: 1%;
}
.ques path   {
    fill: #fff;
}

.ico-btna {
  width: 37px;
  padding: 9px;
  font-size: 11px;
  color: #fff;
  position: absolute;
  left: 0px;
  z-index: 1; 
}

.containera {
  max-height: 100%;
  transition: all 0.5s ease-in-out;
  overflow-y: auto;
  padding-right: 20px;
  height: 100%;
  direction: rtl;
  overflow-y: auto;
  overflow-x: hidden;

  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-bottom: 10px;
    position: absolute;
    z-index: 1;
    top: 0;
    background-color: #5e98f9;
    i {
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      color: #fff;
    }
  }
  &.show {
    width: 250px;
    .control > i {
      color: #fff;
      transform: rotateZ(-180deg);
    }
    .navigation-icons {
      color: #fff;
    }
  }
  .sidebar-menu {
    height: 100%;

    .menu-item {
      background-color: #484f59;
      border-top: 2px solid #6d717a;
     
      direction:ltr;

      .title-wrapper {
        position: relative;
        padding: 0.5rem;
        display: flex;
        // justify-content: center;

        &.has-sub-items {
          padding-bottom: 0.5rem;
        }

        &.active {
          background-color: $color_blue;
         
        }

        &.active:after {
          left: 100%;
          content: '';
          display: block;
          position: absolute;
          right: 0;
          top: 13px;
          width: 0;
          height: 0;
          content: "";
          border-style: solid;
          border-width: 8px 0 8px 8px;
          border-color: transparent transparent transparent #5e98f9;
        }

        .title {
          font-weight: 800;
          font-size: 1.1rem;
           padding-left: 20px;
        }

        .triangle {
          position: absolute;
          top: 20px;
          right: -10px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 0 10px 10px;
          border-color: transparent transparent transparent $color_blue;

          &.has-sub-items {
            top: 15px;
          }
        }
      }

      .sub-item {
        padding: 0.25rem 0.25rem 0.25rem 1.75rem;
        font-size: 18px;

        &.router-link-exact-active {
          .link {
            font-weight: 600;
             text-decoration: underline
          }
        }
      }
    }
    #sidebar.active {
      margin-left: -280px;
    }

    .link {
      color: white;
    }
  }
}
.containeraa {
  // position: absolute;
  top: 165px;
  padding-top: 20px;
  left: 0;
  width: 0px;
    
    height: 147px;
      background-color: #e3e3e3;
    
     /* border: solid #fff; */
  border-width: 0 1px 0 0;
  transition: all 0.5s ease-in-out;
  overflow-y: auto;
  position: relative;
  top: 0px;

  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-bottom: 10px;
    position: absolute;
    z-index: 1;
    top: 0;
    background-color: #5e98f9;
    i {
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      color: #fff;
    }
  }
  &.show {
    width: 280px;
    .control > i {
      color: #fff;
      transform: rotateZ(-180deg);
    }
    .navigation-icons {
      color: #fff;
    }
  }
  .sidebar-menu {
    .menu-item {
      

      .title-wrapper {
        position: relative;
        padding: 1rem 2rem;
        display: flex;
        // justify-content: center;

        &.has-sub-items {
          padding-bottom: 0.5rem;
        }

        &.active {
          background-color: $color_blue;
        }

        .title {
          font-weight: 800;
          font-size: 1.1rem;
         
        }

        .triangle {
          position: absolute;
          top: 20px;
          right: -10px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 0 10px 10px;
          border-color: transparent transparent transparent $color_blue;

          &.has-sub-items {
            top: 15px;
          }
        }
      }

      .sub-item {
        padding: 0.25rem 0.25rem 0.25rem 3.5rem;
        font-size: 1rem;

        &.router-link-exact-active {
          .link {
            font-weight: 600;
          }
        }
      }
    }
    #sidebar.active {
      margin-left: -280px;
    }

    .link {
      color: white;
    }
  }
}
</style>
