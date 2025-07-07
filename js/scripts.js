document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling ---
    const setupSmoothScrolling = () => {
        const handleScroll = (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, '', targetId);
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', handleScroll);
        });

        const projectButton = document.querySelector('header .btn');
        if (projectButton) {
            projectButton.addEventListener('click', handleScroll);
        }
    };

    // --- Color Utility Functions ---
    const colorList = [
        '#dfebd8', '#7e4b5c', '#477a7f', '#e2785f',
        '#2b3a46', '#cbdae1', '#8ea274', '#592335',
        '#d13939', '#f7eeb9', '#f6c062', '#3a9eb1',
        '#4c87c0', '#684089', '#e3b8c6', '#a4dcd8'
    ];

    const getContrastColor = (hexColor) => {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 150 ? '#000' : '#fff';
    };

    // --- Cookie Management ---
    const setCookie = (name, value, days = 365) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    };

    const getCookie = (name) => {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    };

    // --- Skill Item Styling ---
    const assignSkillColor = (text) => {
        const key = `skill-color-${text}`;
        let color = getCookie(key);

        if (!color) {
            let hash = 0;
            for (let i = 0; i < text.length; i++) {
                hash = text.charCodeAt(i) + ((hash << 5) - hash);
            }
            const index = Math.abs(hash) % colorList.length;
            color = colorList[index];
            setCookie(key, color);
        }
        return color;
    };

    const applySkillItemStyles = () => {
        document.querySelectorAll('span.skill-item').forEach(el => {
            const text = el.textContent.trim();
            const bgColor = assignSkillColor(text);
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
    };

    // --- Initialize Features ---
    setupSmoothScrolling();
    applySkillItemStyles();
});