async function main() {
    try {
        await initLiff();
        const userId = await getUserId();
        const data = await checkUser(userId);

        handleResponse(data);
    } catch (e) {
        showError(e);
    }
}

//　ユーザIDチェック　レスポンス処理
function handleResponse(data) {
    if (data.status === "EXISTS") {
        log("既に登録済み");
        return;
    }

    if (data.status === "ERROR") {
        log("エラー：" + data.message);
        return;
    }

    if (data.status === "NEW") {
        log("新規ユーザー");

        const members = data.members || [];
        window.members = members;
        showMemberModal(members);
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