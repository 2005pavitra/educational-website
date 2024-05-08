
let accordion = document.querySelectorAll('.faq accordion-container .accordion');
accordion.forEach(acco => {
  acco.onlick = () => {
    accordion.forEach(dion = dion.classList.remove('active'));
    acco.classList.add.toggle('active');
  };
});