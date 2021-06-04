const showMenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId),
    background = document.getElementById("background");

  if (headerToggle && navbarId) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      background.classList.toggle("background");

      toggleBtn.classList.toggle("bx-x");
    });

    background.addEventListener("click", (e) => {
      if (e.target !== nav) {
        nav.classList.toggle("show-menu");
        background.classList.toggle("background");

        toggleBtn.classList.toggle("bx-x");
      }
    });
  }
};
showMenu("header-toggle", "navbar");

const toggleItems = document.querySelectorAll(".nav__dropdown");
const navigation = document.querySelector(".nav");

navigation.addEventListener("mouseleave", function (event) {
  toggleItems.forEach((item) => {
    item.classList.remove("show");
  });
});

function showCollapse() {
  this.classList.toggle("show");
}

toggleItems.forEach((item) => {
  item.addEventListener("click", showCollapse);
});

const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));

window.addEventListener("scroll", function () {
  if (window.scrollY > 45) {
    document.querySelector(".header").classList.add("white");
    document.querySelector(".header").classList.remove("transparent");
  } else {
    document.querySelector(".header").classList.remove("white");
    document.querySelector(".header").classList.add("transparent");
  }
});

// global variables
var questions; // objects containing the quiz questions
var count, score, scorePercentage, answer; // tracking variables
var correctAnswer, prevFlag; // flags
var choices, question, resultsPara, choicesPara; // elements being updated
var resetButton, prevButton; // buttons
var progress, progressPercentage; // progress bar

