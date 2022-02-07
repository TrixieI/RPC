import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom"


function Chat({socket, username, room}) {
    const [currentMessage, SetCurrentMessage] = useState("")
    const [messageList, SetMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                user: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            SetMessageList((list) => [...list, messageData])
            SetCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            SetMessageList((list) => [...list, data])
        })
    }, [socket])

  return (
      <div className="chat-window"> 
          <div className="chat-header">
            <p>RPC Chat</p>
          </div>
          <div className="chat-body">
              <ScrollToBottom className="message-container">
            {messageList.map((data) => {
                return (
                    <div className="message" id={username === data.user ? "you" : "other"}>
                        <div>
                            <div className="message-content">
                                <p>{data.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{data.time}</p>
                                <p id="user">{data.user}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input value={currentMessage} type="text" placeholder="Message..." onChange={(e) => {
          SetCurrentMessage(e.target.value);
        }} onKeyPress={(e) => {e.key === "Enter" && sendMessage()}} />
            <button onClick={sendMessage}>SEND</button>
          </div>
      </div>
  )
}

export default Chat;
