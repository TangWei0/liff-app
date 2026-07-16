async function main() {
    console.log("main.js loaded");
    try {
        await initLiff();
        const userId = await getUserId();
        await checkUser(userId);
    } catch (e) {
        showError(e);
    }
}

//　異常系処理
function showError(e) {
    console.error(e);
    document.body.innerHTML = "エラー<br>" + e.message;
}

// テスト用　画面表示
function log(msg) {
    document.body.innerHTML += "<br>" + msg;
}

main();