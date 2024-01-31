import{S as u,i as m,a as c}from"./assets/vendor-eeed083b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const f=new u(".gallery a",{captionsData:"alt",captionDelay:250}),l=document.querySelector(".gallery"),d=document.querySelector(".loader-wrapper"),p=document.querySelector("#search-form");p.addEventListener("submit",h);async function y(a){c.defaults.baseURL="https://pixabay.com/api/";const e={params:{key:"42088137-23c74c59277fc3ae3a179e24d",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}};try{return await c.get("",e)}catch(r){console.log(r)}}async function h(a){a.preventDefault(),b(),l.innerHTML="";const e=a.currentTarget.elements.searchQuery.value.trim();try{const{data:{hits:r}}=await y(e);if(r.length===0)return m.error({message:"Sorry, there are no images matching your search query. Please try again!"});l.innerHTML=g(r),f.refresh(),document.querySelector(".load-more").classList.remove("is-hidden")}catch(r){console.log(r)}finally{L()}}function g(a){return a.map(e=>`
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
  `).join("")}function b(){d.classList.remove("is-hidden")}function L(){d.classList.add("is-hidden")}const s=document.createElement("button");s.classList.add("load-more");s.innerHTML="Load more";s.addEventListener("click",()=>{});document.body.appendChild(s);
//# sourceMappingURL=commonHelpers.js.map
