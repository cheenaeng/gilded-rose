import { Item, GildedRose } from "@/gilded-rose";
import { BACKSTAGE_PASSES, SULFURAS, AGED_BRIE } from "@/gilded-rose";


const getItemProperty = (sellIn: number, quality: number, productName: string) => {
  return new GildedRose([new Item(productName, sellIn, quality)]).updateQuality()[0]
}

describe("Gilded Rose", () => {
  it("should foo", () => {
    const { name } = getItemProperty(0, 0, 'foo')
    expect(name).toBe("foo");
  });
  //quality will not be negative 
  test("item quality should not be negative", () => {
    const qualityInput = 0
    const sellInInput = -1
    const expectedQuality = 0
    const { quality } = getItemProperty(sellInInput, qualityInput, 'foo')
    expect(quality).toBe(expectedQuality);
  });

});

describe("quality of AB", () => {
  test("if not past expiry should increase by 2", () => {
    const qualityInput = 0
    const sellInInput = 0
    const expectedQuality = qualityInput + 2
    const { quality } = getItemProperty(sellInInput, qualityInput, AGED_BRIE)
    expect(quality).toBe(expectedQuality);
  });
  test("quality of AB if past expiry- should not be reduced to 0, should increase by 2", () => {
    const qualityInput = 2
    const sellInInput = -1
    const expectedQuality = qualityInput + 2
    const { quality } = getItemProperty(sellInInput, qualityInput, AGED_BRIE)
    expect(quality).toBe(expectedQuality);
  });

  test("quality of AB - should capped at 50", () => {
    const qualityInput = 49
    const sellInInput = 0
    const expectedQuality = 50
    const { quality } = getItemProperty(sellInInput, qualityInput, AGED_BRIE)
    expect(quality).toBe(expectedQuality);
  });

});

describe("quality of backstage passes to TAFKAL80ETC concert ", () => {
  //check if quality <50, quality should increase by 1
  test("if quality is less than 50 and sellIn < 6 but >=0, quality should increase by 2 but quality capped at 50  ", () => {
    const qualityInput = 49
    const sellInInput = 5
    const expectedQuality = 50
    const { quality } = getItemProperty(sellInInput, qualityInput, BACKSTAGE_PASSES)
    expect(quality).toBe(expectedQuality);

  });

  //check if sell in >= 11 
  test("if quality is less than 50 and sellIn >= 11, quality should increase by 1", () => {
    const qualityInput = 45
    const sellInInput = 11
    const expectedQuality = qualityInput + 1
    const { quality } = getItemProperty(sellInInput, qualityInput, BACKSTAGE_PASSES)
    expect(quality).toBe(expectedQuality);

  });

  test("if quality is less than 50 and sellIn < 6 but >=0, quality should increase by 3", () => {
    const qualityInput = 45
    const sellInInput = 5
    const expectedQuality = qualityInput + 3
    const { quality } = getItemProperty(sellInInput, qualityInput, BACKSTAGE_PASSES)
    expect(quality).toBe(expectedQuality);

  });
  //check if sellIn <6,
  test("if quality is less than 50 and sellIn < 11 but >=6, quality should increase by 2 ", () => {
    const qualityInput = 45
    const sellInInput = 7
    const expectedQuality = qualityInput + 2
    const { quality } = getItemProperty(sellInInput, qualityInput, BACKSTAGE_PASSES)
    expect(quality).toBe(expectedQuality);

  });

  // if sellIn <0 - past expiry date, quality drops to 0
  test("if quality is less than 50 and sellIn < 0  quality should  be 0 ", () => {
    const qualityInput = 45
    const sellInInput = -1
    const expectedQuality = 0
    const { quality } = getItemProperty(sellInInput, qualityInput, BACKSTAGE_PASSES)
    expect(quality).toBe(expectedQuality);

  });
});

describe("quality of Sulfuras, Hand of Ragnaros", () => {
  // if sulfuras is past expiry, quality does not drop to 0
  test("if sellIn < 0, quality should be the same ", () => {
    const qualityInput = 45
    const sellInInput = -1
    const expectedQuality = qualityInput
    const { quality } = getItemProperty(sellInInput, qualityInput, SULFURAS)
    expect(quality).toBe(expectedQuality);

  });

  test("if sellIn < 0  quality should be the same and not capped at 50", () => {
    const qualityInput = 80
    const sellInInput = -1
    const expectedQuality = qualityInput
    const { quality } = getItemProperty(sellInInput, qualityInput, SULFURAS)
    expect(quality).toBe(expectedQuality);

  });
});
