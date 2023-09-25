const shortenName = (name: string): string => {
  const words = name.split(" ");

  if (words.length > 1) {
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  }

  return name.slice(0, 2);
};

export default shortenName;
