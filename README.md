# 🫴이모지 추천기 emoji

---

![image.png](result_image/image1.png)

### 📣 소개

검색어에 따라 `Gemini`를 사용한 인공지능으로 이모지를 추천해주는 이모지 추천기 **emoji**

Notion 문서의 목차에 이모지를 추가하면 시각적으로 더 보기 좋아져서 자주 활용하곤 한다. 

하지만 **적절한 이모지**를 찾기가 쉽지 않았다. 그래서 이러한 **불편함을 해소하고자 관련 웹사이트를 직접 개발**하게 되었다.

### ⚙️ 사용 기술

- `html` : 전반적인 웹 페이지의 구성
- `css` : 웹 페이지의 디자인을 위해 사용
- `Java Script` : `react`내에서 기능을 구현
- `react` : 웹 페이지 내의 매끄러운 전환과 유용한 기능을 넣기 위해 사용
- `p5.js` : 배경에 내려오는 이모지 구현

### 📖 Installation

1. Clone the Repository
```bash 
git clone https://github.com/JINJIYU23/Emoji-recommder.git
cd emoji
```

2. 필요한 react 라이브러리 설치

```bash
npm install
```

3. Google AI 연동
- [https://aistudio.google.com/prompts/new_chat](https://aistudio.google.com/prompts/new_chat)에서 API key 발급
- .env 파일 생성 후 아래 코드 입력

```bash
REACT_GOOGLE_API_KEY=<YOUR API KEY>
```

4. Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

tailwind.config.js파일에 아래 코드 복사

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

index.css 파일에 아래 코드 복사

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. 🎉 start **emoji 🎉**

- http://localhost:3000/ 로 접속 가능!
```jsx
npm start
```

---

### ✅결과

![메인 화면](result_image/2024-11-22111829-ezgif.com-video-to-gif-converter.gif)

메인 화면

![영어 버전 검색 결과](result_image/image2.png)

영어 버전 검색 결과

![한글 버전 검색 결과](result_image/image3.png)

한글 버전 검색 결과

![이모지가 복사 된 후 뜨는 창](result_image/image4.png)

이모지가 복사 된 후 뜨는 창

![아무것도 입력하지 않았을 때 알림](result_image/image5.png)

아무것도 입력하지 않았을 때 알림

![이상한 단어를 입력했을 때 에러 메세지](result_image/image6.png)

이상한 단어를 입력했을 때 에러 메세지