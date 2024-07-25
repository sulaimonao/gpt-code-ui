import "./Chat.css";

import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import PersonIcon from "@mui/icons-material/Person";
import TerminalIcon from '@mui/icons-material/Terminal';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { MessageDict,   
 APIContext } from "../App"; // Import APIContext

import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from "react-syntax-highlighter";
import { RefObject, useContext } from "react"; // Import useContext
import ReactMarkdown from 'react-markdown';
// Inside Message component
import OpenAILogo from './openai-logo.svg'; 
import GeminiLogo from './gemini-logo.svg';


function Message(props: {
  text: string;
  role: string;
  type: string;
  showLoader?: boolean;
}) {
  let { text, role } = props;
  const selectedAPI = useContext(APIContext); // Get selectedAPI from context

  const isMarkdown = (input: string) => {
    const mdRegex = /\[.*\]\(.*\)|\*\*.*\*\*|__.*__|\#.*|\!\[.*\]\(.*\)|`.*`|\- .*|\|.*\|/g;
    return mdRegex.test(input);
  };

  let ICONS = {
    "upload": <FileUploadIcon />,
    "generator":  <VoiceChatIcon />,
    "system": <TerminalIcon />,
    "user": <PersonIcon />,
  };

  return (
    <div className={"message " + role}>
      <div className="avatar-holder">
        <div className="avatar">
          { ICONS[role as keyof typeof ICONS] }
        </div>   

      </div> {/* <-- Closing bracket for avatar-holder */}
      <div className="message-body">
        {/* ... (rest of the message body code remains the same) ... */}
        {props.type == "message" &&
          (props.showLoader ? (
            <div>
              {text} {props.showLoader ? <div className="loader"></div> : null}
              {role === "generator" && (
                <div className="api-indicator">
                  {selectedAPI === "OpenAI" ? <OpenAILogo /> : <GeminiLogo />} 
                </div>
              )}
            </div>
          ) : (
            isMarkdown(text) ? 
              // ... (Markdown rendering) ...
            :
              <div className="cell-output" dangerouslySetInnerHTML={{ __html: text }}></div>
          ))}
      </div>
    </div>
  );
}

export enum WaitingStates {
  GeneratingCode = "Generating code",
  RunningCode = "Running code",
  UploadingFile = "Uploading file",
  Idle = "Idle",
}

export default function Chat(props: {
  waitingForSystem: WaitingStates;
  chatScrollRef: RefObject<HTMLDivElement>;
  messages: Array<MessageDict>;
}) {
  return (
    <>
      <div className="chat-messages" ref={props.chatScrollRef}>
        {props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              text={message.text}
              role={message.role}
              type={message.type}
            />
          );
        })}
        {props.waitingForSystem != WaitingStates.Idle ? (
          <Message
            text={props.waitingForSystem}
            role="system"
            type="message"
            showLoader={true}
          />
        ) : null}
      </div>
    </>
  );
}
