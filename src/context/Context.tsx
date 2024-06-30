import { ReactNode, createContext, useState } from "react";
import run from "../config/gemini";

type ContextType = {
  previousPrompt: string[];
  setPreviousPrompt: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt: string, fromMain?: boolean) => Promise<void>;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  recentPrompt: string;
  showResult: boolean;
  loading: boolean;
  resultData: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  newChat: () => void;
};

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([""]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt: string, fromMain: boolean = false) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response = "";
    if (prompt) {
      if(fromMain){
        setPreviousPrompt((prev) => [...prev, prompt]);
      }
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    response = response.split("#").join("");

    let responseArray = response.split("**");
    let newResponse: string = "";
    responseArray.forEach((word, index) => {
      if (index === 0 || index % 2 !== 1) {
        newResponse += word;
      } else {
        newResponse += `<b>${word}</b>`;
      }
    });

    let newResponse2 = newResponse.split("*").join("<br/>");

    let newResponseArray = newResponse2.split(" ");

    for (let index = 0; index < newResponseArray.length; index++) {
      const element = newResponseArray[index];
      delayPara(index, element + " ");
    }

    setResultData(newResponse2);
    setLoading(false);
    setInput("");
  };

  const contextValue: ContextType = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
