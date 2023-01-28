export const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
export const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const AGED_BRIE = "Aged Brie";
export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name !== AGED_BRIE && this.items[i].name !== BACKSTAGE_PASSES) {
        continue
      }
      else {
        //quality of AB 
        if (this.items[i].name === AGED_BRIE) {
          this.items[i].quality += 2
        }
        else if (this.items[i].name === BACKSTAGE_PASSES) {
          if (this.items[i].sellIn >= 6 && this.items[i].sellIn < 11) {
            this.items[i].quality += 2
          }
          else if (this.items[i].sellIn >= 0 && this.items[i].sellIn < 6) {
            this.items[i].quality += 3
          }
          else if (this.items[i].sellIn >= 11) {
            this.items[i].quality += 1
          }
          else if (this.items[i].sellIn < 0) {
            this.items[i].quality = 0
          }
        }

        if (this.items[i].quality > 50) {
          this.items[i].quality = 50
        }
      }
    }
    return this.items;
  }
}