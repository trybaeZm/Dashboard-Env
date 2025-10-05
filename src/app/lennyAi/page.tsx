'use client'
import ChatCard from "@/components/Chat/ChatCard"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";

const TryCat = () => {
    const navigation = useRouter();

    return (
        <>
            <DefaultLayout>
            <ChatCard/>
            </DefaultLayout>
        </>
    )
}

export default TryCat