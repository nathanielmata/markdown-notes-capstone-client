const mdParser = (() => {
  let match;

  return {
    headingMatch: (str) => {
      match = str.match(/\n*#+\s+.+\n*/g);
      if (match) {
        const matchStr = match[0];
        const level = matchStr.match(/^#+/)[0].length;
        const trimStr = matchStr.replace(/^#+/, "").trim();
        str = `<h${level}>${trimStr}</h${level}>`;
      }
      return str;
    },
    codeBlockMatch: (str) => {
      match = str.match(/`{3}\n*.*\n*/g);
      if (match) {
        const matchStr = match[0];
        const trimStr = matchStr.replace(/`{3}\n*/g, "").trim();
        str = `<pre><code>${trimStr}</code></pre>`;
      }
      return str;
    }
  }
})();

export default mdParser;