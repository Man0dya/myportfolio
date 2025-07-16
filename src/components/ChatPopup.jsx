import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatPopup = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi there! I'm MBot. How can I assist you today?" },
  ]);
  const [typing, setTyping] = useState(false);
  const [options, setOptions] = useState([
    "Tell me about Manodya",
    "View Projects",
    "Get CV",
    "Other Questions",
  ]);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Default state for resetting
  const defaultMessages = [
    { from: "bot", text: "👋 Hi there! I'm MBot. How can I assist you today?" },
  ];
  const defaultOptions = [
    "Tell me about Manodya",
    "View Projects",
    "Get CV",
    "Other Questions",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, typedText]);

  // Reset chat when closed
  useEffect(() => {
    if (!isOpen) {
      setMessages(defaultMessages);
      setOptions(defaultOptions);
      setTyping(false);
      setTypedText("");
      setIsTyping(false);
    }
  }, [isOpen]);

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    onClose(); // Close the chat after scrolling
  };

  // Function to scroll to hero section
  const scrollToHero = () => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  // Typewriter effect function
  const typewriterEffect = (text, callback) => {
    setIsTyping(true);
    setTypedText("");
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 30);
  };

  const handleUserChoice = (option) => {
    setOptions((prev) => prev.filter((opt) => opt !== option));
    setMessages((prev) => [...prev, { from: "user", text: option }]);
    setTyping(true);

    // Handle Yes button click separately
    if (option === "Yes") {
      setTyping(false);
      setOptions([]); // Clear options
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: "", isTyping: true, isWhatsApp: true }]);
        
        typewriterEffect(" Here is a secret button to do that 😉", () => {
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { from: "bot", text: " Here is a secret button to do that 😉", isWhatsApp: true };
            return newMessages;
          });
          setTypedText("");
        });
      }, 600);
      return;
    }

    setTimeout(() => {
      let botReply = "";
      let hasLink = false;
      
      switch (option) {
        case "Tell me about Manodya":
          botReply =
            " Manodya is a passionate developer, designer, and problem solver from Sri Lanka.";
          break;
        case "View Projects":
          botReply = " 🚀 Check out the projects section on this site to see recent work. Click the arrow to go there!";
          hasLink = true;
          break;
        case "Get CV":
          botReply = " 📄 You can download the CV directly from the portfolio header. Click the arrow to go there!";
          hasLink = true;
          break;
        case "Other Questions":
          botReply = " I know i know the website has all the information you need then why a chatbot?";
          break;
        default:
          botReply = " I'm not sure, but I'd love to try and help!";
      }
      setTyping(false);

      setMessages((prev) => [...prev, { from: "bot", text: "", isTyping: true, hasLink }]);

      typewriterEffect(botReply, () => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { from: "bot", text: botReply, hasLink };
          return newMessages;
        });
        setTypedText("");

        // Add follow-up messages with typewriter effect for 'Other Questions'
        if (option === "Other Questions") {
          setTimeout(() => {
            setMessages((prev) => [...prev, { from: "bot", text: "", isTyping: true }]);
            
            typewriterEffect(" I don't know that either. He just added me here just for fun 😄", () => {
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { from: "bot", text: " I don't know that either. He just added me here just for fun 😄" };
                return newMessages;
              });
              setTypedText("");

              // Add the question about connecting
              setTimeout(() => {
                setMessages((prev) => [...prev, { from: "bot", text: "", isTyping: true }]);
                
                typewriterEffect(" Do you want to know a quick way to connect with Manodya?", () => {
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { from: "bot", text: " Do you want to know a quick way to connect with Manodya?" };
                    return newMessages;
                  });
                  setTypedText("");

                  // Show Yes button
                  setOptions(["Yes"]);
                });
              }, 500);
            });
          }, 500);
        }
      });
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end justify-end p-4 sm:p-6 bg-black/30 backdrop-blur-md font-inter"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🤖</span>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  MBot
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-400 text-2xl font-semibold transition-colors"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto space-y-5 pr-3 scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 max-h-[500px]"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.from === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl text-base leading-6 max-w-[80%] ${
                      msg.from === "bot"
                        ? "bg-violet-50 dark:bg-violet-700/30 text-gray-800 dark:text-gray-100"
                        : "bg-gradient-to-r from-violet-500 to-violet-600 text-white"
                    } shadow-md`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{msg.isTyping ? typedText : msg.text}</span>
                      {msg.hasLink && !msg.isTyping && (
                        <button
                          onClick={msg.text.includes('CV') ? scrollToHero : scrollToProjects}
                          className="flex-shrink-0 p-2 bg-violet-500 hover:bg-violet-600 text-white rounded-full transition-colors duration-200 shadow-md"
                          title={msg.text.includes('CV') ? "Go to CV section" : "Go to Projects"}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {msg.isWhatsApp && (
                      <button
                        onClick={() => window.open('https://wa.me/94707505656', '_blank')}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.7 0-3.36-.44-4.8-1.28l-.34-.2-3.7.97.99-3.6-.22-.36A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.54 0 4.93.99 6.73 2.77A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                        Connect on WhatsApp
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-5 py-3 rounded-2xl bg-violet-50 dark:bg-violet-700/30 text-gray-800 dark:text-gray-100 text-base flex items-center space-x-3 shadow-md">
                    <span className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce" />
                      <span
                        className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </span>
                    <span>Typing</span>
                  </div>
                </motion.div>
              )}

              {/* Initial Options (always visible initially) */}
              {options.length > 0 && !typing && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3 mt-5"
                >
                  {options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUserChoice(option)}
                      className="px-5 py-2.5 rounded-full bg-violet-50 dark:bg-violet-700/30 text-gray-800 dark:text-gray-100 hover:bg-gradient-to-r hover:from-violet-500 hover:to-violet-600 hover:text-white text-base font-semibold transition-all duration-200 ring-1 ring-violet-200 dark:ring-violet-600/50 shadow-md w-full text-left"
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;