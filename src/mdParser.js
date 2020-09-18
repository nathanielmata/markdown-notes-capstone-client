const mdParser = (() => {
  let match;

  return {
    parse: (content) => {
      const arr = content.split("\n");
      return arr.map((str, idx) => {
        let mdMatch = mdParser.headingMatch(str);
        mdMatch = mdParser.codeBlockMatch(mdMatch);
        mdMatch = mdParser.ulMatch(mdMatch, arr[idx - 1], arr[idx + 1]);
        mdMatch = mdParser.emMatch(mdMatch);
        return mdMatch;
      });
    },
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
      const regex = /^[\-\*]\s.+/g;
      const match = str.match(regex);
      if (match) {
        let out = String();
        out += !prev || !prev.match(regex) ? `<ul>` : "";
        out += `<li>${match[0].replace(/^[\-\*]\s/g, "")}</li>`;
        out += !next || !next.match(regex) ? `</ul>` : "";
        str = out;
      }
      return str;
    },
    emMatch: (str) => {
      let regex = /[\_\*][^\_\*]+[\_\*]\n*/g;

      match = str.match(regex);
      if (match) {
        let out = String();
        const arr = str.split(regex);

        match.forEach((m, idx) => {
          out += arr[idx] + `<em>${m.replace(/[\_\*]/g, "")}</em>`;
          out += idx === match.length - 1 ? arr[idx + 1] : "";
        });

        str = out;
        console.log(str);
      }

      regex = /[\_{2}\*{2}][^.]+[\_{2}\*{2}]\n*/g;
      match = str.match(regex);
      console.log(match);
      if (match) {
        let out = String();
        const arr = str.split(regex);

        match.forEach((m, idx) => {
          out += arr[idx] + `<strong>${m.replace(/[\_{2}\*{2}]/g, "")}</strong>`;
          out += idx === match.length - 1 ? arr[idx + 1] : "";
        });

        str = out;
        console.log(str);
      }

      return str;
    },
  };
})();

export default mdParser;
