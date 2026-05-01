function showMemberModal(members) {
    // 男女分け
    const boys = members.filter(m => m.gender === "男").sort((a, b) => b.grade - a.grade);
    const girls = members.filter(m => m.gender === "女").sort((a, b) => b.grade - a.grade);

    let html = `
          <div class="modal">
            <div class="modal-content">
              <div class="title">
                初期登録<br>
                <span style="font-size:14px; font-weight:normal;">
                  該当するお子様（複数可）を選択してください
                </span>
              </div>

              <div class="section boys">
                <div class="section-title">男子</div>
                ${boys.map(m => createCard(m)).join("")}
              </div>

              <div class="section girls">
                <div class="section-title">女子</div>
                ${girls.map(m => createCard(m)).join("")}
              </div>

              <div class="btn-group">
                <button class="btn btn-submit" onclick="submitMembers()">決定</button>
                <button class="btn btn-cancel" onclick="closeLiff()">キャンセル</button>
              </div>
            </div>
          </div>
          `;

    document.getElementById("app").innerHTML = html;
}

function showConfirmModal(selected) {
    let list = selected.map(n => `<li>${n}</li>`).join("");

    let html = `
          <div class="modal">
            <div class="modal-content">
              <div class="title">確認</div>

              <div>以下の内容で登録しますか？</div>
              <ul>${list}</ul>

              <div class="btn-group">
                <button class="btn btn-submit" onclick="confirmSubmit()">OK</button>
                <button class="btn btn-cancel" onclick="backToSelect()">戻る</button>
              </div>
            </div>
          </div>
          `;

    document.getElementById("app").innerHTML = html;
}

function submitMembers() {
    const checked = document.querySelectorAll(".card input:checked");
    const selected = Array.from(checked).map(el => el.value);
    if (selected.length === 0) {
        alert("1人以上選択してください");
        return;
    }
    // 一時保存
    window.selectedMembers = selected;
    // 確認画面へ
    showConfirmModal(selected);
}

/* カード生成 */
function createCard(m) {
    return `
            <div class="card" onclick="toggle(this)">
              <span>${m.name}</span>
              <span>${m.grade}</span>
              <input type="checkbox" value="${m.name}" hidden>
            </div>
          `;
}

/* 選択トグル */
function toggle(el) {
    el.classList.toggle("selected");
    const checkbox = el.querySelector("input");
    checkbox.checked = !checkbox.checked;
}

function backToSelect() {
    if (!window.members) {
        alert("データがありません。URLを一度閉じてから、もう一度開いてください。");
        return;
    }
    showMemberModal(window.members);
}