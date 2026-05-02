let currentUserId = null;
export function setUserId(userId) { currentUserId = userId; }
export function getUserId() { return currentUserId; }

async function checkUser(userId) {
    currentUserId = userId; 
	const res = await fetch(CONFIG.GAS_URL + "?userId=" + userId);
	return await res.json();
}

async function confirmSubmit() {
    const selected = window.selectedMembers;

    if (!currentUserId) {
        alert("userIdが未設定");
        return;
    }

    // GASに送る場合👇
    /*
    fetch(CONFIG.GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "ここにuserId",
        members: selected
      })
    });
    */
}
