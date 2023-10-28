const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("API Tests", () => {
  let createdBookId;


  // Test POST /api to create a new book
  it("POST /api should create a new book", async () => {
    const newBook = {
      name: "Alice In WonderLand v2",
    };

    const res = await request(app).post("/api").send(newBook);

    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("Book created successfully🎉");
    expect(res.body.newBook).to.have.property("_id");
    createdBookId = res.body.newBook._id;
  });

  // Test POST /api to create a new book with existing name
  it("POST /api should create a new book with existing name", async () => {
    const existingBook = {
      name: "Alice In WonderLand v2",
    };

    const res = await request(app).post("/api").send(existingBook);

    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal(
      'Book with name "Alice In WonderLand v2" already exists'
    );
    //createdBookId = res.body.newBook._id;
  });

  // Test GET /api/:bookID to retrieve the created book
  it("GET /api/:bookID should retrieve the book just created", async () => {
    const res = await request(app).get(`/api/${createdBookId}`);
    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body.book).to.have.property("_id");
    expect(res.body.book.name).to.equal("Alice In WonderLand v2");
  });

  it("GET /api/books should retrieve all books", async () => {
    const res = await request(app).get("/api/books");
    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object"); // Expect the response to be an object
    // You can add more specific checks for the response data if needed
  });
  
  
  // Test PUT /api/:bookID to update the created book
  it("PUT /api/:bookID should update the created book", async () => {
    const updatedBook = {
      name: "Harry Potter",
    };

    const res = await request(app)
      .put(`/api/${createdBookId}`)
      .send(updatedBook);

    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Book updated successfully");

    // Verify that the book's name has been updated
    const getRes = await request(app).get(`/api/${createdBookId}`);
    console.log("Response:", res.status, res.body);
    expect(getRes.status).to.equal(200);
    expect(getRes.body.book.name).to.equal("Harry Potter");
  });

  // Test DELETE /api/:bookID to delete the created book
  it("DELETE /api/:bookID should delete the created book", async () => {
    const res = await request(app).delete(`/api/${createdBookId}`);
    console.log("Response:", res.status, res.body);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Book deleted successfully🗑️");

    // Verify that the book has been deleted
    const getRes = await request(app).get(`/api/${createdBookId}`);
    console.log("Response:", res.status, res.body);
    expect(getRes.status).to.equal(404);
    expect(getRes.body.message).to.equal("Book not found");
  });
});
