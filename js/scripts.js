/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', main);

function main() {
  // theme-switcher
  document
    .getElementById('theme-switcher')
    .addEventListener('click', function () {
      document.querySelector('body').classList.toggle('light');
      const themeImg = this.children[0];
      themeImg.setAttribute(
        'src',
        themeImg.getAttribute('src') === './assets/images/icon-sun.svg'
          ? './assets/images/icon-moon.svg'
          : './assets/images/icon-sun.svg'
      );
    });
}
