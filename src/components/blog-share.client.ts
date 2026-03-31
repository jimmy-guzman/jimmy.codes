const preferNativeShare = () => {
  return (
    typeof navigator.share === "function" &&
    /android|ipad|iphone|ipod/iu.test(navigator.userAgent)
  );
};

export function initBlogShare(root: HTMLElement) {
  if (!preferNativeShare()) {
    return;
  }

  const btn = root.querySelector<HTMLButtonElement>("[data-share-open]");
  if (btn == null) {
    return;
  }

  const url = root.dataset.shareUrl ?? "";
  const title = root.dataset.shareTitle ?? "";
  const text = root.dataset.shareDescription ?? "";

  btn.removeAttribute("onclick");
  btn.addEventListener("click", () => {
    void navigator.share({ text: `"${text}"`, title, url });
  });
}
