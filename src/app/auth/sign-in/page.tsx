"use client"

import { useEffect } from "react";
import { useSignInStore } from "@/features/auth";

export default function SignUp() {
    const { modal, updateValue } = useSignInStore();

    useEffect(() => {
        updateValue("modal", { ...modal, isOpen: true });

        return () => updateValue("modal", { ...modal, isOpen: false });
    }, [])

    return (
        <div className="w-full min-h-[100vh] flex flex-col jusitfy-center items-center">
        </div>
    )
}