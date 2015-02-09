var expect = chai.expect;
// Declare section
describe('Main Tests', function(){

    // Declare function
  describe('Does it work?', function(){

    // Declare test
    it('Should be able to pass.', function(){
      expect(pointlessFunction(true)).to.equal(true);
    });

    it('Should be able to fail.', function(){
      expect(pointlessFunction(true)).to.equal(false);
    })

    // Declare optional tests by prepending with 'x'
    xit('Should have an optional test', function(){
      expect(pointlessFunction(true)).to.equal(true);
    })
  });
});