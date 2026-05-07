export default async function handler(req, res) {
    try {
        const { message } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemma-2-9b-it",
                messages: [
                    { role: "system", content: "كن صديقًا ودودًا يتحدث باللهجة العربية." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: "Proxy failed" });
    }
}
