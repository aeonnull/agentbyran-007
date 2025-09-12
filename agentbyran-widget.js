(function() {
  const scriptTag = document.currentScript;
  const company = scriptTag.getAttribute("data-company") || "Agentbyrån";
  const agent = scriptTag.getAttribute("data-agent") || "007";
  const endpoint = scriptTag.getAttribute("data-endpoint");

  // Skapa widget-container
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.width = "300px";
  container.style.height = "400px";
  container.style.border = "1px solid #555555";
  container.style.borderRadius = "6px";
  container.style.backgroundColor = "#333333"; // mörk bakgrund
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.overflow = "hidden";
  container.style.fontFamily = "'Open Sans', sans-serif";
  container.style.color = "#FDF9ED"; // ljus text
  container.style.zIndex = "9999";

  // Watermark
  const watermark = document.createElement("div");
  watermark.textContent = company;
  watermark.style.position = "absolute";
  watermark.style.top = "5px";
  watermark.style.right = "10px";
  watermark.style.fontSize = "12px";
  watermark.style.color = "#444444"; // subtil watermark
  container.appendChild(watermark);

  // Meddelandefönster
  const messages = document.createElement("div");
  messages.style.flex = "1";
  messages.style.padding = "10px";
  messages.style.overflowY = "auto";
  messages.style.fontSize = "14px";
  container.appendChild(messages);

  // Input-rad
  const inputRow = document.createElement("div");
  inputRow.style.display = "flex";
  inputRow.style.borderTop = "1px solid #555555";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Skriv ett meddelande...";
  input.style.flex = "1";
  input.style.padding = "10px";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.backgroundColor = "#333333";
  input.style.color = "#FDF9ED";

  const button = document.createElement("button");
  button.textContent = "Skicka";
  button.style.backgroundColor = "#555555";
  button.style.color = "#FDF9ED";
  button.style.border = "none";
  button.style.padding = "10px";
  button.style.cursor = "pointer";

  inputRow.appendChild(input);
  inputRow.appendChild(button);
  container.appendChild(inputRow);

  document.body.appendChild(container);

  // Funktion för att lägga till meddelanden
  function addMessage(sender, text, isUser = false) {
    const msg = document.createElement("div");
    msg.style.margin = "6px 0";
    msg.style.textAlign = isUser ? "right" : "left";
    msg.style.whiteSpace = "pre-wrap";

    if (isUser) {
      msg.style.backgroundColor = "#555555"; // användarbubbla
      msg.style.color = "#FDF9ED";
      msg.style.display = "inline-block";
      msg.style.padding = "6px 10px";
      msg.style.borderRadius = "6px";
    }

    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // Skicka meddelanden till backend
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage("Du", text, true);
    input.value = "";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) throw new Error("Serverfel");
      const data = await res.json();
      addMessage(agent, data.reply || "(Inget svar)");
    } catch (err) {
      addMessage("System", "Kunde inte kontakta servern.");
    }
  }

  button.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

})();
