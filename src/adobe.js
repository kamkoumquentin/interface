import React, { useEffect } from 'react';

const AdobePdfView = ({ url, fileName }) => {
  useEffect(() => {
    const viewPdf = () => {
      if (window.AdobeDC && url) {
        // On s'assure que l'URL est complète (absolue)
        const fullUrl = url.startsWith('http') ? url : window.location.origin + url;

        const adobeDCView = new window.AdobeDC.View({
          clientId: "a4489128a426445d8fcc5d5e774c2cac",
          divId: "adobe-pdf-view",
        });
        
        adobeDCView.previewFile({
    content: { location: { url: fullUrl } },
    metaData: { fileName: fileName || "document.pdf" }
}, { 
    /* Change FULL_WINDOW par SIZED_CONTAINER */
    embedMode: "SIZED_CONTAINER", 
    showDownloadPDFControl: false, 
    showPrintPDFControl: false,
    showAnnotationTools: false,
    showLeftHandPanel: false,
    showPageControls: true, // Garde les flèches de navigation
    showDownloadPDF: false,  // Note le nom sans "Control" à la fin (parfois requis selon la version)
});
      }
    };

    if (window.AdobeDC) {
      viewPdf();
    } else {
      document.addEventListener("adobe_dc_view_sdk.ready", viewPdf);
    }

    // Nettoyage de l'écouteur si le composant est démonté
    return () => {
      document.removeEventListener("adobe_dc_view_sdk.ready", viewPdf);
    };
  }, [url, fileName]);

  return (
    <div id="adobe-pdf-view" style={{ height: "100vh", width: "100%" }} />
  );
};

export default AdobePdfView;