// Apply <mark> tags around a given pattern in a string
export default function MarkedText({ text, pattern }) {
   return pattern == '' ? text :
      text.split(new RegExp(`(${pattern})`, 'gi'))
          .map((s, i) => i % 2 ? <mark key={i}>{s}</mark> : s);
}
