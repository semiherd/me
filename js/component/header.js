import { createNavigationBar } from "../component/navigation-bar/index.js";
import { NavigationItem } from "../component/navigation-bar/navigation-item.js";

export const navitems = [
  { label: "Home", href: "/" },
  // { label: "About", href: "/about" },
  // { label: "Contact", href: "/contact" },
  // {
  //   label: "Portfolio",
  //   children: [
  //     { label: "Article", href: "/articles" },
  //     { label: "Github", href: "/project/repo" },
  //     { label: "Live Demo", href: "/project/demo" },
  //   ],
  // }
];

export function createHeader(id){
    const turquoiseIcon = {
        default: `<path d="M3 12h18M3 6h18M3 18h18"
            stroke="#5f5b64ff" stroke-width="2" stroke-linecap="round"/>`,
        toggle: `<path d="M6 18L18 6M6 6l12 12"
            stroke="#5f5b64ff" stroke-width="2" stroke-linecap="round"/>`,
    }

    const nav= createNavigationBar(id, navitems, {
        component: NavigationItem,
        iconRenderer: turquoiseIcon,
        onMenuToggle: (open) => {},
        // backgroundColor: "#d4c3dbff", 
        backgroundColor: `linear-gradient(236deg,rgba(188, 208, 212, 1) 11%, rgba(171, 224, 224, 1) 52%, rgba(255, 255, 255, 1) 100%);`,
    })
    return nav;
};