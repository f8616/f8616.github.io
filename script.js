const threatDisplay = document.getElementById('threat-level');
const intelBtn = document.getElementById('intel-btn');
const intelLog = document.getElementById('intel-log');
const posterPhotos = document.querySelectorAll('.poster-photo');

const threatLevels = [
  'THREAT LV.1 - いたずらモード',
  'THREAT LV.2 - だじゃれ増幅中',
  'THREAT LV.3 - 目立ちたがり警報',
  'THREAT LV.4 - ステージ乱入注意',
  'THREAT LV.5 - ハイパーハッピー爆発'
];

const rumors = [
  '謎のダンスイベントを一瞬で開催。観客全員参加。',
  '巨大ポスターにラクガキを追加。センスは最高レベル。',
  'メカ猫を従えて人ごみを突破。猫は満足そう。',
  '空飛ぶタコ焼き屋台で匂いだけ残して消える。',
  '最新アニメOPをハミング。周囲に謎の感動が広がる。'
];

let threatIndex = 2;

const timeStamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const addLogEntry = text => {
  const li = document.createElement('li');
  li.textContent = `${timeStamp()} - ${text}`;
  intelLog.prepend(li);
  const excess = intelLog.querySelectorAll('li');
  if (excess.length > 6) {
    excess[excess.length - 1].remove();
  }
};

const updateThreatLevel = () => {
  threatIndex = (threatIndex + 1) % threatLevels.length;
  threatDisplay.textContent = threatLevels[threatIndex];
  threatDisplay.classList.add('pulse');
  setTimeout(() => threatDisplay.classList.remove('pulse'), 500);
};

intelBtn?.addEventListener('click', () => {
  updateThreatLevel();
  const randomRumor = rumors[Math.floor(Math.random() * rumors.length)];
  addLogEntry(randomRumor);
});

// idle animation
setInterval(() => {
  updateThreatLevel();
}, 15_000);

const updatePhotoState = (photoEl, hasImage) => {
  if (!photoEl) return;
  photoEl.classList.toggle('has-image', hasImage);
  const fallback = photoEl.querySelector('.photo-fallback');
  if (fallback && !hasImage) {
    fallback.textContent = 'ない';
  }
};

posterPhotos.forEach(photoEl => {
  const img = photoEl.querySelector('.poster-img');
  if (!img) return;

  const onLoad = () => updatePhotoState(photoEl, true);
  const onError = () => updatePhotoState(photoEl, false);

  img.addEventListener('load', onLoad);
  img.addEventListener('error', onError);

  if (img.complete) {
    if (img.naturalWidth > 0) {
      onLoad();
    } else {
      onError();
    }
  }
});
