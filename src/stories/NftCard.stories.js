// NFT 미리보기 카드. 마크업은 src/pages/index.html의 article과 같게 유지한다.
// 카드에는 JavaScript 동작이 없다. hover·focus 오버레이와 색 변화는 모두 CSS로 처리한다.

const CHALLENGE_URL =
  'https://www.frontendmentor.io/challenges/nft-preview-card-component-SbdUL_w0U';

// Controls에 입력한 값이 마크업을 깨지 않도록 이스케이프한다
const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

// Docs 페이지는 여러 스토리를 한 문서에 그리므로 aria-labelledby용 ID가 겹치지 않게 한다
let idCount = 0;

const createCard = ({
  title,
  description,
  price,
  timeLeft,
  creatorName,
  href,
  imageSrc,
  imageAlt,
  avatarSrc,
}) => {
  const titleId = `card-title-${++idCount}`;
  const t = escapeHtml(title);

  return `
    <article class="c-nft-card l-stack" aria-labelledby="${titleId}">
      <a
        class="c-nft-card__artwork l-frame"
        href="${escapeHtml(href)}"
        aria-label="View ${t} challenge"
      >
        <img
          class="c-nft-card__image"
          src="${escapeHtml(imageSrc)}"
          alt="${escapeHtml(imageAlt)}"
          width="302"
          height="302"
        />
      </a>
      <div class="c-nft-card__intro l-stack" data-space="normal">
        <h1 class="c-nft-card__title" id="${titleId}">
          <a class="c-nft-card__link" href="${escapeHtml(href)}">${t}</a>
        </h1>
        <p class="c-nft-card__description">${escapeHtml(description)}</p>
      </div>
      <div class="c-nft-card__meta l-cluster" data-justify="between" data-gap="small">
        <p class="c-nft-card__price l-cluster" data-justify="start" data-gap="small">
          <img src="./images/icon-ethereum.svg" alt="" width="11" height="18" />${escapeHtml(price)}
        </p>
        <p class="c-nft-card__time l-cluster" data-justify="start" data-gap="small">
          <img src="./images/icon-clock.svg" alt="" width="17" height="17" />${escapeHtml(timeLeft)}
        </p>
      </div>
      <div class="c-nft-card__creator l-cluster" data-justify="start" data-gap="normal">
        <img
          class="c-nft-card__avatar"
          src="${escapeHtml(avatarSrc)}"
          alt=""
          width="33"
          height="33"
        />
        <p>
          Creation of
          <span class="c-nft-card__creator-name">${escapeHtml(creatorName)}</span>
        </p>
      </div>
    </article>
  `;
};

export default {
  title: 'Components/NFT Card',
  tags: ['autodocs'],
  render: ({ containerWidth, ...args }) => {
    const wrapper = document.createElement('div');
    // centered 레이아웃은 래퍼를 내용 크기로 줄이는데, 카드의 min(100%, 350px)은 그 계산에서
    // 100%가 정해지지 않아 래퍼가 설명 한 줄 폭까지 넓어진다. 기본 폭을 카드 최대 폭으로 두고,
    // 좁은 화면에서는 Storybook 좌우 여백(1rem씩)을 뺀 화면 폭까지 줄인다.
    // containerWidth로 더 좁은 부모에서 카드가 줄어드는 모습을 확인할 수 있다.
    const width = containerWidth ? `${containerWidth}px` : '21.875rem';
    wrapper.style.inlineSize = `min(${width}, 100vw - 2rem)`;
    wrapper.innerHTML = createCard(args);
    return wrapper;
  },
  argTypes: {
    title: { control: 'text', description: '카드 제목 (h1, 링크)' },
    description: { control: 'text' },
    price: { control: 'text' },
    timeLeft: { control: 'text' },
    creatorName: { control: 'text' },
    href: { control: 'text', description: '이미지와 제목 링크의 목적지' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text', description: '대표 이미지의 대체 텍스트' },
    avatarSrc: { control: 'text' },
    containerWidth: {
      control: { type: 'range', min: 240, max: 400, step: 10 },
      description: '카드를 감싸는 부모 너비(px). 비우면 카드 최대 폭(350px)',
    },
  },
  args: {
    title: 'Equilibrium #3429',
    description: 'Our Equilibrium collection promotes balance and calm.',
    price: '0.041 ETH',
    timeLeft: '3 days left',
    creatorName: 'Jules Wyvern',
    href: CHALLENGE_URL,
    imageSrc: './images/image-equilibrium.jpg',
    imageAlt: 'Glowing translucent cube floating over a blue surface',
    avatarSrc: './images/image-avatar.png',
  },
};

export const Default = {};

// 긴 제목·설명과 큰 가격에서도 줄바꿈이 자연스러운지 확인한다
export const LongContent = {
  args: {
    title: 'Equilibrium Collection Masterpiece #3429',
    description:
      'Our Equilibrium collection promotes balance and calm through translucent forms suspended in light.',
    price: '1,240.875 ETH',
    timeLeft: '12 hours left',
    creatorName: 'Jules Wyvern-Montgomery',
  },
};

// 320px 화면에서 카드가 차지하는 폭(좌우 여백 12px 제외)
export const Narrow = {
  args: {
    containerWidth: 296,
  },
};
