var should = Should;

// Prompt Name
describe('rockPaperScissors', function(){

  // Tests
  it('should be a function', function(){
    should.exist(rockPaperScissors);
    rockPaperScissors.should.be.a.Function;
  });

  it('should return an array', function(){
    rockPaperScissors().should.be.an.instanceOf(Array);
  });

  it('should return an array of arrays', function(){
    should.exist(rockPaperScissors()[0]);
    rockPaperScissors()[0].should.be.an.instanceOf(Array);
  });

  it('should contain every throw', function(){
    var expected = [["rock","rock","rock"],["rock","rock","paper"],
      ["rock","rock","scissors"],["rock","paper","rock"],
      ["rock","paper","paper"],["rock","paper","scissors"],
      ["rock","scissors","rock"],["rock","scissors","paper"],
      ["rock","scissors","scissors"],["paper","rock","rock"],
      ["paper","rock","paper"],["paper","rock","scissors"],
      ["paper","paper","rock"],["paper","paper","paper"],
      ["paper","paper","scissors"],["paper","scissors","rock"],
      ["paper","scissors","paper"],["paper","scissors","scissors"],
      ["scissors","rock","rock"],["scissors","rock","paper"],
      ["scissors","rock","scissors"],["scissors","paper","rock"],
      ["scissors","paper","paper"],["scissors","paper","scissors"],
      ["scissors","scissors","rock"],["scissors","scissors","paper"],
      ["scissors","scissors","scissors"]];

    var result = rockPaperScissors();

    JSON.stringify(result).should.equal(JSON.stringify(expected));

  });

});
