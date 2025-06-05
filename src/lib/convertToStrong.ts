export const convertToStrong = (text: string) => {
  if (!text.includes("**")) {
    return text;
  }

  const convertedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return convertedText;
};
