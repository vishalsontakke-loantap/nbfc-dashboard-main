const fileToBase64 = (file: File | undefined): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!file) return resolve(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);
  });
};
export { fileToBase64 };