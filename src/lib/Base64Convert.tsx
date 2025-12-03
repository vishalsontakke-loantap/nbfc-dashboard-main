export const fileToBase64 = async (file: any): Promise<string | null> => {
  return new Promise((resolve) => {
    // 1️⃣ If no file
    if (!file) return resolve(null);

    // 2️⃣ If already a Base64 string
    if (typeof file === "string" && file.startsWith("data:")) {
      return resolve(file);
    }

    // 3️⃣ If API returned filename/path (not upload!)
    if (typeof file === "string") {
      // You CANNOT convert server file path to base64 in frontend.
      // Only user-uploaded files can be read.
      return resolve(null);
    }

    // 4️⃣ Must be actual File object
    if (!(file instanceof File)) {
      return resolve(null);
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};
