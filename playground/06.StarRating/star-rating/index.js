// prettier-ignore
const printStarRating = $container => {
  $container.innerHTML = `
    <div class='star-rating-container'>
      ${Array(+$container.dataset.maxRating).fill(0)
        .map(() => `<i class='bx bxs-star'></i>`).join('')}
    </div>`
}

const StarRating = $container => {
  [...document.querySelectorAll('link')]
    .at(-1)
    .insertAdjacentHTML('afterend', '<link href="star-rating/theme.css" rel="stylesheet" />');

  printStarRating($container);
};

export default StarRating;
