// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
// const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
// const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

export const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export const apiConfigs = [
  {
    key: 'newsAPI',
    url: `https://newsapi.org/v2/everything?q=keyword&apiKey=603fc2b08dea422db8117a411f1807c8`,
  },
  {
    key: 'gaurdianAPI',
    url: `https://content.guardianapis.com/search?api-key=1fe58b47-f5f8-42b2-8a0b-51d554a9845a`,
  },
  {
    key: 'nytAPI',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=V6VQfOCu6we92G0rzcYkLegPFzDHLAFg`,
  },
];

export const placeholderImage =
  'https://picsum.photos/id/870/200/300?grayscale&blur=2';

export const NavigationMenu = [
  {
    label: 'News Api',
    path: '/news-api',
  },
  {
    label: 'Guardian Api',
    path: '/guardian-news',
  },
  {
    label: 'New York Times Api',
    path: '/nyt-news',
  },
];
