import { io } from 'socket.io-client';
import { useEffect, useState } from 'react'

let socket;


const Chat = () => {
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        socket = io();

        socket.on("chat", (chat) =>{
            setMessages(messages => [...messages, chat])
        })
        return (() => {
            socket.disconnect()
        })
    }, [])


};


export default Chat;
