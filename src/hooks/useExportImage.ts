import { toPng } from "html-to-image"

export const useExportImage = () => {
    const exportImage = async (
        element: HTMLElement,
        fileName: string
    ) => {
        const dataUrl = await toPng(element, {
            pixelRatio: 2,
            backgroundColor: "#fff"
        })

        const link = document.createElement("a")
        link.download = fileName
        link.href = dataUrl
        link.click()
    }

    return { exportImage }
}