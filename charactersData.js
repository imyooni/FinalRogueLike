const characters = [
  {
    lv: 1, name: "Terra",
    hp: 50, maxHp: 50,
    mp: 65, maxMp: 65,
    atk: 1,
    def: 1,
    crit: 0,
    elementResis: [0, 0, 0, 0, 0, 0, 0],
    exp: [0,60],
    skills: []
  },
  {
    lv: 1, name: "Locke",
    hp: 85, maxHp: 85,
    mp: 30, maxMp: 30,
    atk: 2,
    def: 2,
    crit: 0,
    elementResis: [0, 0, 0, 0, 0, 0, 0],
    exp: [0,60],
    skills: []
  },
  {
    lv: 1, name: "Cyan",
    hp: 100, maxHp: 100,
    mp: 15, maxMp: 15,
    atk: 4,
    def: 2,
    crit: 0,
    elementResis: [0, 0, 0, 0, 0, 0, 0],
    exp: [0,60],
    skills: []
  },
  {
    lv: 1, name: "Vincent",
    hp: 70, maxHp: 70,
    mp: 40, maxMp: 40,
    atk: 3,
    def: 3,
    crit: 0,
    elementResis: [0, 0, 0, 0, 0, 0, 0],
    exp: [0,60],
    skills: []
  },
    {
    lv: 1, name: "Lightning",
    hp: 65, maxHp: 65,
    mp: 45, maxMp: 45,
    atk: 4,
    def: 1,
    crit: 0,
    elementResis: [0, 0, 0, 0, 0, 0, 0],
    exp: [0,60],
    skills: []
  }
];

// Export a function to get a single character by name
export function Data(name) {
  return characters.find(c => c.name === name);
}
