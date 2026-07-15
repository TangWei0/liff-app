function main() {
    try {
        initLiff();
        const userId = getUserId();
        checkUser(userId);
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