export default function JsonLd({ data }) {
  const payloads = (Array.isArray(data) ? data : [data]).filter(Boolean);

  if (payloads.length === 0) {
    return null;
  }

  return (
    <>
      {payloads.map((payload, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  );
}
