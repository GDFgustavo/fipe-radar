import { pdf } from "@react-pdf/renderer"
import React from "react"

export const useExportPdf = () => {
  const exportPdf = async (
    doc: React.ReactElement,
    fileName: string
  ) => {
    const blob = await pdf(doc as any).toBlob()

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }

  return { exportPdf }
}