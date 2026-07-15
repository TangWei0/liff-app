// GASに送信API
async function Do(Json) {
    // GASに送る場合
    const res = await fetch(CONFIG.GAS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(Json)
    });

    const data = await res.json();
    if (data.status === "ERROR") {
        throw new Error(data.message || "GAS Error");
    }
}