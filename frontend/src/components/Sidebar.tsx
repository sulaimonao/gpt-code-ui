import AssistantIcon from '@mui/icons-material/Assistant';
import "./Sidebar.css";
import { useState } from 'react'; // Import useState

export default function Sidebar(props: {
  models: Array<{ name: string; displayName: string }>;
  selectedModel: string;
  onSelectModel: (model: string) => void; // Use function type for onSelectModel
  setOpenAIKey: (key: string) => void;     // Use function type for setOpenAIKey
  openAIKey: string;
}) {
  const [selectedAPI, setSelectedAPI] = useState<string>("OpenAI"); // Add state for API selection
  
  const handleOpenAIButtonClick = () => {
    const key = prompt("Please enter your OpenAI key", props.openAIKey);
    if (key != null) {
      props.setOpenAIKey(key);
    }
  };

  const handleGeminiButtonClick = () => {
    // You might want to add logic here to handle setting the Gemini API key
    // if it's different from the OpenAI key. 
    // For now, we'll just assume it's the same.
    // props.setGeminiKey(...);
  };

  return (
    <>
      <div className="sidebar">
        {/* ... (Existing logo and github section remain the same) ... */}
        <div className="settings">
          <label className="header">Settings</label>
          
          <label>API Provider</label>
          <select 
            value={selectedAPI} 
            onChange={(event) => setSelectedAPI(event.target.value)}>
            <option value="OpenAI">OpenAI</option>
            <option value="Gemini">Gemini</option>
          </select>

          <label>Model</label>
          <select
            value={props.selectedModel}
            onChange={(event) => props.onSelectModel(event.target.value)}
          >
            {props.models.map((model, index) => (
              <option key={index} value={model.name}>
                {model.displayName}
              </option>
            ))}
          </select>
          <label>Credentials</label>
          {selectedAPI === "OpenAI" ? (
            <button onClick={handleOpenAIButtonClick}>Set OpenAI key</button>
          ) : (
            <button onClick={handleGeminiButtonClick}>Set Gemini key</button>
          )}
        </div>
      </div>
    </>
  );
}