questions = [
  {
    number: 0,
    question: "Как получить данные от пользователя?",
    choices: [
      "Использовать метод get()",
      "Использовать метод cin()",
      "Использовать метод read()",
      "Использовать метод input()",
    ],
    answer: 3,
  },
  {
    number: 1,
    question: "Какая функция выводит что-либо в консоль?",
    choices: ["write();", "log();", "out();", "print();"],
    answer: 3,
  },
  {
    number: 2,
    question: "Где правильно создана переменная?",
    choices: ["num = float(2)", "$num = 2", "int num = 2", "var num = 2"],
    answer: 0,
  },
  {
    number: 3,
    question: "Какая библиотека отвечает за время?",
    choices: ["Time", "time", "clock", "localtime"],
    answer: 1,
  },
  {
    number: 4,
    question: "Сколько библиотек можно импортировать в один проект?",
    choices: [
      "Не более 3",
      "Не более 10",
      "Не более 5",
      "Неограниченное количество",
    ],
    answer: 3,
  },
  {
    number: 5,
    question: "Как создать конструктор класса А?",
    choices: [
      "А(параметры конструктора)",
      "def __init__(параметры конструктора)",
      "def __A__(параметры конструктора)",
      "def init(параметры конструктора)",
    ],
    answer: 1,
  },
  {
    number: 6,
    question: "Строки в Python:",
    choices: ["Массив символов", "Изменяемы", "Неизменяемы"],
    answer: 2,
  },
  {
    number: 7,
    question: "Строки в Python неизменяемы. Что это значит?",
    choices: [
      "Их нельзя делить на число",
      "После их объявления их нельзя изменить",
      "Строку можно изменить с помощью конкатенации",
      "Строки в Python могут быть представлены в виде массива char-ов",
    ],
    answer: 0,
  },
  {
    number: 8,
    question:
      "Какую математическую операцию можно использовать для конкатенации строк?",
    choices: [":", "/", "+", "-"],
    answer: 2,
  },
  {
    number: 9,
    question: "Для чего в Python используется встроенная функция enumerate()?",
    choices: [
      "Для определения количества элементов последовательности.",
      "Для одновременного итерирования по самим элементам и их индексам.",
      "Для сортировки элементов по значениям id.",
    ],
    answer: 1,
  },
  {
    number: 10,
    question:
      "Необходимо собрать и вывести все уникальные слова из строки рекламного текста. Какой из перечисленных типов данных Python подходит лучше всего?",
    choices: [
      "кортеж (tuple)",
      "список (list)",
      "множество (set)",
      "словарь (dict)",
    ],
    answer: 2,
  },
  {
    number: 11,
    question: "Как вывести список методов и атрибутов объекта x?",
    choices: ["help(x)", "info(x)", "?x", "dir(x)"],
    answer: 3,
  },
  {
    number: 12,
    question:
      "Какая из перечисленных инструкций выполнится быстрее всего, если n = 10**6?",
    choices: [
      "a = list(i for i in range(n))",
      "a = [i for i in range(n)]",
      "a = (i for i in range(n))",
      "a = {i for i in range(n)}",
    ],
    answer: 2,
  },
  {
    number: 13,
    question:
      "С помощью Python нужно записать данные в файл, но только в том случае, если файла ещё нет. Какой режим указать в инструкции open()?",
    choices: [
      "'x'",
      "Никакой. Нужна предварительная проверка os.path.exists()",
      "'w'",
      "'r'",
    ],
    answer: 0,
  },
  {
    number: 14,
    question:
      "Для чего в пакетах модулей python в файле «init.py» служит список all__?",
    choices: [
      "Для конструкторов классов, как и всё, что связано с __init__",
      "Список определяет, что экспортировать, когда происходит импорт с помощью from *",
      "Для перечисления переменных, которые будут скрыты для импортирования.",
    ],
    answer: 1,
  },
  {
    number: 15,
    question:
      "Что пишется в круглых скобках после имени класса при объявлении класса с помощью оператора class?",
    choices: [
      "Имена аргументов, принимаемых методом init.",
      "Имена принимаемых классом аргументов.",
      "Имена суперклассов, если класс наследуется от одного или нескольких классов.",
      "Имена классов, порождаемых данным классом.",
    ],
    answer: 2,
  },
  {
    number: 16,
    question:
      "Какую роль в описании метода класса выполняет декоратор @property?",
    choices: [
      "Декорированный метод становится статическим, экземпляр не передаётся.",
      "Декорированный метод становится методом класса: метод получает класс, а не экземпляр.",
      "Значение, возвращаемое декорированным методом, вычисляется при извлечении. Можно обратиться к методу экземпляра, как к атрибуту.",
    ],
    answer: 2,
  },
  {
    number: 17,
    question:
      "Какой вариант необходимо использовать для создания bytes-объекта, в котором содержится 5 null (0x00) байтов?",
    choices: [
      "bytes(0, 0, 0, 0, 0) ",
      "bytes(5)",
      "bytes([0] * 5)",
      "bytes('\x00\x00\x00\x00\x00', 'utf-8')",
    ],
    answer: 0,
  },
  {
    number: 18,
    question:
      "Ниже представлен список операторов. Какой из них имеет самый низкий приоритет?",
    choices: ["Not", "And", "+", "%"],
    answer: 1,
  },
  {
    number: 19,
    question: "Выберите правильное объявление переменной:",
    choices: ["x := 100", "x ← 100", "let x = 100", "x = 100"],
    answer: 3,
  },
  {
    number: 20,
    question:
      "Какая встроенная функция возвращает уникальный номер, присвоенный объекту?",
    choices: ["ref()", "identity()", "refnum()", "id()"],
    answer: 3,
  },
  {
    number: 21,
    question:
      "Какой из представленных ниже способов именования переменных рекомендован PEP8?",
    choices: [
      "distance_to_nearest_town (Snake Case)",
      "distanceToNearestTown (Camel Case)",
      "DistanceToNearestTown (Pascal Case)",
    ],
    answer: 0,
  },
  {
    number: 22,
    question:
      "Ниже представлены варианты объявления кортежа с одним элементом — ‘foo’. Какой из них правильный?",
    choices: ["t = ['foo']", "t = ('foo',)", "t = ('foo')", "t = {'foo'}"],
    answer: 1,
  },
  {
    number: 23,
    question: "Выберите верные утверждения:",
    choices: [
      "Словарь может содержать объект любого типа, кроме другого словаря",
      "Доступ к элементам словаря осуществляется с помощью ключа",
      "Доступ к элементам словаря осуществляется с помощью позиции в словаре",
      "Все ключи в словаре должны быть одного и того же типа",
    ],
    answer: 1,
  },
  {
    number: 24,
    question:
      "Какие из приведенных стилей программирования поддерживает язык Python?",
    choices: [
      "Процедурный",
      "Объектно-ориентированный",
      "Функциональный",
      "Смешанный",
    ],
    answer: 3,
  },
  {
    number: 25,
    question: "Какая функция отвечает за открытие файла?",
    choices: ["file()", "open()", "open_file()"],
    answer: 1,
  },
  {
    number: 26,
    question: "Что делает команда import",
    choices: ["Импортирует файл модуля", "Создает функцию", "Удаляет файл"],
    answer: 0,
  },
  {
    number: 27,
    question: "Выберите вариант правильного удаления переменной а",
    choices: ["del(a)", "delete(a)", "delete=a"],
    answer: 1,
  },
  {
    number: 28,
    question:
      "Как называется встроенный в языке Python тип данных неупорядоченной коллекции из нуля или более пар ключ-значение?",
    choices: ["dict", "set", "list", "frozenset"],
    answer: 0,
  },
  {
    number: 29,
    question: "Как используется строка Main Heading?",
    choices: [
      "В качестве заглушки, чтобы в средствах визуального форматирования было видно, что форматируется",
      "В качестве имени переменной для макроподстановки",
      "Содержит значение, на которое можно сослаться в другом месте документа",
    ],
    answer: 0,
  },
  {
    number: 30,
    question: "Для чего применяется метод nextset() объекта-курсора?",
    choices: [
      "Для перехода к следующему набору записей результата запроса",
      "Для перехода к следующей записи результата запроса",
      "Для получения следующего набора записей результата запроса",
    ],
    answer: 0,
  },
  {
    number: 31,
    question:
      "Какой из перечисленных обработчиков mod_python выполняется раньше других?",
    choices: [
      "PythonPostReadRequestHandler",
      "PythonHandler",
      "PythonFixupHandler",
    ],
    answer: 0,
  },
  {
    number: 32,
    question: "Что такое регулярное выражение?",
    choices: [
      "Шаблон, описывающий множество строк",
      "Синтаксически правильное выражение на языке Python",
      "Шаблон для поиска файлов в каталоге",
    ],
    answer: 0,
  },
  {
    number: 33,
    question: "Для чего нужны функции модуля gettext?",
    choices: [
      "Для получения текста от пользователя",
      "Для обеспечения интернационализации программы",
      "Для чтения строки со стандартного ввода",
    ],
    answer: 1,
  },
  {
    number: 34,
    question:
      "Как средствами самого Python определить имена формальных аргументов функции func(), если известно, что функция написана на Python?",
    choices: [
      "func.func_globals",
      "inspect.getargspec(func)",
      "func.func_locals",
    ],
    answer: 1,
  },
  {
    number: 35,
    question:
      "Какой метод позволяет узнать, имеет ли данное сообщение несколько частей?",
    choices: ["items()", "get_main_type()", "get_payload()"],
    answer: 1,
  },
  {
    number: 36,
    question:
      "К какому уровню модели взаимодействия открытых систем относится протокол FTP?",
    choices: ["приложений", "представления", "сетевому"],
    answer: 0,
  },
  {
    number: 37,
    question:
      "Какой модуль стандартной библиотеки Python позволяет работать с WWW на более низком уровне?",
    choices: ["httplib", "urlparse", "urllib2"],
    answer: 0,
  },
  {
    number: 38,
    question:
      "Сокрытие информации о внутреннем устройстве объекта, при котором вся работа с объектом ведется только через общедоступный интерфейс называется?",
    choices: ["абстракцией", "инкапсуляцией", "агрегацией"],
    answer: 1,
  },
  {
    number: 39,
    question:
      "Тип переменной во время выполнения скрипта определяется по следующим правилам:",
    choices: [
      "Тип переменной явно указывается при определении переменной и не изменяется в процессе выполнения скрипта",
      "Тип переменной явно указывается при определении переменной и изменяется только при приведении этой переменной к другому типу",
      "Тип переменной определяется типом первого значения, которое было ей присвоено, и далее не изменяется",
      "Тип переменной изменяется при присваивании, но не может изменяться в зависимости от контекста использования этой переменной",
    ],
    answer: 3,
  },
  {
    number: 40,
    question:
      "Для контроля над выполнением условного ветвления (if) можно использовать:",
    choices: ["elseif", "endif", "elif", "continue"],
    answer: 2,
  },
  {
    number: 41,
    question: "В языке Python циклом с предусловием является:",
    choices: ["do-while", "iterate", "while", "for"],
    answer: 2,
  },
  {
    number: 42,
    question: "Оператор continue используется",
    choices: [
      "в качестве пустого оператора",
      "для перехода к следующей итерации цикла",
      "для выхода из цикла",
      "для возврата из функции и продолжения программы с точки ее вызова",
    ],
    answer: 1,
  },
  {
    number: 43,
    question: "Строка y=x.pop() может быть корректна, если х -",
    choices: ["строка", "список", "кортеж", "словарь"],
    answer: 1,
  },
  {
    number: 44,
    question: "Встроенный метод списка index() используется для:",
    choices: [
      "извлечения первого элемента списка с указанным значением",
      "получения индекса первого элемента списка с указанным значением",
      "получения списка индексов элементов списка с указанным значением",
      "получения значения элемента списка по индексу",
    ],
    answer: 1,
  },
  {
    number: 45,
    question:
      "Стек в языке Python можно организовать при помощи списка и методов:",
    choices: [
      "push(x) и pop()",
      "insert(len(list), x) и pop(0)",
      "append(x) и pop()",
      "append(x) и pop(0)",
    ],
    answer: 2,
  },
  {
    number: 46,
    question:
      "Чем отличаются в языке Python строковые литералы, взятые в одинарные кавычки('), от литералов, взятых в двойные(\")?",
    choices: [
      "В одинарные кавычки могут быть заключены только символы",
      "При использовании одинарных кавычек не интерпретируются переходы строки и отступы",
      "При использовании одинарных кавычек не интерпретируются специальные символы, и переходы строки, и отступы",
      "Ничем не отличаются",
    ],
    answer: 3,
  },
  {
    number: 47,
    question:
      "Какое ключевое слово используется для возврата значения из функции?",
    choices: ["get", "post", "return", "answer"],
    answer: 2,
  },
  {
    number: 48,
    question: "Каким ключевым словом обозначается анонимная функция?",
    choices: ["lambda", "alpha", "anonym", "Таких функций не существует"],
    answer: 0,
  },
  {
    number: 49,
    question: "Какое ключевое слово используется для создания функции?",
    choices: ["fun", "function", "void", "def"],
    answer: 3,
  },
  {
    number: 50,
    question: "Сколько параметров может принимать функция?",
    choices: [
      "Нисколько, функция не принимает значения, только возвращает",
      "1",
      "2",
      "Бесконечно много",
    ],
    answer: 3,
  },
];

