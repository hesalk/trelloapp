import cardModel from '../src-rasmus/cardModel.js';
import assert from 'assert';

console.log(cardModel.addCard);

describe('CardModel', function(){
  it('should return array with card object', function(){
    let listTitle = 'Title1';
    let cardTitle = 'CardTitle1';
    let cardDescription = 'cardComment that can be pretty long.';
    let date = '13/02/2019 - 10:54';
    let comments = ['comment number 1', 'comment number 2'];
    let boardId = '123456';
    cardModel.addCard(0, listTitle, cardTitle, cardDescription, date, comments);
    listTitle = 'Title2';
    cardTitle = 'CardTitle2 with extra text';
    cardDescription = 'cardComment that can be pretty long. This one is even longer that the previous one.';
    date = '13/02/2020 - 10:54';
    comments = [];
    boardId = '123';
    cardModel.addCard(1, listTitle, cardTitle, cardDescription, date, comments);
    assert.deepStrictEqual(cardModel.getCards(), [{id: 0, listTitle: 'Title1', cardTitle: 'CardTitle1', cardDescription: 'cardComment that can be pretty long.', date: '13/02/2019 - 10:54', comments: ['comment number 1', 'comment number 2'], },
    {id: 1, listTitle: 'Title2', cardTitle: 'CardTitle2 with extra text', cardDescription: 'cardComment that can be pretty long. This one is even longer that the previous one.', date: '13/02/2020 - 10:54', comments: [],}]);
  })
  it('should remove obj from array', function(){
    cardModel.addCard(0, 'listTitle0', 'cardTitle0', 'cardComment0');
    cardModel.addCard(1, 'listTitle1', 'cardTitle1', 'cardComment1');
    cardModel.addCard(2, 'listTitle2', 'cardTitle2', 'cardComment2');
    cardModel.addCard(3, 'listTitle3', 'cardTitle3', 'cardComment3');
    cardModel.addCard(4, 'listTitle4', 'cardTitle4', 'cardComment4');
    cardModel.removeCard(1)
    assert.deepStrictEqual(cardModel.getCards(), [
      {id: 0, listTitle: 'listTitle0', cardTitle: 'cardTitle0', cardComment: 'cardComment0',},
      {id: 2, listTitle: 'listTitle2', cardTitle: 'cardTitle2', cardComment: 'cardComment2',},
      {id: 3, listTitle: 'listTitle3', cardTitle: 'cardTitle3', cardComment: 'cardComment3',},
      {id: 4, listTitle: 'listTitle4', cardTitle: 'cardTitle4', cardComment: 'cardComment4',},
    ]
)
  })
})
