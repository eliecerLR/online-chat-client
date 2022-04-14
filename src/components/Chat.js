import { useEffect, useState, useRef } from "react";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                sendAt:
                    new Date(Date.now()).getHours() +
                    ':'
                    + new Date(Date.now()).getMinutes()
            }

            await socket.emit('sendMessage', messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    const divRef = useRef(null);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessageList((list) => [...list, data])
        })

    }, [socket])

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    })

    return (
        <div className="container">
            <div className="chat-header">
                <p className="chat-title">📌 Live Chat room &#9658; {room}</p>
            </div>
            <div className="chat-window">
                <div className="chat-body">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div className="message" key={index} id={username === messageContent.author ? 'you' : 'other'}>
                                <div className="msg-author">
                                    <h4>{messageContent.author}</h4>
                                </div>
                                <div className="msg-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="msg-date">
                                    <em>{messageContent.sendAt}</em>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={divRef}></div>
                </div>
            </div>

            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Write a message"
                    onChange={(event) =>
                        setCurrentMessage(event.target.value)}
                    onKeyPress={(e => e.key === 'Enter' && sendMessage())}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}


export default Chat;