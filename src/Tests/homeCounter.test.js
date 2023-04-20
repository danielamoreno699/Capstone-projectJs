import { TextEncoder, TextDecoder } from 'text-encoding';
import { generateCard } from '../modals/cardGenerator.js';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { JSDOM } = require('jsdom');

describe('generateCard', () => {

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;

    document.body.innerHTML = `
<body>
<main>
<p id="mCount"></p>
<div class="w-75 mx-auto">
    <div class="section-title">
        <h2>Most Trendy Movies:</h2>
    </div>
    <div class="row .movies-grid" id="moviesContainer">
    </div>
</div>
<template id="movieCardTemplate">
    <div class="movie-card col-sm-4">
        <div class="movie-img">
          <img src="./assets/65.jpg" alt="movie cover">
        </div>
        <div class="m-heading">
            <h4>Adam Driver 65</h4>
            <div class="likeContainer">
              <a id="heartButton">♥</a>
              <div class="likeCount">
                <span id="amountLikes">0</span>
                <span>Likes</span>
              </div>
            </div>
        </div>
        <div class="m-details">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="submitMovie">See Comments</button>
        </div>
        <span class="movieID" id="23232"></span>
    </div>
</template>
</main>
</body>`;



});

  test('should generate correact amount of card and check correct amount of likes', async () => {
    const sampleData = {
      results: [
        { item_id: 1, title: 'Movie 1', poster_path: '/movie1.jpg', likes: 5 },
        { item_id: 2, title: 'Movie 2', poster_path: '/movie2.jpg', likes: 0 },
        { item_id: 3, title: 'Movie 3', poster_path: '/movie3.jpg', likes: 5 },
        { item_id: 4, title: 'Movie 4', poster_path: '/movie4.jpg', likes: 9 },
        { item_id: 5, title: 'Movie 5', poster_path: '/movie5.jpg', likes: 15 },
        { item_id: 6, title: 'Movie 6', poster_path: '/movie6.jpg', likes: 7 },
      ],
    };

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ likes: 100 }),
    });

    Object.defineProperty(global, 'fetch', {
      value: fetchMock,
      writable: true,
    });

    const templateMovieCard = document.getElementById('movieCardTemplate');
    const moviesContainer = document.getElementById('moviesContainer');
    const menuTab = document.getElementById('mCount');

    generateCard(sampleData, templateMovieCard, moviesContainer, menuTab);
    //Check if correct amount of cards was created
    expect(moviesContainer.children.length).toBe(5);

    const firstCard = moviesContainer.children[1];
    const likeCount = firstCard.querySelector('#amountLikes');
    //Check if correct amount of likes was sent
    expect(likeCount.innerHTML).toBe("0");
  });
});