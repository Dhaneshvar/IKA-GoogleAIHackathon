import gptLogo from '../assets/chatgpt.svg';
import addbtn from '../assets/add-30.png';

import saved from '../assets/bookmark.svg';
import rocket from '../assets/rocket.svg';

import GirlProfile from "../assets/girl.jpg";
import ShoppingIcon from '../assets/ShoppingIconTransparentbg.png';

import sendImg from '../assets/send.svg';
import { useEffect, useRef, useState } from 'react';

import {getTextApiResponse,setUserInput,getTextApiResponseviaVisual} from "../Slice/appSlice";
import { useSelector, useDispatch } from 'react-redux';

import ShopLocation from './MapShopLocation';

import BasicModal from "../Components/FileModal";
import SpeedDialTooltipOpen from "../Components/SpeedDialTooltipOpen";

import  CustomizedSnackbars  from "../Components/SnackbarSuccess";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {TypeWritterEffect} from "../Components/TypeWritterEffect";
import { useNavigate } from "react-router-dom";


import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';


import TextareaAutosize from 'react-textarea-autosize';

import ReactMarkdown from 'react-markdown';

function Main() {

  const dispatch = useDispatch();
  const {userSystemMessage} = useSelector((state) => state.centerStore);
  const { chooseTool } = useSelector((state) => state.centerStore);
  const { userDetailSuccess } = useSelector((state) => state.centerStore);
  console.log(userDetailSuccess);
  console.log("CHOOSEN TOOL", chooseTool);
  const navigate = useNavigate();
  const msgEnd = useRef(null);
  const [here, setMain] = useState("");
  const [input, setInput] = useState("");
  // const [openModal, setModalOpen] = useState("false");
  const [modalShow, setModalShow] = useState('false');
  const [messages, setMessages] = useState([
    {
    text: "Hi I am chatGPT, How can I help you ?",
    isBot: true,
    }
  ]);

  useEffect(() => {
      console.log(userSystemMessage);
  },[userSystemMessage])

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[userSystemMessage])   // If message is chagned, useEffect is triggered and scrolled to current View

  const handleInputChange = (e) =>{
    setInput(e.target.value);
    console.log(input);
  }

  
  const handleSend = async () =>
  {
    console.log("HANDLE SEND",input);
    if(input !== null && input !== '')
    {
      
        console.log(input)
        dispatch(setUserInput(input));
        dispatch(getTextApiResponse(input));
        setInput("");


    }
      
     
    }

    // This function is used when we press enter on the input field
    const handleEnter = async (e) => {
      if(e.key === 'Enter' && input !== null && input !== '') await handleSend();
    }

    const handleQuery = async (e) =>{
      const textcpy = e.target.value;
      if(textcpy !== null && textcpy !== '')
      {
        console.log(textcpy);
        console.log("Came inside query method")
        dispatch(setUserInput(textcpy));
        dispatch(getTextApiResponse(textcpy));
        setInput("");
      }

      console.log(messages)
      
      const res = 'dummy';
      console.log("handleSended");
      setMessages([...messages, 
        {text: textcpy, isBot: false},  //useMessage
        {text: res, isBot: true}   // chat gpt Message
      ]);
    }

    const handleApiTest = () =>{

      fetch("http://127.0.0.1:5000/home").then((res)=> res.json()).then((data)=> console.log(data));
      
    }

    
    return (
      <div className="App">
            { 
                userDetailSuccess ? <CustomizedSnackbars  message=" Your details registred Successfully !!" errorType={"success"} horizontalValue='right' verticalValue='top' /> : null
            }
      <div className='main'>
      <div className='chats'>
        { !modalShow ?  <BasicModal show={modalShow} onHide={() => setModalShow(false)} /> : "" }

          {userSystemMessage?.map((message,ind) => 
            <div key={ind} className={ message.isBot ? 'chat bot' : 'chat'}>
              <img className='chatImg' src={message.isBot ? ShoppingIcon : GirlProfile} alt='' />
              {
                message.text !== "loading" ?
                (message.isMap ?
                  window.open('/map', '_blank') :
                  // navigate("/map", { target: "_blank" }) : 
                  <TypeWritterEffect  text={message.text} />
                  // <ReactMarkdown>{message.text}</ReactMarkdown>
                ):
                <Stack spacing={1}>
                  <Skeleton animation="wave" variant="rounded" width='55rem' />
                  <Skeleton animation="wave" variant="rounded" width='55rem'/>
                  <Skeleton animation="wave" variant="rounded" width='55rem' />
                </Stack>
              }
            </div>
          )}
            
          <div ref={msgEnd} />

        </div>
        <div className='chatFooter'>
          <div className='inp'> 
                <SpeedDialTooltipOpen className="speed"  /> : null 
              <input style={{overflowWrap: 'break-word'}}
              type='text' 
              minLength={2}
              name="" id=""
              value={input}  
              onKeyDown={handleEnter}
              onChange={(e) => handleInputChange(e)} 
              placeholder='Ask anything to your IKA . . .  .'
              required="required"
              />
                

            <button className='send'><img src={sendImg} alt="sendImage" onClick={handleSend}  /></button>
          </div>
          <p>** IKA - Intelligent kirana Assistant may produce incorrect results !! Consider Verifying important Information !!! **</p>
        </div>
      </div>

    </div>
  );
}

export default Main;