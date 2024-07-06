const baseUrl = `${import.meta.env.VITE_AI_URI}/receipt`;

// Function to post the prompt to the chatGPT api
export async function getTransactionFromGPT(prompt) {
  if (prompt === undefined || null) return null;

  const formData = new FormData();
  formData.append('transcription', prompt);

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
    });
    const newCategory = await response.json();
    console.log('Category created:', newCategory);
    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
  }
}
