import request from "supertest";
import app from "../src/app";

describe("Gutenberg API", () => {
  describe("/search", () => {
    test("retrieves correct results", async () => {
      const res = await request(app)
        .get(`/gutenberg?query=${encodeURIComponent("Moby Dick")}`)
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8");
      const books = res.body;
      expect(books).toHaveLength(5);
      expect(
        books.filter((book: { id: number }) => book.id === 15),
      ).toHaveLength(1);
    });

    test("retrieves empty list for no results", async () => {
      const res = await request(app)
        .get(`/gutenberg?query=ljkfsdeiweiojfwehiugw`)
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
        .expect("content-type", "application/json");
      const book = res.body;
      expect(book.title).toBe("Moby-Dick; or, The Whale");
      expect(book.authors[0]).toBe("Melville, Herman");
    });
  });
});
