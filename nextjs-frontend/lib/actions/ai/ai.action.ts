'use server'

export async function getAnswerFromAgent(id: string, question: string) {
  try {
    const response = await fetch(
      `https://sentiment-llm-fastapi.vercel.app/agent/?id=${id}&question=${encodeURIComponent(question)}`,
      {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error('Error getting answer from agent:', error);
    throw error;
  }
}
