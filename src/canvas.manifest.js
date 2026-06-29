export const manifest = {
  screens: {
    scr_ehfjim: { name: "Accueil", route: "/#accueil", position: { "x": 160, "y": 220 } },
    scr_61fmgq: { name: "Services", route: "/#services", position: { "x": 1560, "y": 220 } },
    scr_3bktg2: { name: "À Propos", route: "/#apropos", position: { "x": 2960, "y": 220 } },
    scr_co3482: { name: "Contact", route: "/#contact", position: { "x": 4360, "y": 220 } }
  },
  sections: {
    sec_8wqh24: { name: "Main Navigation", x: 0, y: 0, width: 5720, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_8wqh24", children: [
    { kind: "screen", id: "scr_ehfjim" },
    { kind: "screen", id: "scr_61fmgq" },
    { kind: "screen", id: "scr_3bktg2" },
    { kind: "screen", id: "scr_co3482" }]
  }]

};