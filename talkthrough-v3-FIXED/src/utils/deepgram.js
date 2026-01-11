// Deepgram WebSocket for streaming STT
export class DeepgramSTT {
  constructor(apiKey, onTranscript, onError) {
    this.apiKey = apiKey;
    this.onTranscript = onTranscript;
    this.onError = onError;
    this.socket = null;
    this.mediaRecorder = null;
  }

  async connect() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const wsUrl = `wss://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&interim_results=true`;
      this.socket = new WebSocket(wsUrl, ['token', this.apiKey]);

      this.socket.onopen = () => {
        console.log('Deepgram connected');
        
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(event.data);
          }
        };

        this.mediaRecorder.start(250);
      };

      this.socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const transcript = data.channel?.alternatives[0]?.transcript;
        
        if (transcript && transcript.trim() !== '') {
          const isFinal = data.is_final;
          this.onTranscript(transcript, isFinal);
        }
      };

      this.socket.onerror = (error) => {
        console.error('Deepgram error:', error);
        this.onError(error);
      };

      this.socket.onclose = () => {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
        }
        stream.getTracks().forEach(track => track.stop());
      };

    } catch (error) {
      console.error('Microphone error:', error);
      this.onError(error);
    }
  }

  disconnect() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.socket) {
      this.socket.close();
    }
  }
}

// Deepgram TTS
export async function deepgramTTS(text, apiKey) {
  try {
    const response = await fetch('https://api.deepgram.com/v1/speak?model=aura-asteria-en', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error('TTS failed');

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    await audio.play();
    
    return audio;
  } catch (error) {
    console.error('TTS error:', error);
    throw error;
  }
}
