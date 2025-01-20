// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
// const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
// const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

import { guardianApiKey, newsApiKey, nytApiKey } from './config';

export const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export const apiConfigs = [
  {
    key: 'newsAPI',
    url: `https://newsapi.org/v2/everything?q=keyword&apiKey=${newsApiKey}`,
  },
  {
    key: 'gaurdianAPI',
    url: `https://content.guardianapis.com/search?api-key=${guardianApiKey}`,
  },
  {
    key: 'nytAPI',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${nytApiKey}`,
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
