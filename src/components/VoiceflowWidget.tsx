import { useEffect } from 'react';

export const VoiceflowWidget = () => {
  useEffect(() => {
    // Check if script already exists to prevent duplicates
    if (document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.type = 'text/javascript';

    script.onload = () => {
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '66b7fd279aa5c5d732078d05' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: 'https://runtime-api.voiceflow.com'
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  return null;
};
