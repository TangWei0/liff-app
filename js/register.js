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

function register() {
    const names = [];
    document.querySelectorAll(".memberName").forEach(e =>
    {
        const name = e.value.trim();
        if (name != "" && !names.includes(name)) {
            names.push(name);
        }
    });

    console.log(names);
    // 次にGASへ送信
}

function cancel() {
    closeLiff();
}