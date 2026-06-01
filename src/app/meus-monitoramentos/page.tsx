import { Suspense } from "react";
import MyMonitoringView, { MyMonitoringViewProps } from "./MyMonitoringView";

export default async function Page({ searchParams }: MyMonitoringViewProps) {
    return (
        <Suspense fallback={null}>
            <MyMonitoringView searchParams={searchParams} />
        </Suspense>
    )
}