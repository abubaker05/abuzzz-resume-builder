// resumeUtils.js
// Client-side export helper — loads html2canvas + jspdf at runtime from CDNs
export async function ensureLibs() {
  if (typeof window === "undefined") throw new Error("Client only");

  // load html2canvas if missing
  if (!window.html2canvas) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  // load jspdf if missing (umd build exposes window.jspdf or window.jspdf.jsPDF)
  if (!window.jspdf) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  // unify reference
  if (!window.jspdf && window.jspdf === undefined && window.jspdf) {
    // nothing
  }
  return { html2canvas: window.html2canvas, jspdf: window.jspdf || window.jspdf };
}

/**
 * exportResumeAsPDF(previewElement, options)
 * - previewElement: DOM node that contains the preview. We'll clone and render to canvas.
 * - options: { fileName, layout }
 */
export async function exportResumeAsPDF(previewElement, options = {}) {
  if (!previewElement) throw new Error("Preview element not found");
  const { fileName = "resume.pdf", layout = "single" } = options;

  const { html2canvas, jspdf } = await ensureLibs();
  // jspdf may be under window.jspdf.jsPDF in the UMD build
  const { jsPDF } = window.jspdf || jspdf || {};

  // We will create a printable clone with white background (A4)
  const clone = previewElement.cloneNode(true);

  // ensure white background for exported PDF
  clone.style.background = "#ffffff";
  clone.style.color = "#000000";
  clone.style.padding = "24px";
  clone.style.width = "794px"; // approx A4 @ 96dpi width
  clone.style.boxSizing = "border-box";

  // place clone offscreen
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-10000px";
  wrapper.style.top = "0";
  wrapper.style.zIndex = "-1";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // turn the clone into canvas
  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  // A4 size in px at 96dpi: 794 x 1123 approx, but we'll use aspect ratio with jsPDF
  const pdf = new jsPDF({
    unit: "px",
    format: "a4",
    orientation: "portrait",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // scale canvas to fit width
  const imgData = canvas.toDataURL("image/png");
  const imgProps = { width: canvas.width, height: canvas.height };
  const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
  const imgWidth = imgProps.width * ratio;
  const imgHeight = imgProps.height * ratio;

  pdf.addImage(imgData, "PNG", (pageWidth - imgWidth) / 2, 20, imgWidth, imgHeight);
  pdf.save(fileName);

  // cleanup
  document.body.removeChild(wrapper);
}
