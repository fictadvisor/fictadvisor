const config = {
  service: 'FICT Advisor',
  logo: '/assets/logo.png',
  faculty: 'ФІОТ',
  source: 'https://github.com/fictadvisor',
  contacts: {
    bot: 'fictadvisor_bot',
    feedbackBot: 'fict_robot',
    scHead: 'irina_kolbun',
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
    { text: 'Допомога', href: '/help' },
  ],
  env: (key, defaultValue: string = null) => process.env[key] ?? defaultValue,
};

export default config;
