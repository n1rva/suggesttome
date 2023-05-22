async function gpt({ systemPrompt, userPrompt }) {
  const systemMessage = {
    role: "system",
    content: systemPrompt,
  };

  // const userMessage = {
  //   userPrompt,
  //   direction: "outgoing",
  //   sender: "user",
  // };

  const userMessage = {
    role: "user",
    content: userPrompt,
  };

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, userMessage],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.GPT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        return data.choices[0].message.content;
      });
    return response;
  } catch (error) {
    return error;
  }
}

export default gpt;
