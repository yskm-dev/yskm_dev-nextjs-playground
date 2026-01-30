import gsap from 'gsap';

function createAnimateFunction(target: HTMLElement, text: string) {
  return () => {
    const chars = text.split('');
    // Fisher-Yatesシャッフル
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    target.textContent = chars.join('');
  };
}

export function customTextShuffle(span: HTMLElement, text: string): void {
  const func = createAnimateFunction(span, text);

  gsap.ticker.fps(15);
  gsap.ticker.add(func);
  span.classList.add('animating');
  setTimeout(() => {
    gsap.ticker.remove(func);
    span.textContent = text;
    span.classList.remove('animating');
  }, 300);
}
