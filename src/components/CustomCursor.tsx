import { useEffect } from 'react';

export default function CustomCursor() {
  const TAIL_LENGTH = 20;

  useEffect(() => {
    // Add SVG filter to the document
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "goo");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", "100%");
    svg.innerHTML = `
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);

    // Create cursor container
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorCircles: HTMLDivElement[] = [];
    let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });
    let isTouch = false;

    // Initialize cursor circles
    for (let i = 0; i < TAIL_LENGTH; i++) {
      const div = document.createElement('div');
      div.classList.add('cursor-circle');
      cursor.appendChild(div);
      cursorCircles.push(div);
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isTouch) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.style.opacity = '1';
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      isTouch = true;
      mouseX = event.touches[0].clientX;
      mouseY = event.touches[0].clientY;
      cursor.style.opacity = '1';
    };

    const onTouchEnd = () => {
      cursor.style.opacity = '0';
    };

    const updateCursor = () => {
      cursorHistory.shift();
      cursorHistory.push({ x: mouseX, y: mouseY });

      for (let i = 0; i < TAIL_LENGTH; i++) {
        const current = cursorHistory[i];
        const next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];

        const xDiff = next.x - current.x;
        const yDiff = next.y - current.y;

        current.x += xDiff * 0.35;
        current.y += yDiff * 0.35;
        cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/TAIL_LENGTH})`;
      }
      requestAnimationFrame(updateCursor);
    };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchend', onTouchEnd, false);
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return null;
}