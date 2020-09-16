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
    },
    ulMatch: (str, prev, next) => {
      const regex = /^\*\s.+/g;
      const match = str.match(regex);
      if (match) {
        let out = String();
        out += !prev || !prev.match(regex) ? `<ul>` : "";
        out += `<li>${match[0].replace(/^\*\s/g, "")}</li>`;
        out += !next || !next.match(regex) ? `</ul>` : "";
        str = out;
      }
      return str;
    }
  };
})();

export default mdParser;
