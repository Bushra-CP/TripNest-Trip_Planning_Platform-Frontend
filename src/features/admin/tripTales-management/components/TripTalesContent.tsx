import DOMPurify from "dompurify";

interface TripTalesContentProps {
  content: string;
  className?: string;
}

const TripTalesContent = ({
  content,
  className = "",
}: TripTalesContentProps) => {
  const formattedContent = content.trim();

  if (!formattedContent) {
    return <div className={className}>No content available.</div>;
  }

  // Display ordinary text normally.
  const containsHtml = /<\/?[a-z][\s\S]*?>/i.test(formattedContent);

  if (!containsHtml) {
    return <div className={className}>{formattedContent}</div>;
  }

  // Sanitize HTML before rendering it.
  const sanitizedHtml = DOMPurify.sanitize(formattedContent, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={`triptales-html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default TripTalesContent;
