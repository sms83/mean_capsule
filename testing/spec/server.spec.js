/*describe("person", function(){
    it("Should run", function(){
        console.log("person is running")
    })
    it("should no sleep", function(){
        console.log("Person should not sleep");
    })
}) */

var request = require("request");

var base_url = "http://localhost:4000/tm/";


describe("Server", () => {
    var ser;
    beforeAll(()=> {
        ser = require("../../routes/tasks.routes");
    });
    
    describe("/", function() {
      it("get", function(done) {
        request.get("http://localhost:4000/tm/", function(error, response, body) {
          expect(response.statusCode).toEqual(200);
          done();
        });
      });
  
      it("Add", function(done) {
        request.post("http://localhost:4000/tm/add", {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(400);
            done();
        });
      });
    });
  });