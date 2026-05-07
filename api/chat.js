export default async function handler(req, res) {
    // ترويسات CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // رد OPTIONS (مهم جدًا)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const { message } = await req.json();

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
        return res.status(200).json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ error: "Proxy failed" });
    }
}

