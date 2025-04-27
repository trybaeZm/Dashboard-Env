
import { useState } from "react";

export default function ChatInput({ onMessage }) {
    const [message, setMessage] = useState("");

    const user_id = "123e4567-e89b-12d3-a456-426614174121"; // Keep it dynamic in production

    const sendMessage = async () => {
        if (!message.trim()) return;

        onMessage({ role: "user", content: message });

        try {
            const response = await fetch("/api/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, question: message }),
            });

            const data = await response.json();
            onMessage({
                role: "bot",
                content: data.response || "⚠️ Sorry, no response from the server.",
            });
        } catch (error) {
            onMessage({ role: "bot", content: "⚠️ Failed to fetch response." });
        }

        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-input flex items-center gap-2 mt-4">
            <input
                type="text"
                className="flex-1 px-4 py-2 rounded border border-gray-300 shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Ask a business question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                Send
            </button>
        </div>
    );
}

// import { useState } from "react";

// export default function ChatInput({ onMessage }) {
//     const [message, setMessage] = useState("");

//     const sendMessage = async () => {
//         if (!message.trim()) return;

//         const user_id = "123e4567-e89b-12d3-a456-426614174001"; // ✅ UUID string format

//         try {
//             const response = await fetch("/api/query", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ user_id, question: message }),
//             });

//             const data = await response.json();

//             // Log for debugging
//             console.log("Response from API:", data);

//             onMessage({ role: "user", content: message });

//             if (data.response) {
//                 onMessage({ role: "bot", content: data.response });
//             } else {
//                 onMessage({ role: "bot", content: "⚠️ Sorry, I didn't get a response." });
//             }

//             setMessage("");
//         } catch (error) {
//             console.error("❌ Error sending message:", error);
//             onMessage({ role: "bot", content: "⚠️ Error: Could not fetch response from server." });
//         }
//     };

//     return (
//         <div className="chat-input">
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Ask a business question..."
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }

// import { useState } from "react";

// export default function ChatInput({ onMessage }) {
//     const [message, setMessage] = useState("");

//     const sendMessage = async () => {
//         if (!message.trim()) return;
    
//         const user_id = "123e4567-e89b-12d3-a456-426614174001"
//         //  localStorage.getItem("user_id") || "123e4567-e89b-12d3-a456-426614174001";
    
//         onMessage({ role: "user", content: message });
    
//         try {
//             const response = await fetch("/api/query", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ user_id, question: message }),
//             });
    
//             const data = await response.json();
    
//             console.log("🧠 Received data:", data);
    
//             if (response.ok && data.response) {
//                 onMessage({ role: "bot", content: data.response });
//             } else {
//                 onMessage({ role: "bot", content: "⚠️ I didn’t get a valid response from the AI." });
//             }
    
//             setMessage("");
//         } catch (err) {
//             console.error("💥 Fetch failed:", err.message);
//             onMessage({ role: "bot", content: "⚠️ Something went wrong." });
//         }
//     };
    

//     return (
//         <div className="chat-input">
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Ask a business question..."
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }