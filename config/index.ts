const config = {
  service: 'FICT Advisor',
  logo: '/assets/new_logo.png',
  faculty: 'ФІОТ',
  source: 'https://github.com/fictadvisor',
  botId: process.env.NEXT_PUBLIC_BOT_ID ?? '1699479241',
  contacts: {
    bot: process.env.NEXT_PUBLIC_BOT_NAME ?? 'fictadvisor_bot',
    feedbackBot: 'fict_robot',
    scHead: 'gazinaft',
    scChannel: 'fict_time',
    sovaChannel: 'analyticsFICT',
    sovaChannelName: 'ФІОТ СОВА ім. Віри Петрівни',
  },
  roles: {
    user: 'Користувач',
    admin: 'Адміністратор',
  },
  menu: [
    { text: 'Головна', href: '/' },
    { text: 'Викладачі', href: '/teachers' },
    { text: 'Предмети', href: '/subjects' },
    { text: 'Супергерої', href: '/superheroes' },
    { text: 'Допомога', href: '/help' },
  ],
};

export default config;
