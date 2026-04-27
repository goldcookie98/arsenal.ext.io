import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Users, Shield, LogIn } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [nickname, setNickname] = useState(localStorage.getItem('chat-nickname') || '');
    const [tempNickname, setTempNickname] = useState('');
    const [isMod, setIsMod] = useState(JSON.parse(localStorage.getItem('chat-is-mod') || 'false'));
    const [showModLogin, setShowModLogin] = useState(false);
    const [modUsername, setModUsername] = useState('');
    const [modPassword, setModPassword] = useState('');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!isOpen) return;

        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt', 'desc'),
            limit(100)
        );

        const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
            const msgs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                msgs.push({ 
                    id: doc.id, 
                    ...data,
                    createdAt: data.createdAt || { seconds: Date.now() / 1000 } 
                });
            });
            // Reverse to show oldest at top, newest at bottom
            setMessages(msgs.reverse());
            setTimeout(scrollToBottom, 100);
        }, (error) => {
            console.error("Firestore subscription error:", error);
        });

        return () => unsubscribe();
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const messageText = newMessage.trim();
        if (!messageText || !nickname) return;

        // Clear input immediately for better UX
        setNewMessage('');

        try {
            await addDoc(collection(db, 'messages'), {
                text: messageText,
                sender: nickname,
                isMod: isMod,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message: ", error);
            // Optional: restore the message if it failed
            setNewMessage(messageText);
            alert("Failed to send message. Please check your connection and Firestore rules.");
        }
    };

    const handleSetNickname = (e) => {
        e.preventDefault();
        if (tempNickname.trim()) {
            setNickname(tempNickname.trim());
            localStorage.setItem('chat-nickname', tempNickname.trim());
        }
    };

    const handleModLogin = (e) => {
        e.preventDefault();
        // Hardcoded admin credentials for the user as requested
        if (modUsername === 'Admin' && modPassword === 'Gunners2026') {
            setIsMod(true);
            setNickname(modUsername);
            localStorage.setItem('chat-is-mod', 'true');
            localStorage.setItem('chat-nickname', modUsername);
            setShowModLogin(false);
            alert("Moderator Status Activated! 🔴⚪️");
        } else {
            alert("Invalid Moderator Credentials.");
        }
    };

    const deleteMessage = async (id) => {
        if (!isMod) return;
        try {
            await deleteDoc(doc(db, 'messages', id));
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };

    return (
        <>
            {/* Floating Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--color-crimson)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px var(--glow-crimson)',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 9999,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1) rotate(0deg)'
                }}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            {/* Chat Panel */}
            <div style={{
                position: 'fixed',
                bottom: '6rem',
                right: '2rem',
                width: 'min(400px, 90vw)',
                height: 'min(640px, 80vh)',
                background: 'rgba(15, 15, 20, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid var(--border-glass)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 9998,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                pointerEvents: isOpen ? 'all' : 'none',
                fontFamily: 'Inter, sans-serif'
            }}>
                {/* Chat Header */}
                <div style={{
                    padding: '1rem 1.5rem',
                    background: 'linear-gradient(to right, rgba(239, 1, 7, 0.2), transparent)',
                    borderBottom: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'rgba(239, 1, 7, 0.2)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--color-crimson)'
                        }}>
                            <Users size={18} color="var(--color-crimson)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.95rem', color: 'white', margin: 0, fontWeight: 700 }}>Match Chat</h3>
                            <span style={{ fontSize: '0.7rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span style={{ width: '5px', height: '5px', background: '#4ade80', borderRadius: '50%' }}></span>
                                {messages.length > 0 ? `${messages.length} messages active` : 'Live'}
                            </span>
                        </div>
                    </div>
                    {!isMod && (
                        <button 
                            onClick={() => setShowModLogin(!showModLogin)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                            title="Moderator Login"
                        >
                            <Shield size={18} />
                        </button>
                    )}
                </div>

                {/* Main Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                    {/* Mod Login Overlay */}
                    {showModLogin && (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            textAlign: 'center'
                        }}>
                            <Shield size={48} color="var(--color-crimson)" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Moderator Login</h4>
                            <form onSubmit={handleModLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    value={modUsername}
                                    onChange={(e) => setModUsername(e.target.value)}
                                    style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: 'white' }}
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={modPassword}
                                    onChange={(e) => setModPassword(e.target.value)}
                                    style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: 'white' }}
                                />
                                <button type="submit" className="btn-primary" style={{ padding: '0.75rem' }}>Login</button>
                                <button type="button" onClick={() => setShowModLogin(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Cancel</button>
                            </form>
                        </div>
                    )}

                    {/* Messages List - Always visible to show history */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.length === 0 ? (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                No messages yet. Be the first!
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === nickname ? 'flex-end' : 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: msg.isMod ? 'var(--color-crimson)' : 'var(--color-gold)' }}>
                                            {msg.isMod && '🛡️ '}{msg.sender}
                                        </span>
                                        {isMod && (
                                            <button 
                                                onClick={() => deleteMessage(msg.id)}
                                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.6rem', padding: 0 }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ 
                                        padding: '0.75rem 1rem', 
                                        borderRadius: '16px', 
                                        borderTopRightRadius: msg.sender === nickname ? '4px' : '16px',
                                        borderTopLeftRadius: msg.sender === nickname ? '16px' : '4px',
                                        background: msg.sender === nickname ? 'var(--color-crimson)' : 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        maxWidth: '85%',
                                        fontSize: '0.9rem',
                                        boxShadow: msg.sender === nickname ? '0 4px 15px rgba(239, 1, 7, 0.2)' : 'none'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Interaction Area (Join or Type) */}
                    {!nickname ? (
                        <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-glass)', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>Pick a nickname to join the chat</p>
                            <form onSubmit={handleSetNickname} style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="Nickname..." 
                                    value={tempNickname}
                                    onChange={(e) => setTempNickname(e.target.value)}
                                    maxLength={20}
                                    style={{ flex: 1, padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: 'white', outline: 'none', fontSize: '0.85rem' }}
                                />
                                <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>Join</button>
                            </form>
                        </div>
                    ) : (
                        <form onSubmit={handleSendMessage} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '0.75rem' }}>
                            <input 
                                type="text" 
                                placeholder="Type a message..." 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{ 
                                    flex: 1, 
                                    padding: '0.75rem 1rem', 
                                    borderRadius: '12px', 
                                    background: 'rgba(255,255,255,0.08)', 
                                    border: '1px solid var(--border-glass)', 
                                    color: '#ffffff',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button 
                                type="submit" 
                                style={{ 
                                    width: '44px', 
                                    height: '44px', 
                                    borderRadius: '12px', 
                                    background: 'var(--color-crimson)', 
                                    color: 'white', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 10px var(--glow-crimson)'
                                }}
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <style>{`
                ::-webkit-scrollbar {
                    width: 4px;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </>
    );
};

export default LiveChat;
