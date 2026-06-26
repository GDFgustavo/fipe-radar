import { toBlob } from "html-to-image"

export const useExportImage = () => {
    const exportImage = async (
        element: HTMLElement,
        fileName: string
    ) => {
        const blob = await toBlob(element, {
            pixelRatio: 2,
            backgroundColor: "#fff",
            width: 800, 
        })

        if (!blob) return;

        const dataUrl = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.download = fileName
        link.href = dataUrl
        link.click()

        URL.revokeObjectURL(dataUrl)
    }

    return { exportImage }
}