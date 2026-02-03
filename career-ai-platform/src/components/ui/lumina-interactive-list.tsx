import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const THREE: any;

// Lightweight Lumina-like interactive list component (TSX)
export function LuminaInteractiveList() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Lazy-load GSAP for animations
    if (!(window as any).gsap) {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      s.onload = () => {
        const items = listRef.current?.querySelectorAll('li');
        if (items?.length && (window as any).gsap) {
          (window as any).gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 });
        }
      };
      document.head.appendChild(s);
      return () => {
        document.head.removeChild(s);
      };
    } else {
      const items = listRef.current?.querySelectorAll('li');
      if (items?.length && (window as any).gsap) {
        (window as any).gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 });
      }
    }
  }, []);

  return (
    <div className="ui-card" style={{ padding: 16 }}>
      <h3 className="text-lg font-semibold mb-2">Lumina Interactive List</h3>
      <ul ref={listRef} className="space-y-2">
        {['Item A','Item B','Item C','Item D'].map((t, idx) => (
          <li key={idx} className="p-2 bg-gray-50 rounded-md">{t}</li>
        ))}
      </ul>
    </div>
  );
}
