"use client";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import { FaSearch, FaPlus, FaImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineMessage, MdKeyboardVoice } from "react-icons/md";
import { CiInboxOut } from "react-icons/ci";
import { LuSendHorizontal } from "react-icons/lu";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

const ChatCard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ role: "bot", content: "👋 Ask me anything about your business!" }]);
  const [loading, setLoading] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState<{ question: string; session_id: string }[]>([]);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef(null);

  // Create or load session
  useEffect(() => {
    const sid = localStorage.getItem("session_id") || uuidv4();
    localStorage.setItem("session_id", sid);
    setSessionId(sid);
  }, []);

  // Load user
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    const name = localStorage.getItem("user_name");
    if (!id || !name) setShowModal(true);
    else {
      setUserId(id);
      setUserName(name);
    }
  }, []);

  // Load recent chats
  useEffect(() => {
    if (!userId) return;
    fetch(`http://127.0.0.1:8000/recent-questions?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.recent)) {
          const seenSessions = new Set();
          const uniqueRecent = [];
  
          for (const item of data.recent) {
            if (item.session_id && !seenSessions.has(item.session_id)) {
              seenSessions.add(item.session_id);
              uniqueRecent.push(item);
            }
            if (uniqueRecent.length === 5) break; // ✅ Only 5 different sessions
          }
  
          setRecentQuestions(uniqueRecent);
        } else {
          setRecentQuestions([]);
        }
      });
  }, [userId]);
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (customMessage?: string) => {
    const msg = customMessage || message;
    if (!msg.trim() || !sessionId) return;

    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, user_name: userName, question: msg, session_id: sessionId })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.response || "⚠️ No response from server." }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "⚠️ Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowUpload(false); // ✅ Close modal immediately after selecting

    let textContent = "";
  
    if (file.type === "text/csv") {
      const text = await file.text();
      textContent = text.slice(0, 5000);  // 5000 characters max
    } else if (file.type === "application/pdf") {
      const pdfjsLib = await import("pdfjs-dist");
      const pdfBytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
      const maxPages = Math.min(pdf.numPages, 5);
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(" ");
        textContent += pageText + "\n\n";
      }
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".xlsx")
    ) {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      textContent = XLSX.utils.sheet_to_csv(sheet).slice(0, 5000);
    } else {
      setMessages(prev => [...prev, { role: "bot", content: "⚠️ Unsupported file type." }]);
      return;
    }
  
    // ✅ Now send to Gemini
    await sendMessage(
      `📂 Analyze this uploaded file content:\n\n${textContent}`
    );
  
    setShowUpload(false);
  };
  
  const loadSession = async (sessionId: string) => {
    if (!sessionId) {
      setMessages([{ role: "bot", content: "⚠️ Missing session ID!" }]);
      return;
    }

    const res = await fetch(`/api/chat-session?user_id=${userId}&session_id=${sessionId}`);
    const data = await res.json();

    if (!data?.session || data.session.length === 0) {
      setMessages([{ role: "bot", content: "⚠️ No messages found for this session." }]);
      return;
    }

    const sessionMsgs = data.session.flatMap((chat: any) => [
      { role: "user", content: chat.question },
      { role: "bot", content: chat.answer }
    ]);
    setMessages(sessionMsgs);
    setSessionId(sessionId); // switch context
    localStorage.setItem("session_id", sessionId);
  };

  
  return (
    <div className="flex fixed top-20 left-0 right-0 bottom-0 bg-white dark:bg-boxdark">
      {/* SIDEBAR */}
      <div className={`transition-all shadow-md p-2 bg-white dark:bg-boxdark md:block absolute md:relative ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="flex md:hidden justify-end p-2 w-full text-gray-800 dark:text-gray-200">
          <Bars3BottomLeftIcon className="size-6" />
        </button>
        <div className="flex flex-col justify-between h-full overflow-y-auto pr-2">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-2 rounded-md">
              <FaSearch className="text-gray-500 dark:text-gray-400" />
              <input type="text" className="flex-1 outline-none px-5 bg-transparent dark:text-white" placeholder="Search" />
            </div>
            <div className="mt-4">
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Recent Chats</div>
              <div className="flex flex-col gap-2">
                {recentQuestions.map((q, i) => (
                  q.session_id ? (
                    <div key={i} onClick={() => loadSession(q.session_id)} className="text-sm p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      {q.question.slice(0, 40)}...
                    </div>
                  ) : (
                    <div key={i} className="text-sm p-2 text-gray-400 italic">⚠️ Missing session</div>
                  )
                ))}

              </div>
            </div>
            
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => {
                  const newId = uuidv4();                       // ✅ Reset session ID
                  setSessionId(newId);
                  localStorage.setItem("session_id", newId);    // ✅ Store new session
                  setMessages([{ role: "bot", content: "👋 Ask me anything about your business!" }]);
                }}
              >
                <MdOutlineMessage className="text-lg" />
                New Chat
              </button>


            {/* </div> */}
          </div>
          <div className="gap-3 flex flex-col mt-6">
            <button onClick={() => setShowUpload(true)} className="btn bg-gray-500 dark:bg-gray-700 px-3 py-2 text-white rounded-md">
              <FaPlus /> Upload External Sales Data
            </button>
            <button onClick={() => setMessages([])} className="px-3 py-2 flex gap-2 items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaTrashAlt /> Clear conversations
            </button>
            <button className="px-3 py-2 flex gap-2 items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <CiInboxOut /> Updates and FAQs
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex flex-col justify-center relative w-full bg-gray-50 dark:bg-boxdark-2">
        <div className="flex h-full overflow-y-auto pb-[100px] pt-20 p-2 flex-col gap-2">
          {messages.map((msg, idx) => (
            <div key={idx} ref={el => (messageRefs.current[idx] = el)} className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[90%] px-5 py-2 rounded-lg shadow-sm text-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-primary/10 dark:bg-primary/25" : "bg-gray-200 dark:bg-boxdark"} text-gray-800 dark:text-gray-200`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && <div className="text-sm text-yellow-800 bg-yellow-100 px-4 py-2 rounded animate-pulse">Typing...</div>}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="absolute bottom-0 w-full p-3">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex flex-col items-center shadow-md gap-3 bg-white dark:bg-boxdark p-2 rounded-md">
            <TextareaAutosize value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())} className="w-full outline-none resize-none bg-transparent dark:text-white" placeholder="Type message" />
            <div className="flex justify-between w-full">
              <div className="flex gap-3"><MdKeyboardVoice /><FaImage /></div>
              <button type="submit"><LuSendHorizontal /></button>
            </div>
          </form>
        </div>
      </div>

      {/* MODALS */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">👤 What’s your name?</h2>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <button onClick={() => {
              const id = uuidv4();
              localStorage.setItem("user_id", id);
              localStorage.setItem("user_name", userName);
              setUserId(id);
              setShowModal(false);
            }} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Save & Continue</button>
          </div>
        </div>
      )}

      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📁 Upload Sales Data</h2>
            <input type="file" accept=".csv,.pdf,.xlsx" className="mb-4" onChange={uploadFile} />
            <button onClick={() => setShowUpload(false)} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
