const questions = [
  {
    text: "タバコを一番吸いたくなる瞬間は？",
    choices: [
      { text: "イラッとした直後", axis: "S" },
      { text: "仕事や作業が一区切りした時", axis: "R" },
      { text: "何も考えたくない時", axis: "S" },
      { text: "決まった時間になると", axis: "R" }
    ]
  },
  {
    text: "吸わずに我慢しているとどうなる？",
    choices: [
      { text: "集中できなくなる", axis: "S" },
      { text: "時間が気になってそわそわする", axis: "R" },
      { text: "気分が落ち着かない", axis: "S" },
      { text: "特に変わらない", axis: "R" }
    ]
  },
  {
    text: "タバコは自分にとって何に近い？",
    choices: [
      { text: "感情のスイッチ", axis: "S" },
      { text: "生活の一部", axis: "R" },
      { text: "リセットボタン", axis: "S" },
      { text: "歯磨きみたいなもの", axis: "R" }
    ]
  },
  {
    text: "吸い終わった後の感覚は？",
    choices: [
      { text: "気持ちが切り替わる", axis: "S" },
      { text: "いつもの感じに戻る", axis: "R" },
      { text: "頭が軽くなる", axis: "S" },
      { text: "安心する", axis: "R" }
    ]
  },

  {
    text: "銘柄が変わることについて",
    choices: [
      { text: "正直かなり嫌", axis: "C" },
      { text: "できれば避けたい", axis: "C" },
      { text: "あまり気にしない", axis: "L" },
      { text: "何でもOK", axis: "L" }
    ]
  },
  {
    text: "味や吸いごたえの違いは？",
    choices: [
      { text: "すぐ分かる", axis: "C" },
      { text: "言われれば分かる", axis: "C" },
      { text: "正直よく分からない", axis: "L" },
      { text: "気にしたことがない", axis: "L" }
    ]
  },

  {
    text: "喫煙所では？",
    choices: [
      { text: "基本一人がいい", axis: "A" },
      { text: "誰かいれば話す", axis: "S2" },
      { text: "人が多いと避ける", axis: "A" },
      { text: "会話があった方が楽しい", axis: "S2" }
    ]
  },
  {
    text: "誰かと吸うタバコは？",
    choices: [
      { text: "少し気を使う", axis: "A" },
      { text: "楽しい", axis: "S2" },
      { text: "別物だと思う", axis: "A" },
      { text: "一体感がある", axis: "S2" }
    ]
  },

  {
    text: "一本にかける時間は？",
    choices: [
      { text: "短ければ短いほどいい", axis: "Q" },
      { text: "用事が済めばOK", axis: "Q" },
      { text: "自然と長くなる", axis: "M" },
      { text: "時間を楽しむ", axis: "M" }
    ]
  },
  {
    text: "理想の喫煙シーンは？",
    choices: [
      { text: "短時間で完結", axis: "Q" },
      { text: "ルーティン通り", axis: "Q" },
      { text: "静かな場所でゆっくり", axis: "M" },
      { text: "余韻を楽しむ", axis: "M" }
    ]
  }
];

let score = { S:0, R:0, C:0, L:0, A:0, S2:0, Q:0, M:0 };
let current = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");

function renderQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  progressEl.textContent = `Q${current + 1} / ${questions.length}`;
  choicesEl.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      score[choice.axis]++;
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    };
    choicesEl.appendChild(btn);
  });
}

function showResult() {
  const type =
    (score.S >= score.R ? "S" : "R") +
    (score.C >= score.L ? "C" : "L") +
    (score.A >= score.S2 ? "A" : "S") +
    (score.Q >= score.M ? "Q" : "M");

  localStorage.setItem("yaniType", type);
  location.href = "result.html";
}

renderQuestion();
