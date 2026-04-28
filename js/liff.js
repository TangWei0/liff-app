// LIFF初期化
async function initLiff() {
    await liff.init({ liffId: CONFIG.LIFF_ID });
    if (!liff.isInClient()) { throw new Error("LINEから開いてください"); }
    if (!liff.isLoggedIn()) {
        liff.login();
        throw new Error("ログインリダイレクト");
    }
}

//　ユーザID取得
async function getUserId() {
    const profile = await liff.getProfile();
    const userId = profile.userId;
    if (!userId) { throw new Error("UserID取得失敗"); }
    return userId;
}

/* 閉じる */
function closeLiff() {
    if (liff.isInClient()) {
        liff.closeWindow();   // ← LINEに戻る（これが本質）
    } else {
        window.location.href = "https://line.me"; // PC確認用
    }
}