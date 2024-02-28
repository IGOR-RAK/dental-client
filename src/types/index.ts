export interface Avatar {
  slug: string;
  alt: string;
}

export interface Item {
  id: number;
  title: string;
  avatar: Avatar | null;
}

export interface IMySelect {
  placeholder: string;
  items: Item[];
  isFirstItemIsDefault: boolean;
  clickHandler(item: Item): void;
}

export interface IMySelectItem {
  item: Item;
  clickHandler(item: Item): void;
}
