"use server";

export async function explain(prevState, formData) {
  const code = formData.get("code");
  const language = formData.get("language");
  console.log(`Generating explanation for ${language}`);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}codex`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  language, code }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Failed to fetch the results`,
      };
    }

    const data = await res.json();
     
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: `An Error Occured: ${err?.message}`,
    };
  }
}