let currentUserId = null;
function setUserId(userId) {
    currentUserId = userId;
    sessionStorage.setItem("userId", userId);
}
function getcurrentUserId() {
    if (!currentUserId) {
        currentUserId = sessionStorage.getItem("userId");
    }
    return currentUserId;
}

// LIFF初期化
async function initLiff() {
    console.log("liff.js loaded");

    await liff.init({ liffId: "2009873872-wrcf23zq" /*CONFIG.LIFF_ID*/ });
    // 🔵 PC（外部ブラウザ） → ゲストモード
    if (!liff.isInClient()) {
        console.log("ゲストモードで実行");
        return;
    }

    // 🔵 LINE内かどうかチェック（必要なら）
    if (!liff.isLoggedIn()) {
        liff.login();
        console.log("PCまたは外部ブラウザで実行中");
    }
}

//　ユーザID取得
async function getUserId() {
    // 🔵 PCはダミーID
    if (!liff.isInClient()) {
        return "Ud6f3649ea2d5cdd47180a67a4b218f89";
        //return "GUEST_USER";
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