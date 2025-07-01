"use client"
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { Chat } from "@/types/chat";
import { IoMdChatbubbles } from "react-icons/io";
import { LuSendHorizontal } from "react-icons/lu";
import { MdKeyboardVoice } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { CiInboxOut } from "react-icons/ci";
import {  MessageSquareTextIcon } from "lucide-react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import image from '../../../public/images/trybae.png'


const ChatCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // state for messages
  const [messages, setMessages] = useState<{ message: string, sender: string }[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      console.log(message);
      setMessage('');
     
      // add message to messages sender should be user for client and bot for server
      setMessages([...messages, { message: message, sender: 'user' }]);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }
  return (
    <div className="flex fixed bg-white dark:bg-boxdark top-20 left-0 right-0 bottom-0">
      {
        messages.length > 0 ?
        <div className="absolute border-b border-gray-200 dark:border-gray-700 z-50 bg-white dark:bg-boxdark p-2 top-0 w-full flex justify-between items-center">
          <button onClick={() => setIsOpen(!isOpen)} className=" flex items-center gap-2  border border-gray-700 dark:border-gray-200 rounded-md p-2 top-2 left-2 text-[#1C1C1C70] dark:text-gray-200 z-50">
            <MessageSquareTextIcon className="size-6" />
            Chat History
          </button>
          <div className="p-2 text-gray-800 dark:text-gray-200">
            Lenny <span className="text-gray-500 bg-[#C6C7F8] py-1 px-3 rounded-md dark:text-gray-700">Plus</span>
          </div>
        </div>
        :
       "" 
      }

      <div className={`grow-1 md:translate-x-0 transition-all absolute md:block md:relative z-50 h-full duration-300 ${isOpen ? 'translate-x-4/4' : ' -translate-x-full'} shadow-md  p-2  bg-white dark:bg-boxdark`}>
        <button onClick={() => setIsOpen(!isOpen)} className="flex md:hidden  justify-end p-2  w-full text-gray-800 dark:text-gray-200 z-50">
          <Bars3BottomLeftIcon className="size-6" />
        </button>
        <div className="flex flex-col  justify-between h-full ">
          <div className="flex flex-col gap-5">
            {/* search area */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-2 rounded-md">
              <div className="grow-0 text-gray-500 dark:text-gray-400">
                <FaSearch />
              </div>
              <input type="text" className="flex-1 outline-none px-5 bg-transparent dark:text-white" placeholder="Search" />
            </div>

            {/* body */}
            <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <MdOutlineMessage />
                <div>
                  Understanding Customers
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineMessage />
                <div>
                  Sales Analytics
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineMessage />
                <div>
                  New chat
                </div>
              </div>
            </div>
          </div>

          {/* bottom buttons */}
          <div className="gap-3 flex flex-col">
            <button className="btn bg-black dark:bg-gray-900 px-3 w-full py-2 flex gap-2 justify-center items-center text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
              <FaPlus />
              New Chat
            </button>
            <button className="btn bg-gray-500 dark:bg-gray-700 px-3 w-full justify-center py-2 flex gap-2 items-center text-white rounded-md hover:bg-gray-600 dark:hover:bg-gray-600">
              <FaPlus />
              Upload External Sales Data
            </button>
            <button className="px-3 w-full py-2 flex gap-2 items-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaTrashAlt />
              Clear conversations
            </button>
            <button className="px-3 w-full py-2 flex gap-2 items-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              <CiInboxOut />
              Updates and FAQs
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex justify-center relative w-full items-center bg-gray-50 dark:bg-boxdark-2">
          {messages.length > 0 ?
            <>
              <div className={`flex h-full overflow-y-auto pb-[100px] items-end w-full  pt-20  p-2  flex-col gap-2`}>
                {messages.map((e, key) =>
                <div key={key} className={`w-full flex ${e.sender === 'user' ? ' justify-end' : 'justify-start'}`}>
                  <div className={`flex break-all flex-wrap max-w-[90%] text-gray-800 dark:text-gray-200 px-5 py-2 ${e.sender === 'user' ? 'bg-primary/10 dark:bg-primary/25 rounded-tl-lg rounded-bl-lg rounded-tr-lg' : 'bg-gray-200 dark:bg-boxdark rounded-tl-lg rounded-br-lg rounded-tr-lg'} gap-2`}>
                        {e.message}
                  </div>
                </div>

                )}
              </div>
            </>
            :
            <div className="grow-2 flex h-full items-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-center items-center flex flex-col gap-3">
                <Image
                  alt="logo"
                  width={50}
                  src={image}
                />
                <div className="text-gray-800 dark:text-gray-200 font-bold">HI, HOW CAN I HELP YOU TODAY?</div>
                <IoMdChatbubbles size={30} className="text-gray-600 dark:text-gray-400" />
                <div className="text-gray-800 dark:text-gray-200">Examples</div>
                <div className="flex flex-col gap-2">
                  <div className="bg-white dark:bg-gray-700 p-1 rounded-md text-gray-800 dark:text-gray-200">
                    According to my products how can i make more sales
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-1 rounded-md text-gray-800 dark:text-gray-200">
                    At my current rate how can i optimize to retain customers?
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-1 rounded-md text-gray-800 dark:text-gray-200">
                    Generate a sales report
                  </div>
                </div>
              </div>
            </div>
          }
        <div className="w-full grow-0 p-3 absolute bottom-0">
          <form onSubmit={handleSubmit} className="flex flex-col items-center shadow-md gap-3 bg-white dark:bg-boxdark w-full p-2 rounded-md">
            <div className="w-full">
              <TextareaAutosize
                maxRows={10}
                minRows={1}
                value={message}
                className="flex-1 w-full outline-none resize-none bg-transparent dark:text-white"
                placeholder="type message"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex justify-between w-full">
              <div className="flex gap-3">
                <MdKeyboardVoice size={20} className="text-gray-600 dark:text-gray-400" />
                <FaImage size={20} className="text-gray-600 dark:text-gray-400" />
              </div>

              <button type="submit" className="">
                <LuSendHorizontal size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;

