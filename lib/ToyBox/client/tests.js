var expect = chai.expect;

describe('Main Tests', function(){

  describe('Does it work?', function(){

    it('Should be able to pass.', function(){
      expect(justReturns(true)).to.equal(true);
    });

    it('Should be able to fail.', function(){
      expect(justReturns(true)).to.equal(false);
    })

  });
});