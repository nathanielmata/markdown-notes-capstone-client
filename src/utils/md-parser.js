const MdParser = (() => {
  let match;

  function headingMatch(str) {
    match = str.match(/\n*#+\s+.+\n*/g);
    if (match) {
      const matchStr = match[0];
      const level = matchStr.match(/^#+/)[0].length;
      const trimStr = matchStr.replace(/^#+/, "").trim();
      str = `<h${level}>${trimStr}</h${level}>`;
    }
    return str;
  }

  function codeBlockMatch(str) {
    match = str.match(/`{3}\n*.*\n*/g);
    if (match) {
      const matchStr = match[0];
      const trimStr = matchStr.replace(/`{3}\n*/g, "").trim();
      str = `<pre><code>${trimStr}</code></pre>`;
    }
    return str;
  }

  function ulMatch(str, prev, next) {
    const regex = /^[-*]\s.+/g;
    match = str.match(regex);
    if (match) {
      let out = String();
      out += !prev || !prev.match(regex) ? `<ul>` : "";
      out += `<li>${match[0].replace(/^[-*]\s/g, "")}</li>`;
      out += !next || !next.match(regex) ? `</ul>` : "";
      str = out;
    }
    return str;
  }
  
  function emMatch(str) {
    let regex = /(__|\*\*)[^.]+(__|\*\*)\n*/g;
    match = str.match(regex);
    if (match) {
      let out = String();
      const arr = str.split(regex);

      match.forEach((m, idx) => {
        out += `<strong>${m.replace(/(_{2}|\*{2})([^_*]+)\1/g, "$2")}</strong>`;
        out += idx === match.length - 1 ? arr[arr.length - 1] : "";
      });

      str = out;
    }

    regex = /[_*][^_*]+[_*]\n*/g;
    match = str.match(regex);
    if (match) {
      let out = String();
      const arr = str.split(regex);

      match.forEach((m, idx) => {
        out += arr[idx] + `<em>${m.replace(/[_*]/g, "")}</em>`;
        out += idx === match.length - 1 ? arr[idx + 1] : "";
      });

      str = out;
    }

    return str;
  }

  function imageMatch(str) {
    const imagePatterns = Object.values({
      alt: /!\[([^\t\n\f/>"'=]+)\]/,
      path: /\((.*)\)/,
    })

    // The .source property returns a String containing the source text of the regexp object,
    // and it doesn't contain the two forward slashes on both sides and any flags
    let regex = new RegExp(imagePatterns.map(r => r.source).join(""), "g");

    match = regex.exec(str);
    if (match) {
      str = str.replace(regex, `<img src="${match[2]}" alt="${match[1]}" />`);
    }
    return str;
  }

  function linkMatch(str) {
    const urlPatterns = Object.values({
      protocol: /(?<!src=")https?:\/\//,
      subdomain: /([^._-]([a-zA-Z0-9]|(-?(?!-))){1,63})?/,
      sep: /\b[.:]?/,
      domain: /([^._-]([a-zA-Z0-9]|(-?(?!-))){1,63})?/,
      tld: /\b[.:]([a-zA-Z]){1,63}\b/,
      path: /\/?[A-Za-z0-9\-._~!$&'*+,;=:@/]*/,
    })

    // The .source property returns a String containing the source text of the regexp object,
    // and it doesn't contain the two forward slashes on both sides and any flags
    let regex = new RegExp(urlPatterns.map(r => r.source).join(""), "g");
    
    match = str.match(regex);
    if (match) {
      str = str.replace(regex, `<a href="${match}">${match}</a>`);
    }
    return str;
  }

  function titleLinkMatch(str) {
    const linkPatterns = Object.values({
      title: /\[([^\t\n\f/>"'=]+)\]/,
      url: /\(<a\shref="(https?:\/\/.*)">.*<\/a>\)/,
    })

    // The .source property returns a String containing the source text of the regexp object,
    // and it doesn't contain the two forward slashes on both sides and any flags
    let regex = new RegExp(linkPatterns.map(r => r.source).join(""), "g");

    match = regex.exec(str);
    if (match) {
      str = str.replace(regex, `<a href="${match[2]}">${match[1]}</a>`);
    }
    return str;
  }

  function pMatch(str, prev, next) {
    let regex = /(?<!(<.*>))(.*)(?!<\/.*>)/g;

    match = regex.exec(str);
    if (match) {
      let out = String();
      if (prev === "" && !next) {
        out += `<p>`;
        out += `${match[0]}`;
        out += `</p>`;
        str = out;
      }
    }

    return str;
  }

  function escSpecial(str) {
    const c = { "<": "&lt;", ">": "&gt;", "&": "&amp;" };
    str = str.replace(/[<&>]/g, (s) => c[s]);
    return str;
  }

  return {
    parse: (content) => {
      const arr = content.split("\n");
      return arr.map((str, idx) => {
        let mdMatch = escSpecial(str);
        mdMatch = headingMatch(mdMatch);
        mdMatch = codeBlockMatch(mdMatch);
        mdMatch = ulMatch(mdMatch, arr[idx - 1], arr[idx + 1]);
        mdMatch = emMatch(mdMatch);
        mdMatch = imageMatch(mdMatch);
        mdMatch = linkMatch(mdMatch);
        mdMatch = titleLinkMatch(mdMatch);
        mdMatch = pMatch(mdMatch, arr[idx - 1], arr[idx + 1]);
        return mdMatch;
      });
    },
  };
})();

export default MdParser;
