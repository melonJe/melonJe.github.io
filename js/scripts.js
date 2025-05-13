/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

  // 사용자 정의 배경색 리스트
const colorList = [
  '#dfebd8', '#7e4b5c', '#477a7f', '#e2785f',
  '#2b3a46', '#cbdae1', '#8ea274', '#592335',
  '#d13939', '#f7eeb9', '#f6c062', '#3a9eb1',
  '#4c87c0', '#684089', '#e3b8c6', '#a4dcd8'
];

  // 명도 기반 대비색: 흰색 or 검정색
  function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#000' : '#fff';
  }

  // 쿠키 저장/불러오기
  function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
  }

  // 컬러 선택: 동일 텍스트 → 동일 색 유지
  function assignColor(text) {
    const key = `skill-color-${text}`;
    let color = getCookie(key);

    if (!color) {
      // 해시 기반 고정 인덱스
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % colorList.length;
      color = colorList[index];
      setCookie(key, color);
    }

    return color;
  }

  // 실행
  document.querySelectorAll('span.skill').forEach(el => {
    const text = el.textContent.trim();
    const bgColor = assignColor(text);
    const textColor = getContrastColor(bgColor);

    Object.assign(el.style, {
      backgroundColor: bgColor,
      color: textColor,
      padding: '0.4rem 0.8rem',
      borderRadius: '8px',
      fontWeight: '500',
      display: 'inline-block',
      fontSize: '0.85rem',
      margin: '2px'
    });
  });
});
