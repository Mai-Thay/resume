export const resumes = [
  {
    id: 1,
    userId: 1,
    name: 'Александра',
    secondName: 'Дмитриевна',
    lastName: 'Липинская',
    birthday: '13.05.1988',
    location: 'Тула',
    phones: [9207623368],
    emails: ['lipinskaya.ad@gmail.com', 'alipinskaya@lanit.ru'],
    profileId: 1,
    tagsId: [1, 2, 3, 4, 5],
    telegram: '@alipinskaya',
    skype: 'fine_tremor',
    commonExperience: [
      {
        beginDate: '03.2012',
        endDate: '04.2016',
        company: {
          name: 'DIERA.RU',
          location: 'Тула',
          website: 'https://www.diera.ru/'
        },
        position: 'Программист',
        description: '<span>1.Создание сайтов (полный цикл: верстка + интеграция с cms) на различных cms:  modx, wordpress, bitrix<br>2. Занималась тех поддержкой текуших сайтов компании + сео доработками<br>3. Писала на php парсеры, делала интеграции с разными сервисами</span>'
      },
      {
        beginDate: '06.2016',
        endDate: '08.2020',
        company: {
          name: 'Smartech (дочерняя компания ООО Еваппс)',
          location: 'Тула',
          website: 'https://evapps.ru/'
        },
        position: 'Fullstack разработчик',
        description: '<span>Php:<br>1. Занимаюсь разработкой на фреймворках laravel, symfony <br>2. Разрабатывала  rest api  и  админ панели для мобильных приложений и клиент серверных веб приложений<br>3. Работала с базами данных MySQL, percona, mariaDb. Занималась составлением запросов на SQL, работала с ORM. Проектировала базы данных.<br>4. Работала с кэшем: memcache, redis (так же использовала редис как nosql хранилище данных) <br>5. Использовала сервис очередей RabbitMq<br>6. Разрабатывала на cms bitrix. Работала как на чистом битрикс, так и на bitrix + symfony. Работала с битрикс orm и ядром d7<br>7. Занималась интеграцией с различными почтовыми сервисами, а так же сервисами смс рассылок, занималась настройкой push уведомлений<br>8. Имела опыт интеграции с ЕСИА, эквайрингом от Сбербанка<br>9. Имею опыт базового администрирования веб серверов + опыт работы с Docker (docker-compose).<br><br>А так же занималась интегрцией со связкой prometheus+grafana, интеграцией с exponea, использовала api dadata, yandex  карт. Приходилось так же заниматься выгрузкой фидов для различных систем<br><br>JS:<br>1. Занималась в том числе vanilla js и es6+<br>2. Достаточно долго принимала участие в разработке клиентской части приложения на vue.js + vuex. Занималась разработкой spa приложений, а так же использовала vue как подкючаемую библиотеку. Имею небольшой опыт на react, angular.js и angular<br>4. Занимаюсь версткой (в последнее время меньше с ростом тенденции передавать ее верстальщикам), но все же могу сверстать "по макету", знаю препроцессоры css - less и scss, отдаю предпочтение scss. Могу сверстать по bootstrap, или без использования каких либо ui библиотек. Знаю чем flex отличается от grid.<br>5. Работаю с npm, nvm (node version manager), yarn<br>6. Работала со сборщиками, в основном webpack, в большинстве работала с готовыми конфигурациями, но приходилось в том числе и вносить изменения в конфигурации<br><br>Из прочего:<br>1. Некоторое время выполняла обязанности тим лида: составляла оценки, занималась ревью кода, проводила собеседования, писала программы обучения для стажеров и т. д. <br>2. Проводила летнюю стажировку для студентов<br>3. Проводила презентацию  по vue.js для местных студентов заинтересованных в IT специальностях</span>'
      },
      {
        beginDate: '09.2020',
        company: {
          name: 'Ланит',
          location: 'Москва',
          website: 'https://lanit.ru/'
        },
        position: 'Frontend разработчик',
        description: '<span>Разработка клиентской части веб приложений с использованием различных технологий. Написание кросплатформенного мобильного приложения.</span>'
      }
    ],
    lanitExperience: [
      {
        project: 'ЕАТ - единый агрегатор торговли',
        position: 'Frontend разработчик (аутсорсер от компании Еваппс)',
        tagsId: [1, 2, 3, 5, 12, 17, 24, 25, 23, 47]
      },
      {
        project: 'Элпасс - сайт',
        position: 'Frontend разработчик (аутсорсер от компании Еваппс)',
        tagsId: [1, 2, 3, 5, 12, 25, 23, 47]
      },
      {
        project: 'Элпасс - административная панель',
        position: 'Frontend разработчик (аутсорсер от компании Еваппс)',
        tagsId: [1, 2, 3, 8]
      },
      {
        project: 'Элпасс - разработка сервисов бекенда',
        position: 'Backend разработчик (аутсорсер от компании Еваппс)',
        tagsId: [14, 67]
      },
      {
        project: 'ИАС - открытая часть на vueJs и закрытая на react',
        position: 'Frontend разработчик (аутсорсер от компании Еваппс)',
        tagsId: [1, 2, 3, 5, 12, 25, 23, 47, 10, 51]
      },
      {
        project: 'ГМУ - мобильное приложение',
        position: 'Frontend (мобильный) разработчик',
        tagsId: [10, 11, 51, 55]
      },
    ]
  },
  {
    id: 2,
    userId: 2,
    name: 'Павел',
    secondName: 'Анатольевич',
    lastName: 'Минаев',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [6, 7, 8, 9, 10]
  },
  {
    id: 3,
    userId: 3,
    name: 'Антон',
    secondName: 'Серргеевич',
    lastName: 'Чембуров',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 2, 9, 10, 11, 12]
  },
  {
    id: 4,
    userId: 4,
    name: 'Иван',
    secondName: 'Иванович',
    lastName: 'Васнецов',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 2,
    tagsId: [10, 11, 12, 13, 14, 15]
  },
  {
    id: 5,
    userId: 5,
    name: 'Инесса',
    secondName: 'Владимировна',
    lastName: 'Зайцева',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 3,
    tagsId: [16, 17, 18, 19, 20, 21, 22]
  },
  {
    id: 6,
    userId: 6,
    name: 'Альфред',
    secondName: 'Игоревич',
    lastName: 'Столяров',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 3,
    tagsId: [1, 3, 4]
  },
  {
    id: 7,
    userId: 7,
    name: 'Дмитрий',
    secondName: 'Борисович',
    lastName: 'Ентин',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  {
    id: 8,
    userId: 8,
    name: 'Антон',
    secondName: 'Юрьевич',
    lastName: 'Чекалин',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  {
    id: 9,
    userId: 9,
    name: 'Алена',
    secondName: 'Юрьевна',
    lastName: 'Карпова',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  {
    id: 10,
    userId: 10,
    name: 'Дарья',
    secondName: 'Дмитриевна',
    lastName: 'Липинская',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  {
    id: 11,
    userId: 11,
    name: 'Вадим',
    secondName: 'Викторович',
    lastName: 'Вознесенский',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  {
    id: 12,
    userId: 12,
    name: 'Илья',
    secondName: 'Михайлович',
    lastName: 'Сорокин',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  {
    id: 13,
    userId: 13,
    name: 'Андрей',
    secondName: 'Юрьевич',
    lastName: 'Эм',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
  ,
  {
    id: 14,
    userId: 14,
    name: 'Илья',
    secondName: 'Игоревич',
    lastName: 'Абрамов',
    birthday: '01.01.1980',
    location: 'Москва',
    profileId: 1,
    tagsId: [1, 3, 4, 5, 6, 7]
  },
];
