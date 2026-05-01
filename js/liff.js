// LIFF初期化
async function initLiff() {
    await liff.init({ liffId: CONFIG.LIFF_ID });
    // 🔵 PC（外部ブラウザ） → ゲストモード
    if (!liff.isInClient()) {
        console.log("ゲストモードで実行");
        return;
    }

    // 🔵 LINE内かどうかチェック（必要なら）
    if (!liff.isInClient()) {
        console.log("PCまたは外部ブラウザで実行中");
    }
}

//　ユーザID取得
async function getUserId() {
    // 🔵 PCはダミーID
    if (!liff.isInClient()) {
        return "GUEST_USER";
    }
    const profile = await liff.getProfile();
    return profile.userId;
}

/* 閉じる */
function closeLiff() {
    if (liff.isInClient()) {
        liff.closeWindow();   // ← LINEに戻る（これが本質）
    } else {
        window.location.href = "https://line.me"; // PC確認用
    }
}