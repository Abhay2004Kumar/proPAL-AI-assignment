exports.getSTT = (req, res) => {
    const stt = {
      providers: [
        {
          name: "OpenAI",
          id: "openai",
          models: [
            { name: "GPT-4", id: "gpt4", languages: ["English", "Spanish", "French"] },
            { name: "GPT-3.5", id: "gpt35", languages: ["English", "German"] }
          ]
        },
        {
          name: "Anthropic",
          id: "anthropic",
          models: [
            { name: "Claude 3", id: "claude3", languages: ["English", "Japanese"] }
          ]
        }
      ]
    };
    res.json(stt);
};