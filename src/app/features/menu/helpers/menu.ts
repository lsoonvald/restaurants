export const menuLinks = {
  pivnice: 'https://www.pivnice-ucapa.cz/denni-menu.php',
  suzies: 'http://www.suzies.cz/poledni-menu.html',
  menicka: 'https://www.menicka.cz/4921-veroni-coffee--chocolate.html',
};

export const restaurantNames = {
  pivnice: 'Pivnice u Čápa',
  suzies: `Suzie's`,
  menicka: 'Veroni Cafe'
};

export const bulletRegex = /^\s*(?:[\dA-Z]+\.|[a-z]\)|•)\s+/gm;
export const dateRegex = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
export const whitespaceRegex = /\s\s+/;

export interface Restaurant {
  name: string;
  menu: Day[];
}

export interface Day {
  date: string | undefined;
  foods: Food[];
}

export interface Food {
  title: string;
  price: string;
}
