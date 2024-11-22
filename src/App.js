import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { GoogleGenerativeAI } from "@google/generative-ai";
import RainEffect from './background.js';
import PopUp from './popUp.js';
import { BeatLoader } from 'react-spinners';
// import styled from 'styled-components';
import {CopyToClipboard} from "react-copy-to-clipboard";



function App() {

  let [open, setOpen] = useState(false);
  let [이모지, 이모지변경] = useState([]);
  let [input, setInput] = useState('');
  let [loading, setLoading] = useState(false);

  // popUp.js에 있는 모달 창을 열기 위한 컴포넌트
  let [isModalOpen, setIsModalOpen] = useState(false);

  // 메세지를 전달하기 위한 컴포넌트
  let [modalMessage, setModalMessage] = useState("");

  // 모달 창 오픈(미리 정한 메세지를 담아서)
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  }

  


  const handleSearch = async () => {
    if(input.trim() === "") {
      openModal("Enter text! 단어를 입력하세요.")
      return;
    }

    setLoading(true); // 로딩창을 띄우기
    try{
      const emojiData = await Emoji(input);  // 이모지 데이터를 불러옴
      이모지변경(emojiData.emojis);  // 이모지 데이터를 상태로 저장
      setLoading(false); // 데이터 찾은 후 로딩창 닫기
      setOpen(true);  // 모달을 열음
    } catch(error){
      openModal("Error! 다시 시도해주세요")
      return;
    }
    
    
  };

  // 검색어로 input박스 채워 넣기
  const handleInput = (e) => {
    setInput(e.target.value);
  }

  // 엔터 눌렀을 때 search 실행
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className='App'>
      <RainEffect/>
      <div className='emoji'>
        <h1 className='emojiTitle'>emoji</h1>
        <p className='emojiContent'>When you enter a search term,<br></br>
          <span className='aiFont'>💡 AI 💡</span> will recommend the emoji you want.
          <br></br>(English or Korean)</p>
        <input type='text' className='searchBox' 
        placeholder='enter text!' onChange={handleInput} onKeyDown={activeEnter}></input> 
        <button className="click group relative inline-block focus:outline-none "
          onClick={handleSearch}>
          <span className="click absolute inset-0 border"></span>
          <span className="click block border bg-yellow-300 px-10 py-2 transition-transfor group-hover:-translate-x-1 group-hover:-translate-y-1">
          search
          </span>
        </button>

        {/* 로딩중이면 로딩창 보여주기 아니면 카드 띄워 주기 */}
        {loading ? <Loading/> : open === true ? <Card open={open} setOpen={setOpen} 이모지={이모지} input={input} openModal={openModal}/> : null}
        
        {/* PopUp 모달 */}
        <PopUp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        message={modalMessage}/>
      </div>
    </div>
  );
}



function Card(props) {


  return (
    <div
      className="modal show"
      style={{ display: 'block',position: 'initial' }}
    >
    <Container>
      <Row>
      {
        props.이모지.map(function(a,i){
          return (
                <Col md = {4}>
                  <div key={i} className='emojiBox'>
                    <div className='topTap'>
                    <div className='tab3'></div>
                    <div className='tab2'></div>
                    <div className='tab1'></div>
                    <p className='clear'></p>
                    </div>
                    <div id='realTitle'>
                      {props.이모지[i].name}  
                    </div>
                    <div>
                      <p className='realEmoji'>{props.이모지[i].icon}</p>
                    </div>
                    <div>
                      {/* 이모지 복사 기능 */}
                      <CopyToClipboard
                        text = {props.이모지[i].icon} 
                        onCopy={() => {
                          props.openModal("Copied! 복사되었어요.")
                        }}>
                        <button className='copy'>Copy</button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </Col>
          )
        })
      }
      </Row>
    </Container>
    
  </div>
  )}

function Loading() {
  return (
    <BeatLoader color="#00A5FF" margin={3} size={30} speedMultiplier={1}/>
  )
}
  
async function Emoji(input) {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const promptText = `Please recommend 6 emojis that fit the following words: ${input}
    Please return the result in JSON format as follows:
    {
      "emojis": [
        {"name": "이모지이름", "icon": "이모지", "description": "한글설명"}
      ]
    }`;

  const result = await model.generateContent(promptText);
  const response = await result.response.text();
  // console.log(result.response.text());
  return JSON.parse(response.replace('```json', '').replace('```',''));
}
  
export default App;
