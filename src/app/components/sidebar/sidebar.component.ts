import { Component, OnInit, HostListener } from "@angular/core";
import decode from "jwt-decode";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}export
const ROUTES_ADMIN: RouteInfo[] = [
  { path: "/dashboard", title: "Panel", icon: "dashboard", class: "" },
  { path: "/perfil", title: "Mi perfil", icon: "account_circle", class: "" },

  {
    path: "/clientes",
    title: "Gestión de usuarios",
    icon: "content_paste",
    class: "",
  },
  {
    path: "/logout",
    title: "Logout",
    icon: "exit_to_app",
    class: "logout",
  },
];
export
const ROUTES_USER: RouteInfo[] = [
  { path: "/perfil", title: "Mi perfil", icon: "account_circle", class: "" },

  {
    path: "/rutinas",
    title: "Mis entrenamientos",
    icon: "fitness_center",
    class: "",
  },
  {
    path: "/logout",
    title: "Logout",
    icon: "exit_to_app",
    class: "logout",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  setClass: boolean = false;
  public innerWidth;
  constructor() {}

  ngOnInit() {
    // console.log(localStorage.getItem(decode));
    let token = localStorage.getItem("token");
    let decodedToken = decode(token);
    console.log(decodedToken.roles);
    
    if (decodedToken.roles == "[ADMIN]") {
      this.menuItems = ROUTES_ADMIN.filter((menuItem) => menuItem);
    } else if (decodedToken.roles == "[USER]") {
      this.menuItems = ROUTES_USER.filter((menuItem) => menuItem);
    }else{

    }
  }
  
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if ((this.innerWidth = 768)) {
      this.setClass = true;
    } else {
      this.setClass = false;
    }
  }
}
