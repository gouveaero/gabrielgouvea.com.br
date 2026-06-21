// Text-scramble / decode effect (ported from the original gabrielgouvea.com.br).
// Walks the element's text nodes and resolves them left-to-right, so an element
// with inline children (e.g. a .lime <span>) keeps its structure and styling.

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·";
const KEEP = new Set([" ", "·", ".", ",", "&"]);

export function scrambleElement(el: Element, duration = 900): () => void {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; text: string }[] = [];
  let total = 0;
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    const text = n.nodeValue || "";
    nodes.push({ node: n, text });
    total += text.length;
  }
  if (!total) return () => {};

  const steps = Math.max(1, Math.floor(duration / 35));
  let step = 0;
  const restore = () => nodes.forEach(({ node, text }) => (node.nodeValue = text));

  const id = window.setInterval(() => {
    const revealCount = (step / steps) * total;
    let idx = 0;
    for (const { node, text } of nodes) {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (KEEP.has(ch)) out += ch;
        else if (idx < revealCount) out += ch;
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        idx++;
      }
      node.nodeValue = out;
    }
    step++;
    if (step > steps) {
      window.clearInterval(id);
      restore();
    }
  }, 35);

  return () => {
    window.clearInterval(id);
    restore();
  };
}
