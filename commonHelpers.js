import{S as l,i as u}from"./assets/vendor-46aac873.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const f=new l(".gallery a",{captionsData:"alt",captionDelay:250}),a=document.querySelector(".gallery"),c=document.querySelector(".loader-wrapper"),d=document.querySelector("#search-form");d.addEventListener("submit",p);function m(n){const e="https://pixabay.com/api",r=new URLSearchParams({key:"42088137-23c74c59277fc3ae3a179e24d",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${e}/?${r}`).then(i=>{if(!i.ok)throw new Error(i.status);return i.json("")})}function p(n){n.preventDefault(),y(),a.innerHTML="";const e=n.currentTarget.elements.searchQuery.value.trim();m(e).then(r=>{if(console.log(r.hits),r.hits.length===0)return u.error({message:"Sorry, there are no images matching your search query. Please try again!"});a.innerHTML=h(r.hits),f.refresh()}).catch(r=>{console.log(r)}).finally(()=>{g()})}function h(n){return n.map(e=>`
   <li class='photo-card'>
    <a href='${e.largeImageURL}'>
      <img src='${e.webformatURL}' alt='${e.tags}' loading='lazy' />
    </a>
    <div class='info'>
      <p class='info-item'>
        <b>Likes ${e.likes}</b>
      </p>
      <p class='info-item'>
        <b>Views ${e.views}</b>
      </p>
      <p class='info-item'>
        <b>Comments ${e.comments}</b>
      </p>
      <p class='info-item'>
        <b>Downloads ${e.downloads}</b>
      </p>
    </div>
  </li>
  `).join("")}function y(){c.classList.remove("is-hidden")}function g(){c.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
