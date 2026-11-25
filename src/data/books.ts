export const categories = ['Классика', 'Фантастика', 'Нон-фикшн', 'Программирование'] as const
export type Category = typeof categories[number]
export type Book = {
  id: string; title: string; author: string; category: Category; price: number;
  rating: number; description: string; cover: number; oldPrice?: number
}

export const books: Book[] = [
  { id: 'master', title: 'Мастер и Маргарита', author: 'Михаил Булгаков', category: 'Классика', price: 690, oldPrice: 860, rating: 4.9, description: 'Москва, визит Воланда и история любви, которой тесно в одном времени.', cover: 0 },
  { id: 'roadside', title: 'Пикник на обочине', author: 'Аркадий и Борис Стругацкие', category: 'Фантастика', price: 590, rating: 4.9, description: 'Сталкер возвращается в Зону, где чужие артефакты меняют человеческие судьбы.', cover: 1 },
  { id: 'habits', title: 'Атомные привычки', author: 'Джеймс Клир', category: 'Нон-фикшн', price: 1040, rating: 4.8, description: 'Как выстроить среду и повседневные действия, которые помогают меняться.', cover: 2 },
  { id: 'code', title: 'Чистый код', author: 'Роберт Мартин', category: 'Программирование', price: 1890, rating: 4.7, description: 'Практика написания, чтения и рефакторинга кода, который проще поддерживать.', cover: 3 },
  { id: 'pride', title: 'Гордость и предубеждение', author: 'Джейн Остин', category: 'Классика', price: 640, rating: 4.8, description: 'Элизабет Беннет пересматривает первые впечатления о мистере Дарси.', cover: 4 },
  { id: 'dune', title: 'Дюна', author: 'Фрэнк Герберт', category: 'Фантастика', price: 960, oldPrice: 1200, rating: 4.9, description: 'На пустынном Арракисе наследник дома Атрейдесов оказывается в центре борьбы за пряность.', cover: 5 },
  { id: 'sapiens', title: 'Sapiens. Краткая история человечества', author: 'Юваль Ной Харари', category: 'Нон-фикшн', price: 1190, rating: 4.8, description: 'Как общие идеи, институты и технологии изменили жизнь нашего вида.', cover: 6 },
  { id: 'pragmatic', title: 'Программист-прагматик', author: 'Эндрю Хант и Дэвид Томас', category: 'Программирование', price: 1690, rating: 4.9, description: 'Инженерные привычки для работы с требованиями, инструментами и меняющимся кодом.', cover: 7 },
  { id: 'anna', title: 'Анна Каренина', author: 'Лев Толстой', category: 'Классика', price: 790, rating: 4.8, description: 'Семейные истории, в которых личный выбор сталкивается с ожиданиями общества.', cover: 0 },
  { id: 'fahrenheit', title: '451° по Фаренгейту', author: 'Рэй Брэдбери', category: 'Фантастика', price: 560, rating: 4.7, description: 'Пожарный из мира, где книги сжигают, начинает сомневаться в своей работе.', cover: 5 },
  { id: 'thinking', title: 'Думай медленно… решай быстро', author: 'Даниэль Канеман', category: 'Нон-фикшн', price: 1290, rating: 4.7, description: 'Почему интуиция иногда подводит и как мы принимаем решения в неопределённости.', cover: 2 },
  { id: 'patterns', title: 'Паттерны проектирования', author: 'Эрик Фримен и Элизабет Робсон', category: 'Программирование', price: 2190, rating: 4.8, description: 'Разбор типовых задач проектирования на примерах объектно-ориентированного кода.', cover: 3 },
]

export const formatPrice = new Intl.NumberFormat('ru-RU', {
  style: 'currency', currency: 'RUB', maximumFractionDigits: 0,
}).format