questions = shuffle(questions);

function renderQuestions(array) {
  for (let idx = 0; idx < array; idx++) {
    const questionDiv = document.createElement("span");
    questionDiv.classList.add("choices");
    document.querySelector(".choicesHolder").appendChild(questionDiv);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateQuestions() {
  renderQuestions(questions[count].choices.length);
  choices = document.querySelectorAll(".choices");
  choices.forEach(function (choice) {
    choice.addEventListener("click", scoring);
  });
}

// set tracking variables
count = 0;
score = 0;
correctAnswer = false;
prevFlag = false;

// grab html elements
question = document.getElementsByTagName("h2")[0];
resultsPara = document.getElementsByTagName("p")[0];
choicesPara = document.getElementsByTagName("p")[1];

resetButton = document.getElementsByClassName("reset")[0];
prevButton = document.getElementsByClassName("prev")[0];
progress = document.getElementsByClassName("progress-bar")[0];

// rendering questions
updateQuestions();
window.onload = renderQuestion();

// add the event listeners
prevButton.addEventListener("click", prevQuestion);
resetButton.addEventListener("click", resetQuiz);

// Shuffle function
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// functions used
function scoring() {
  // grab the answer of the current question
  answer = questions[count].answer;
  // prevButton is visible when a choice is selected
  prevFlag = true;

  // THIS is the span.choice that the user clicked
  if (this.innerText === questions[count].choices[answer]) {
    // correctAnswer waves for prevButton use
    correctAnswer = true;
    score++;
  } else {
    correctAnswer = false;
  }

  // then render next question
  nextQuestion();
}

function nextQuestion() {
  // count goes up
  count++;

  if (count > 50) {
    count = 50;
  } else if (count !== 50) {
    // numbers between 0 and 20 have questions that can be rendered
    renderQuestion();
  } else if (count === 50) {
    // quiz is over when count reaches 20
    renderCompletion();
  }
}

// the prevButton will only be available to go back one question
function prevQuestion() {
  // when the previous question renders, remove the prevButton
  prevFlag = false;

  // if the user originally clicked the correctAnswer, remove score
  if (correctAnswer) {
    correctAnswer = false;
    score--;
  }

  // then go back and render the old question
  count--;
  renderQuestion();
}

function renderQuestion() {
  // prevButton is hidden on the first page
  // and if the user attempts to go back more than one question
  if (!prevFlag) {
    prevButton.classList.add("hide");
  } else if (prevButton.classList.contains("hide")) {
    prevButton.classList.remove("hide");
  }

  // update question div with current question
  removeAllChildNodes(document.querySelector(".choicesHolder"));
  updateQuestions();
  question.innerText = questions[count].question;

  // shuffle questions
  shuffle(questions[count].choices);

  // update each choice with the choices available in current question
  choices.forEach(function (choice, i) {
    choice.innerText = questions[count].choices[i];
  });

  updateProgress();
}

function renderCompletion() {
  updateProgress();
  scorePercentage = Math.round((score / 50) * 100) + "%";

  // update with a thank you note and the user's percentage
  question.innerText = "Спасибо за прохождение теста!";
  resultsPara.innerText = "Ваш результат: " + scorePercentage;

  // reset avail, prevButton and choicesPara are removed
  choicesPara.classList.add("hide");
  prevButton.classList.add("hide");
  resetButton.classList.remove("hide");
}

function updateProgress() {
  // progress bar will be updated as count goes up
  progressPercentage = Math.round((count / 50) * 100);
  progress.style.width = progressPercentage + "%";
}

function resetQuiz() {
  // reset tracking variables
  count = 0;
  score = 0;
  correctAnswer = false;
  prevFlag = false;

  // resultsPara is hidden
  resultsPara.innerText = "";

  // choicesPara displays while resetButton is hidden
  choicesPara.classList.remove("hide");
  resetButton.classList.add("hide");

  renderQuestion();
}
