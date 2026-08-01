let count = 1;
let alertCallback = null;

// この画面　イベント
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAdd").addEventListener("click", addMember);
    document.getElementById("btnRegister").addEventListener("click", register);
    document.getElementById("btnCancel").addEventListener("click", cancel);
});

function addMember() {
    count++;
    const area = document.getElementById("memberArea");
    area.insertAdjacentHTML(
        "beforeend",
        `
        <div class="member-row">
            <label>${toCircle(count)} 登録するお子様</label>
            <input class="memberName"
                   type="text"
                   maxlength="20"
                   placeholder="例：上田智博">
        </div>
        `
    );
}

function toCircle(no) {
    const list = [ "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩" ];
    return list[no - 1] || no;
}

async function register() {
    try
    {
        const names = [];
        document.querySelectorAll(".memberName").forEach(e =>
        {
            const name = e.value.trim();
            if (name != "" && !names.includes(name)) {
                names.push(name);
            }
        });

        console.log(names);

        const userId = getcurrentUserId();
        console.log(userId);

        const data = await Do({ action: "registerUser", userId: userId, names: names });

        switch (data.status) {
            case "OK":
                // TODO メイン画面戻る
                break;
            case "NOT_FOUND":
                const message = 
                    "次のお子様は部員リストで確認できませんでした。\n\n" +
                    "【確認できなかったお子様】\n" +
                    data.notFoundList.join("\n") +
                    "\n\n・お名前をご確認ください\n" +
                    "・時間をおいてもう一度お試しください\n\n" +
                    "再度同じエラーが発生する場合は、\n" +
                    "代表者へご連絡ください。";

                if (names.length > data.notFoundList.length) {
                    // 一部だけ見つからなかった
                    showAlert("部員確認", message);
                    // TODO メイン画面へ戻る
                } else {
                    // 全員見つからなかった
                    showAlert("部員確認", message, cancel);
                }
                break;
            default:
                alert(data.message);
                break;
        }
    }
    catch (e)
    {
        alert(e.message);
    }
}

function showAlert(title, message) {
    document.getElementById("alertTitle").textContent = title;
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("alertModal").style.display = "flex";

    alertCallback = callback;
}

function closeAlert() {

    document.getElementById("alertModal").style.display = "none";

    if (alertCallback) {
        const cb = alertCallback;
        alertCallback = null;
        cb();
    }
}

function cancel() {
    closeLiff();
}