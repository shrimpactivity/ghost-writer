import request from "supertest";
import app from "../src/app";

describe("Gutenberg API", () => {
  describe("/ query search", () => {
    test("retrieves correct results", async () => {
      const res = await request(app)
        .get(`/gutenberg?search=${encodeURIComponent("Moby Dick")}`)
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8");
      const books = res.body;
      expect(books).toHaveLength(5);
      expect(
        books.filter((book: any) => book.id === 15),
      ).toHaveLength(1);
    });

    test("retrieves empty list for no results", async () => {
      const res = await request(app)
        .get(`/gutenberg?search=ljkfsdeiweiojfwehiugw`)
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8");
      const books = res.body;
      expect(books).toHaveLength(0);
    });
  });

  describe("/:id", () => {
    test("retrieves book for valid id", async () => {
      const res = await request(app)
        .get(`/gutenberg/15`)
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8");
      const book = res.body;
      expect(book.title).toBe("Moby-Dick; or, The Whale");
      expect(book.authors[0]).toBe("Melville, Herman");
    });

    test("returns 404 for fake id", async () => {
      await request(app).get(`/gutenberg/5469865151354`).expect(404);
    });

    test("returns 400 for non-integer id", async () => {
      await request(app).get("/gutenberg/text_id").expect(400);
    })
  });
});

describe("Bad url", () => {
  test("returns 404", async () => {
    await request(app).get("/strange-page").expect(404);
  })
})