// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
// import fetchMock from 'jest-fetch-mock';
// import * as api from './popup.js';
import {
  postComment, getListcomments, displayComment, handleSubmit,
} from './popup.js';

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ success: true }),
}));

describe('postComment function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call fetch with the correct arguments', async () => {
    const data = { item_id: '1', username: 'User1', comment: 'Comment1' };
    await postComment(data);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });

  it('should return the response data from the API', async () => {
    const data = { item_id: 1, username: 'John', comment: 'Great movie!' };
    const expectedResponse = { success: true };

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(expectedResponse),
    }));

    const response = await postComment(data);

    expect(fetch).toHaveBeenCalledWith('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    expect(response).toEqual(expectedResponse);
  });
});

describe('getListcomments', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the list of comments from the API', async () => {
    const mockResponse = [
      { creation_date: '2022-01-01', username: 'User1', comment: 'Comment1' },
      { creation_date: '2022-01-02', username: 'User2', comment: 'Comment2' },
      { creation_date: '2022-01-03', username: 'User3', comment: 'Comment3' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const comments = await getListcomments(123);

    expect(comments).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments/?item_id=123', { method: 'GET' });
  });
});

describe('displayComment', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div>
          <span id="counter-coments"></span>
          <div id="comment-container"></div>
        </div>
      `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetAllMocks();
  });

  it('should render comments with correct content', async () => {
    // Set up mock data
    const comments = [
      { creation_date: '2022-01-01', username: 'User1', comment: 'Comment1' },
      { creation_date: '2022-01-02', username: 'User2', comment: 'Comment2' },
      { creation_date: '2022-01-03', username: 'User3', comment: 'Comment3' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(comments),
    });

    await displayComment();

    const container = document.getElementById('comment-container');
    expect(container).toContainElement(document.querySelector('.row'));

    const rows = container.querySelectorAll('.row');
    expect(rows.length).toBe((3));
  });
});