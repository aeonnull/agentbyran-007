(function () {
  const el = document.currentScript;
  const company  = el.getAttribute("data-company")  || "Agentbyrån";
  const agent    = el.getAttribute("data-agent")    || "007";
  const endpoint = el.getAttribute("data-endpoint");

  // === Container: låst i nedre högra hörnet ===
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.top = "auto";
  container.style.left = "auto";
  container.style.width = "320px";
  container.style.maxWidth = "92vw";
  container.style.height = "420px";
  container.style.maxHeight = "70vh";
  container.style.backgroundColor = "#333333"; // mörk bakgrund
  container.style.border = "1px solid #555555";
  container.style.borderRadius = "6px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.fontFamily = "'Open Sans', sans-serif";
  container.style.color = "#FDF9ED";
  container.style.lineHeight = "1.5";
  container.style.overflow = "hidden";
  container.style.zIndex = "99999";
  container.style.boxShadow = "none";

  // === Subtil watermark (ljusare grå) ===
  const watermark = document.createElement("div");
  watermark.textContent = company;
  watermark.style.position = "absolute";
  watermark.style.top = "6px";
  watermark.style.right = "10px";
  watermark.style.fontFamily = "'Archivo Black', sans-serif";
  watermark.style.fontSize = "12px";
  watermark.style.color = "#888888"; // ljusare än #444, syns bättre
  container.appendChild(watermark);

  // === Meddelandeyta ===
  const messages = document.createElement("div");
  messages.style.flex = "1";
  messages.style.padding = "10px 12px";
  messages.style.overflowY = "auto";
  messages.style.wordBreak = "break-word";
  messages.style.textAlign = "left"; // förhindra centrering
  container.appendChild(messages);

  // === Inmatningsrad ===
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
  input.style.fontFamily = "'Open Sans', sans-serif";

  const button = document.createElement("button");
  button.textContent = "Skicka";
  button.style.backgroundColor = "#555555";
  button.style.color = "#FDF9ED";
  button.style.border = "none";
  button.style.padding = "10px 14px";
  button.style.cursor = "pointer";

  inputRow.appendChild(input);
  inputRow.appendChild(button);
  container.appendChild(inputRow);
  document.body.appendChild(container);

  // === Lägg till meddelande (bot = ren text, användare = bubbla) ===
  function addMessage(text, isUser = false) {
    // radcontainer för stabil vänster/höger utan text-align-buggar
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = isUser ? "flex-end" : "flex-start";
    row.style.margin = "6px 0";

    const bubble = document.createElement("span");
    bubble.style.maxWidth = "80%";
    bubble.style.whiteSpace = "pre-wrap";
    bubble.style.wordBreak = "break-word";
    bubble.style.fontSize = "14px";

    if (isUser) {
      // användarens solida bubbla, lite ljusare än bakgrunden
      bubble.style.backgroundColor = "#555555";
      bubble.style.color = "#FDF9ED";
      bubble.style.padding = "6px 10px";
      bubble.style.borderRadius = "6px";
      bubble.style.display = "inline-block";
    } else {
      // bot = ren text på mörk bakgrund
      bubble.style.color = "#FDF9ED";
      // ingen bakgrund, inga ramar
   
