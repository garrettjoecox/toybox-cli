var expect = chai.expect;
describe('Main Tests', function(){

  describe('Prime Tester', function(){
    it('Works for even numbers', function(){
      expect(primeTester(10)).to.equal(false);
    });
    it('Works for odd numbers', function(){
      expect(primeTester(3)).to.equal(true);
    });
    it('Works correctly for 2', function(){
      expect(primeTester(2)).to.equal(true);
    });
    it('Works correctly for 1', function(){
      expect(primeTester(1)).to.equal(false);
    });
  });

  describe('Tree Count Leaves', function(){
    it('Returns how many leaves are in a tree (including decendants)', function(){
      var root = new Tree();
      root.countLeaves();
      root.addChild(new Tree());
      root.countLeaves();
      root.addChild(new Tree());
      root.children[0].addChild(new Tree());
      root.children[0].addChild(new Tree());
      root.children[0].children[0].addChild(new Tree());
      expect(root.countLeaves()).to.equal(3);
    });
  });

  describe('Even Occurence', function(){
    it('Find the first item that occurs an even number of times in an array.', function(){
      expect(evenOccurrence(['cat', 'dog', 'dig', 'cat'])).to.equal('cat');
    });

    it('Works with numbers too.', function(){
      expect(evenOccurrence([1, 7, 2, 4, 5, 6, 8, 9, 6, 4])).to.equal(4);
    });
  });

  describe('Rock Paper Scissors', function(){
    it('Defaults number of rounds to 3 and returns 27 arrays', function(){
      expect(rockPaperScissors().length).to.equal(27);
    });
    it('Takes in a number of rounds and returns the correct length', function(){
      expect(rockPaperScissors(4).length).to.equal(81);
    });
  });

});