let count = 1;

document.getElementById("btnAdd").addEventListener("click", addMember);

function addMember() {
    count++;
    const area = document.getElementById("memberArea");
    area.insertAdjacentHTML(
        "beforeend",
        `
        <div class="member-row">
            <label>${toCircle(count)} ‚¨q—l</label>
            <input class="memberName"
                   type="text"
                   maxlength="20"
                   placeholder="—áFã“c’q”">
        </div>
        `
    );
}

function toCircle(no) {
    const list = [ "‡@", "‡A", "‡B", "‡C", "‡D", "‡E", "‡F", "‡G", "‡H", "‡I" ];
    return list[no - 1] || no;
}

document.getElementById("btnRegister").addEventListener("click", register);

function register() {
    const names = [];
    document.querySelectorAll(".memberName").forEach(e =>
    {
        const name = e.value.trim();
        if (name != "") {
            names.push(name);
        }
    });

    console.log(names);

    // Ÿ‚ÉGAS‚Ö‘—M
}