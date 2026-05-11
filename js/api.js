let currentUserId = null;
function setUserId(userId) { currentUserId = userId; }
function getUserId() { return currentUserId; }

async function checkUser(userId) {
    currentUserId = userId; 
	const res = await fetch(CONFIG.GAS_URL + "?userId=" + userId);
	return await res.json();
}

async function confirmSubmit() {
    try {
        const selected = window.selectedMembers;

        if (!currentUserId) {
            alert("userIdが未設定");
            return;
        }

        // GASに送る場合👇 
        fetch(CONFIG.GAS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: currentUserId,
                members: selected
            })
        });

        const result = await res.json();
        if (result.status === "OK") {
            alert("送信成功");
        } else {
            alert("エラー");
        }
    } catch (err) {
        console.error(err);
        alert("送信失敗");
    }
    
}
