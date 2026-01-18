const chatbox = document.getElementById("chatbox");
const input = document.getElementById("msg");
const btn = document.getElementById("sendBtn");

function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = cls;
  div.innerText = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

btn.onclick = () => {
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";

  fetch("https://ai-healthcare-backend-omtx.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: msg,
      user_id: "user1"
    })
  })
    .then(res => res.json())
    .then(data => {
      addMessage(data.reply, "bot");
    })
    .catch(() => {
      addMessage("Server error. Try again.", "bot");
    });
};
