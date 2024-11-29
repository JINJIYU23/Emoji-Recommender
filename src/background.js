import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const RainEffect = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let textPool = ['🙂', '💕', '🧡', '🤔', '🎁', '✌', '🤷‍♂️', '🤍', '🎶', '🎈', '💡', '🤳', '❌', '🎂', '👀', '✔', '🐱‍🐉'];
      let texts = [];
      let textY = [];
      let textSpeed = [];

      const minSpeed = 0.8;
      const maxSpeed = 5;
      const tSize = 32;  // 이모지 크기 설정

      // p5.js setup
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textSize(tSize);
        p.noStroke();
        rainStart();
      };

      // p5.js draw
      p.draw = () => {
        p.clear();

        // Falling text
        for (let i = 0; i < texts.length; i++) {
          p.text(texts[i], (i * 50) % p.width, textY[i]);
          textY[i] += textSpeed[i];
          
          // 화면 아래로 벗어나면 위로 다시 보냄
          if (textY[i] > p.height) {
            textY[i] = 0;
          }
        }
      };

      // 캔버스 크기에 맞춘 초기화 함수
      function rainStart() {
        texts = [];
        textY = [];
        textSpeed = [];
        
        const numTexts = Math.floor(p.width / 50); // 화면 너비에 따라 이모지 개수 설정

        for (let i = 0; i < numTexts; i++) {
          const numIndex = p.floor(p.random(textPool.length));
          texts[i] = textPool[numIndex];
          textY[i] = p.random(0, p.height / 2);
          textSpeed[i] = p.random(minSpeed, maxSpeed);
        }
      }

      // 창 크기 변경 시 캔버스와 이모지 위치 재설정
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        rainStart(); // 창 크기에 맞춰 이모지 배열을 재설정
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    // Clean up p5 instance on component unmount
    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
  <div ref={sketchRef} 
  style={{backgroundColor: "rgba(255, 250, 205, 0.4)",  // 원하는 배경색 설정
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, // 배경처럼 뒤로 보내기>
  }}>
  </div>
  );
};

export default RainEffect;
