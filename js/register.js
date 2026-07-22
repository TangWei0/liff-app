let count = 1;

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
            <label>${toCircle(count)} お子様</label>
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
                alert(
                    "入力されたお子さまのお名前が部員リストで確認できませんでした。\n\n" +
                    "考えられる原因：\n" +
                    "① お名前の入力（漢字・ひらがな・スペースなど）が部員登録と一致していない。\n" +
                    "② まだ部員リストへの登録が完了していない。\n\n" +
                    "お名前をご確認のうえ、解決しない場合は代表者までお問い合わせください。\n\n" +
                    "対象者：\n" + data.message
                );
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

function cancel() {
    alert();
    closeLiff();
}