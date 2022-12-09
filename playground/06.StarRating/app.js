import StarRating from './star-rating/index.js';

const $containers = [...document.querySelectorAll('.star-rating')];
const $currentRatings = document.querySelectorAll('.current-rating > span');
// 커스텀 이벤트 생성
// const customEvent = new customEvent('rating-chang', {
//   detail:
// })

$containers.forEach(($container, i) => {
  StarRating($container);

  // 이벤트 'rating-change'를 캐치해 화면에 표시한다.
  $container.addEventListener('rating-change', e => {
    const rating = e.detail;
    $currentRatings[i].textContent = rating;
  });

  //------------------------------------------------------------------------

  // TODO: 클릭 이벤트 호버 이벤트 중첩된거 함수로 분리
  $container.addEventListener('mouseover', e => {
    if (!e.target.matches('.star-rating-container > .bxs-star')) return;

    const stars = [...e.target.parentNode.children];
    const targetIndex = stars.findIndex(item => item === e.target);

    stars.forEach((star, index) => {
      star.classList.toggle('hovered', index <= +targetIndex);
    });
  });

  $container.addEventListener('click', e => {
    if (!e.target.matches('.star-rating-container > .bxs-star')) return;

    const stars = [...e.target.parentNode.children];
    const targetIndex = stars.findIndex(item => item === e.target);

    stars.forEach((star, index) => {
      star.classList.toggle('selected', index <= +targetIndex);
    });
  });

  $container.addEventListener('mouseout', e => {
    if (!e.target.matches('.star-rating-container > .bxs-star')) return;

    [...document.querySelectorAll('.bxs-star')].forEach(star => {
      star.classList.remove('hovered');
    });
  });
});
