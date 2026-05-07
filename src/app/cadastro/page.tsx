import { Suspense } from "react";
import CadastroView from "./CadastroView";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CadastroView />
        </Suspense>
    )
}