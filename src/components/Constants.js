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
  landing: 'landing',
  Feeds: 'Feeds',
  mainFeed: 'mainFeed',
  login: 'login',
  signup: 'signup',
  personalInfo: 'personalInfo',
  balanceFeed: 'balanceFeed',
  battleFeed: 'battleFeed',
  makePoll: 'makePoll',
  pollingResult: 'pollingResult',
  balanceResult: 'balanceResult',
  comment: 'comment',
  profile: 'profile',
  menu: 'menu',
  profileImageSelection: 'profileImageSelection',
  battlePost: 'battlePost',
  search: 'search',
  myPolls: 'myPolls',
  myVotedPolls: 'myVotedPolls',
  likeTagSelect: 'likeTageSelect',
};

export const type_text = {
  polling: '폴링',
  balance: '밸런스',
  battle: '배틀',
  makePoll: '투표 생성',
};

export const selection = {
  none: 0,
  selectFormer: 1,
  selectLatter: 2,
};

export const type_color = {
  polling: '#FE8C68',
  balance: '#FF5050',
  battle: '#6373FF',
  makePoll: '#FE8C68',
  border: '#1E1E1E',
  gray: '#797979',
  disablePressableButton: '#a3a3a3',
  lightGray: '#D0D0D0',
  //lightBackground: '#E9E9E9',
  lightBackground: '#F2F2F2',
  button_default: '#434343',
  button_upload: '#FF5050',
};

export const type_font = {
  jua: 'BMJUA_ttf',
  appleM: 'AppleSDGothicNeoM',
  appleB: 'AppleSDGothicNeoB',
  appleL: 'AppleSDGothicNeoL',
  ggodic40: 'HGGGothicssi_Pro_40g',
  ggodic60: 'HGGGothicssi_Pro_60g',
  ggodic80: 'HGGGothicssi_Pro_80g',
  roundR: 'TmoneyRoundWindRegular',
  cafe24: 'Cafe24Ohsquare',
};

export const select_color = {
  0: '#a3a3a3',
  1: '#FF6E6E',
  2: '#5E64ED',
  3: '#5DBA77',
  4: '#F03FFF',
  5: '#F0A91E',
  6: '#A93BFF',
};

export const baseUrl =
  'http://ec2-3-39-226-193.ap-northeast-2.compute.amazonaws.com:57043';

export const url = {
  searchTag: baseUrl + '/searchtag',
  recommendTag: baseUrl + '/rectag',
  postPolling: baseUrl + '/postpolling',
  postBalance: baseUrl + '/postbalance',
  postBattle: baseUrl + '/postbattle',
  login: baseUrl + '/login',
  signup: baseUrl + '/signup',
  postLoad: baseUrl + '/top/',
  resultLoad: baseUrl + '/result/',
  voteSelect: baseUrl + '/vote',
  ageResult: baseUrl + '/detail/age/',
  genderResult: baseUrl + '/detail/gender/',
  mbtiResult: baseUrl + '/detail/mbti/',
  profile: baseUrl + '/profile',
  nameChange: baseUrl + '/namechange',
  prefixChange: baseUrl + '/prefixchange',
  commentLoad: baseUrl + '/comments/',
  commentPost: baseUrl + '/postcomment',
  dynamicLink: baseUrl + '/dynamiclink',
  profImgs: baseUrl + '/profimgs',
  imageChange: baseUrl + '/imagechange',
  voteLoad: baseUrl + '/view/',
  battleLoad: baseUrl + '/view/battle',
  battleResult: baseUrl + '/battleresult/',
  chattingLoad: baseUrl + '/battlechat/',
  userToken: baseUrl + '/update/usertoken',
  search: baseUrl + '/search',
  chattingPost: baseUrl + '/upload/chat',
  battleReward: baseUrl + '/battle/reward/',
  myPolls: baseUrl + '/madeby/',
  myVoted: baseUrl + '/doneby/',
  likeVotePost: baseUrl + '/upload/linkpoll',
  getSelection: baseUrl + '/getselection/',
  delete: baseUrl + '/delete/',
};

export const avatarExample = {
  avatar1: require('../../assets/images/avatar1.png'),
  avatar2: require('../../assets/images/avatar2.png'),
  avatar3: require('../../assets/images/avatar3.png'),
};
