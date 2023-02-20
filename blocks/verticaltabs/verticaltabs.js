export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
}

const firsttab = document.querySelector('.verticaltabs > div:first-child > div:first-child');
const tabs = document.querySelectorAll('.verticaltabs > div > div:first-child');
const info = document.querySelectorAll('.verticaltabs > div > div:last-child');

function activateFirstTab() {
  firsttab.classList.add('active');
  firsttab.nextElementSibling.classList.add('active');
}
activateFirstTab();

function tabSwitcher(tab) {
  const activeTab = document.querySelector('.verticaltabs > div > div:first-child.active');
  let i;
  for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  for (i = 0; i < info.length; i++) {
    info[i].classList.remove('active');
  }
  tab.classList.add('active');
  tab.nextElementSibling.classList.add('active');
}

tabs.forEach(tab => 
  tab.addEventListener('click', e => {
    
    tabSwitcher(tab);
  })
);