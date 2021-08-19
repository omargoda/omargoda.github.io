hamburger_container = document.querySelector(".circle");
hamburger_container.addEventListener("click", toggleNavbar);
responsive_toolbar_links = document.querySelectorAll('.responsive_navbar > div');
for (link of responsive_toolbar_links) {
  link.addEventListener('click', toggleNavbar)
}
function toggleNavbar () {
  line_1 = document.querySelectorAll(".line")[0];
  line_2 = document.querySelectorAll(".line")[1];
  line_3 = document.querySelectorAll(".line")[2];
  logo = document.getElementsByClassName("sidebarxnavbar")[0];
  if (document.getElementsByClassName("rotated").length < 1) {
    line_1.classList.add("active_1");
    line_2.classList.add("active_2");
    line_3.classList.add("active_3");
    hamburger_container.classList.add("rotated");
  } else {
    line_1.classList.remove("active_1");
    line_2.classList.remove("active_2");
    line_3.classList.remove("active_3");
    hamburger_container.classList.remove("rotated");
  }
  document.querySelector('.responsive_navbar').classList.toggle('open');
  document.querySelector('.navbar').classList.toggle('expanded');
}
function changeToolbar() {
  if (window.pageYOffset > 0) {
    if (!document.querySelector("body > div:first-child").classList.contains('fixed')) {
      document.querySelector("body > div:first-child").classList.add('fixed');
    }
  } else {
    if (document.querySelector("body > div:first-child").classList.contains('fixed')) {
      document.querySelector("body > div:first-child").classList.remove('fixed');
    }
  }
}
window.addEventListener('scroll', changeToolbar);
function getVisibleHeight (element) {
  const rect   = element.getBoundingClientRect();
  const top    = (rect.top    < 80 ? 80 : (rect.top    > window.innerHeight ? window.innerHeight : rect.top));
  const bottom = (rect.bottom < 80 ? 80 : (rect.bottom > window.innerHeight ? window.innerHeight : rect.bottom));
  return bottom - top;
}
toolbarlinks = document.querySelectorAll('.navbar_menu div');
sections = document.querySelectorAll('section');
function activateToolBarLink () {
  activelink = document.querySelector('.active_link');
  visible_heights = [];
  for (i of sections) {
    visible_heights.push(getVisibleHeight(i));
  }
  var max_index = 0;
  for (var x = 1; x < 8; x++) {
    if (visible_heights[x] > visible_heights[max_index]) {
      max_index = x;
    }
  }
  if (toolbarlinks[max_index] !== activelink) {
    activelink.classList.remove('active_link');
    toolbarlinks[max_index].classList.add('active_link');
  }
}
window.addEventListener('scroll', activateToolBarLink);
function scrollTo(element) {
  element.preventDefault();
  const offsetTop = document.querySelector(this.getAttribute("href")).offsetTop;
  scroll({
    top: offsetTop - 80,
    behavior: "smooth"
  });
}
for (const link of document.querySelectorAll('.navbar div div')) {
  link.addEventListener("click", scrollTo);
}
document.querySelector('footer > div:last-of-type').addEventListener("click", scrollTo);
window.addEventListener("scroll", function (){
  if (window.pageYOffset > 0) {
    document.querySelector('footer > div:last-child').style.display = 'block';
  } else {
    document.querySelector('footer > div:last-child').style.display = 'none';
  }
});
const popup = function () {
  popup_container = document.querySelector('.popups');
  body = document.querySelector('body');
  if (popup_container.classList.contains('poped_up')) {
    popup_container.classList.remove('poped_up');
    body.classList.remove('inactive_body');
    document.querySelector('.active_popup').classList.remove('active_popup');
  } else {
    popup_container.classList.add('poped_up');
    body.classList.add('inactive_body');
  }
}
function activatePopupElement(element, create_popedup_state) {
  if (create_popedup_state) {
    popup();
    if (!element.classList.contains('active_popup')) {
      element.classList.add('active_popup');
    }
  } else if (!element.classList.contains('active_popup')) {
    document.querySelector('.active_popup').classList.remove('active_popup');
    element.classList.add('active_popup');
  }
}
const addListenerWithArgs = function () {
  var args = Array.prototype.slice.call(arguments);
  var elem = args[0];
  var evt = args[1];
  var func = args[2];
  var vars = args.slice(3);
  var f = function(ff, variables_array){
    return (function (){
      ff.apply(this, variables_array);
    });
  }(func, vars);
  elem.addEventListener(evt, f);
  return f;
}
addListenerWithArgs(document.querySelector('.navbar button:first-of-type'), 'click', activatePopupElement, document.querySelector('#hire_me_form'), true);
addListenerWithArgs(document.querySelector('.navbar button:last-of-type'), 'click', activatePopupElement, document.querySelector('#login_form'), true);
addListenerWithArgs(document.querySelector('.responsive_navbar button:last-of-type'), 'click', activatePopupElement, document.querySelector('#hire_me_form'), true);
addListenerWithArgs(document.querySelector('.responsive_navbar button:first-of-type'), 'click', activatePopupElement, document.querySelector('#login_form'), true);
addListenerWithArgs(document.querySelector('#login_form h1:nth-of-type(2) span'), 'click', activatePopupElement, document.querySelector('#signup_form'), false);
addListenerWithArgs(document.querySelector('#login_form h1 span'), 'click', activatePopupElement, document.querySelector('#forgot_password_form'), false);
addListenerWithArgs(document.querySelector('#signup_form h1 span'), 'click', activatePopupElement, document.querySelector('#login_form'), false);
addListenerWithArgs(document.querySelector('#forgot_password_form h1 span'), 'click', activatePopupElement, document.querySelector('#login_form'), false);
document.querySelector('.popups > div').addEventListener('click', popup);
