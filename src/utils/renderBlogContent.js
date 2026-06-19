// Returns an HTML string for a blog post body.
//
// New posts are authored in the rich-text editor and stored as HTML, so they
// are returned untouched. Older posts were saved as plain text — those are
// escaped and converted so blank lines become paragraphs and single newlines
// become <br>, preserving their original layout.

const hasHtmlTags = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderBlogContent = (content) => {
  if (!content || typeof content !== "string") return "";
  if (hasHtmlTags(content)) return content;

  return escapeHtml(content)
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => `<p>${block.trim().replace(/\n/g, "<br>")}</p>`)
    .join("");
};

export default renderBlogContent;
