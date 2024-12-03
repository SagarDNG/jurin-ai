import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './ChatBox.module.css';

interface ChatBoxProps {
    user: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ user }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>(null);

    // Initialize WebSocket connection on component mount
    useEffect(() => {
        const newSocket = io('http://localhost:3001'); // Replace with your backend WebSocket server URL
        setSocket(newSocket);

        // Listen for incoming messages
        newSocket.on('receive-message', (data: { user: string; message: string }) => {
            setMessages((prev) => [...prev, `${data.user}: ${data.message}`]);
        });

        // Cleanup on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (input.trim() && socket) {
            // Send message to the server
            socket.emit('send-message', { user, message: input });
            setMessages((prev) => [...prev, `You: ${input}`]);
            setInput('');
        }
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.messages}>
                {messages.map((msg, idx) => (
                    <div key={idx}
                    className={`${styles.message} ${
                        msg.startsWith('User A') ? styles.userA : styles.userB
                      }`}
                    >
                        {msg}
                        </div>
                ))}
            </div>
            <div className={styles.inputSection}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className={styles.inputField}
                />
                <button onClick={handleSendMessage} className={styles.button}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
