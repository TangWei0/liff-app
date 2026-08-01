let currentUserId = null;
function setUserId(userId) {
    currentUserId = userId;
    sessionStorage.setItem("userId", userId);
}

async function getcurrentUserId() {
    // メモリ上に存在
    if (currentUserId) {
        return currentUserId;
    }

    // sessionStorage確認
    currentUserId = sessionStorage.getItem("userId");

    // 初回のみLIFFから取得
    if (!currentUserId) {
        await initLiff();
        currentUserId = await getUserId();
        sessionStorage.setItem("userId", currentUserId);
    }

    return currentUserId;
}

async function checkUser(userId) {
    try
    {
        const data = await Do({ action: "checkUser", userId: userId });

        if (data.status === "EXISTS") {
            log("既に登録済み");
            return;
        }

        if (data.status === "NEW") {
            log("新規ユーザー");

            // UserIDを保存
            setUserId(userId);

            // 登録画面へ
            location.href = "html/register.html";
        }
    }
    catch (e)
    {
        log("エラー：" + e.message);
    }
}