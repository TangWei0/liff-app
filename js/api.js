async function checkUser(userId) {
	const res = await fetch(CONFIG.GAS_URL + "?userId=" + userId);
	return await res.json();
}

async function confirmSubmit() {
    const selected = window.selectedMembers;

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
