import { ConnectionsModal } from "@/features/show-user-connections/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ConnectionsModal />
        </>
    )
}