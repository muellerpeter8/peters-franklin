export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
}

const firsttab = document.querySelector('.verticaltabs > div:first-child > div:first-child');
const tabs = document.querySelectorAll('.verticaltabs > div > div:first-child');
const infos = document.querySelectorAll('.verticaltabs > div > div:last-child');

function activateFirstTab() {
  firsttab.classList.add('active');
  firsttab.nextElementSibling.classList.add('active');
}
activateFirstTab();

function tabSwitcher(tab) {
  tabs.forEach(tabn => { tabn.classList.remove('active') });
  infos.forEach(info => { info.classList.remove('active') });
  tab.classList.add('active');
  tab.nextElementSibling.classList.add('active');
}

tabs.forEach(tab => { tab.addEventListener('click', e => { tabSwitcher(tab); }) });
