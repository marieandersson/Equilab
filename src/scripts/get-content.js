// import Cosmic from 'cosmicjs';
import Request from './request';
import Handlebars from 'handlebars';

let DOMloaded = false;
// let responseData = null;
let activeLanguage;

document.addEventListener('DOMContentLoaded', function (event) {
  DOMloaded = true;
  // if (apiData) {
  //   putContentInDOM(apiData);
  // }
});

// check if language is set in local storage
if (!localStorage.getItem('lang')) {
  activeLanguage = 'en-US';
} else {
  activeLanguage = localStorage.getItem('lang');
}

function getCurrentPage (activeLanguage) {
  let currentPageUrl = location.pathname.substring(1);

  if (currentPageUrl === '') {
    fetchLandingPage(activeLanguage);
  }
  if (currentPageUrl === 'hiring.php') {
    fetchHiringPage(activeLanguage);
  }
  if (currentPageUrl === 'faq.php') {
    fetchFaqPage(activeLanguage);
  }
  if (currentPageUrl === 'suggestionsbox.php') {
    fetchSuggestionboxPage(activeLanguage);
  }
}
getCurrentPage(activeLanguage);

function fetchLandingPage () {
  getContentFromApi('hero', activeLanguage, (dataResponse) => {
    console.log(dataResponse);
    const data = {
      title: dataResponse.title
    };
    putContentInDOM(data, 'hero');
  });

  // getContentFromApi('selling-points', activeLanguage);
  // getContentFromApi('quotes', activeLanguage);
  // getContentFromApi('description', activeLanguage);
}
function fetchHiringPage () {
}
function fetchFaqPage () {
}
function fetchSuggestionboxPage () {
}

function getContentFromApi (moduleObj, language, onDone) {
  const apiConfig = {
    bucket: { slug: 'equilab', read_key: 'uL8VNHCHAtT8yniCjW8jFaC90zooc8voQ1qDNVR8krjlKTo310' }
  };
  const params = {
    slug: moduleObj,
    locale: language
  };
  Request.getObject(apiConfig, params, (error, response) => {
    if (error) throw error;
    onDone(response.object);
  });
}

function putContentInDOM (data, moduleObj) {
  const templateElement = document.getElementById('template-' + moduleObj + '-module');
  const moduleElement = document.body.querySelector('.' + moduleObj + '-module');
  const source = templateElement.innerHTML;
  const template = Handlebars.compile(source);
  moduleElement.innerHTML = template(data); // +=
}

// handle language switch
const allLanguages = document.querySelectorAll('.lang-item');

allLanguages.forEach(function (language) {
  language.addEventListener('click', function () {
    activeLanguage = language.dataset.locale;
    localStorage.setItem('lang', activeLanguage);
    getCurrentPage(activeLanguage);
  });
});
