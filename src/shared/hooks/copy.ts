import { useCallback } from "react";
import clipboardCopy from "clipboard-copy";

export function useCopyHtmlText() {
  return useCallback(async (htmlString: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlString;

    const plainText = temp.innerText;
    try {
      await clipboardCopy(plainText);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, []);
}