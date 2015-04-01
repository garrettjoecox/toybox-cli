var expect = chai.expect;
describe('Main Tests', function(){

  describe('rockPaperScissors', function(){

    it('should contain every throw', function(){
      expect(rockPaperScissors().length).to.equal(27);
    });
    it('should return results for rockPaperScissors(2)', function(){
      expect(rockPaperScissors(2).length).to.equal(9);
    });
    it('should return results for rockPaperScissors(5)', function(){
      expect(rockPaperScissors(5).length).to.equal(243);
    });

  });

});