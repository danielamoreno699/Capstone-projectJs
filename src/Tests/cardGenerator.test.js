import { getTrendingData } from '../cardGenerator.js';
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

document.body.innerHTML = `
<body>
<main>
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
</body>`

const templateMovieCard = document.getElementById('movieCardTemplate');
const moviesContainer = document.getElementById('moviesContainer');
const form = document.getElementById('submit');

describe('getTrendingData', () => {
    it('fetches data from the TMDB API and generates a card', async () => {
        const mockResponse = { results: [{ id: 1, title: 'Movie 1' }] };
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(mockResponse),
          })
        );
        
        const trendingData = await getTrendingData();
        expect(trendingData).toContain(mockResponse.results[0].title);
      });      
});
