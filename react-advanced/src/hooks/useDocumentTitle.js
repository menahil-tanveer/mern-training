import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    //   sets the title of browser tab
    document.title = title;
    return () => {
      console.log("Clean up");
    };
  });
}
