var expect = chai.expect;
// Declare section
describe('Main Tests', function(){

    // Declare function
  describe('Does it work?', function(){

    // Declare test
    it('Should be able to pass.', function(){
      expect(1).to.equal(1);
    });

    it('Should be able to fail.', function(){
      expect(1).to.equal(2);
    })

    // Declare optional tests by prepending with 'x'
    xit('Should have an optional test', function(){
      expect(1).to.equal(1);
    })
  });
});