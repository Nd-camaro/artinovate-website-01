/// <reference types="vite/client" />

interface VoiceflowConfig {
  verify: { projectID: string };
  url: string;
  versionID: string;
  voice?: {
    url: string;
  };
}

interface Window {
  voiceflow?: {
    chat: {
      load: (config: VoiceflowConfig) => void;
    };
  };
}
