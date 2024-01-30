import{S as u,i as d,a as n}from"./assets/vendor-eeed083b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const f=new u(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),l=document.querySelector(".loader-wrapper"),m=document.querySelector("#search-form");m.addEventListener("submit",y);async function p(a){n.defaults.baseURL="https://pixabay.com/api/";const e={params:{key:"42088137-23c74c59277fc3ae3a179e24d",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}};try{return await n.get("",e)}catch(o){console.log(o)}}async function y(a){a.preventDefault(),g(),c.innerHTML="";const e=a.currentTarget.elements.searchQuery.value.trim();try{const{data:{hits:o}}=await p(e);if(o.length===0)return d.error({message:"Sorry, there are no images matching your search query. Please try again!"});c.innerHTML=h(o),f.refresh()}catch(o){console.log(o)}finally{b()}}function h(a){return a.map(e=>`
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
  `).join("")}function g(){l.classList.remove("is-hidden")}function b(){l.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
