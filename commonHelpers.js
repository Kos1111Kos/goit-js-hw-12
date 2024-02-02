import{S as L,i as b,a as d}from"./assets/vendor-eeed083b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const u=new L(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),f=document.querySelector(".loader-wrapper"),v=document.querySelector("#search-form");v.addEventListener("submit",S);let m=1;async function h(t){d.defaults.baseURL="https://pixabay.com/api/";const e={params:{key:"42088137-23c74c59277fc3ae3a179e24d",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:m}};try{return await d.get("",e)}catch(s){console.log(s)}}async function S(t){t.preventDefault(),y(),c.innerHTML="";const e=t.currentTarget.elements.searchQuery.value.trim();try{const{data:{hits:s,totalHits:n}}=await h(e);if(s.length===0)return b.error({message:"Sorry, there are no images matching your search query. Please try again!"});c.innerHTML=p(s),u.refresh(),document.querySelector(".load-more").classList.remove("is-hidden"),s.length<n?a.classList.remove("is-hidden"):(a.classList.add("is-hidden"),g(n))}catch(s){console.log(s)}finally{i()}}function p(t){return t.map(e=>`			
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
  `).join("")}function y(){f.classList.remove("is-hidden")}function i(){f.classList.add("is-hidden")}const a=document.createElement("button");a.classList.add("load-more");a.innerHTML="Load more";a.addEventListener("click",async()=>{m++,y();try{const{data:{hits:t,totalHits:e}}=await h(savedSearchQuery);t.length>0&&(c.innerHTML+=p(t),u.refresh()),t.length<e?i():(i(),a.classList.add("is-hidden"),g(e))}catch(t){console.log(t),i()}});document.body.appendChild(a);function g(t){t===0?alert("We're sorry, but there are no search results."):(alert("We're sorry, but you've reached the end of search results."),document.getElementById("loadMoreEl").style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
