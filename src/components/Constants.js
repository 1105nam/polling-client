/*
 *
 * Constants - 여러곳에서 사용하는 상수
 *
 */

export const type_id = {
  polling: 'polling',
  balance: 'balance',
  battle: 'battle',
  makePoll: 'makePoll',
};

export const navigation_id = {
  Feeds: 'Feeds',
  mainFeed: 'mainFeed',
  login: 'login',
  signup: 'signup',
  balanceFeed: 'balanceFeed',
  battleFeed: 'battleFeed',
  makePoll: 'makePoll',
};

export const type_text = {
  polling: '폴링',
  balance: '밸런스',
  battle: '전쟁',
  makePoll: '투표 생성',
};

export const type_color = {
  polling: '#FE8C68',
  balance: '#FF5050',
  battle: '#6373FF',
  makePoll: '#FE8C68',
  border: '#1E1E1E',
  gray: '#797979',
  disablePressableButton: '#a3a3a3',
  button_default: '#434343',
  button_upload: '#FF5050',
};

export const type_font = {
  jua: 'BMJUA_ttf',
  appleM: 'AppleSDGothicNeoM',
  appleB: 'AppleSDGothicNeoB',
  appleL: 'AppleSDGothicNeoL',
};

export const baseUrl = 'http://devcap.duckdns.org:57043';

export const url = {
  searchTag: baseUrl + '/searchtag',
  recommendTag: baseUrl + '/rectag',
  postPolling: baseUrl + '/postpolling',
  postBalance: baseUrl + '/postbalance',
  signin: baseUrl + '/signin',
  signup: baseUrl + '/signup',
};
