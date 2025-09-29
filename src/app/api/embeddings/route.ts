import {
    generateProductEmbeddings,
    generateOrderEmbeddings,
    generateCustomerEmbeddings,
    generateStockEmbeddings,
} from "@/lib/ragfunctions/ragfunctions";
import { supabase } from "@/services/SupabaseConfig";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // 1️⃣ Get all business IDs
        const { data: businesses, error } = await supabase
            .from("businesses") // replace with your actual business table
            .select("id");

        if (error) throw error;
        if (!businesses?.length) {
            return NextResponse.json({ error: "No businesses found" }, { status: 404 });
        }

        // 2️⃣ Loop through all businesses
        for (const b of businesses) {
            const businessId = b.id;

            console.log(`Embedding data for business: ${businessId}`);

            // 3️⃣ Generate embeddings for all tables sequentially (optional: can use Promise.all)
            await generateStockEmbeddings(businessId);
            await generateProductEmbeddings(businessId);
            await generateOrderEmbeddings(businessId);
            await generateCustomerEmbeddings(businessId);
        }

        return NextResponse.json({ success: true, businessesProcessed: businesses.length });
    } catch (err: any) {
        console.error("Full embedding error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
