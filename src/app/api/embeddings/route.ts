import {
    generateProductEmbeddings,
    generateOrderEmbeddings,
    generateCustomerEmbeddings,
    generateStockEmbeddings,
    generateBusinessEmbeddings,
} from "@/lib/ragfunctions/ragfunctions";
import { supabase } from "@/services/SupabaseConfig";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // 1️⃣ Get all business IDs
        const { data: businesses, error } = await supabase
            .from("business_owners") // replace with your actual business table
            .select("user_id , business_id");

        if (error) throw error;
        if (!businesses?.length) {
            return NextResponse.json({ error: "No businesses found" }, { status: 404 });
        }

        // 2️⃣ Loop through all businesses
        for (const b of businesses) {
            const businessId = b.business_id;
            const userId = b.user_id;

            console.log(`Embedding data for business: ${businessId} and for user: ${userId}`);

            // 3️⃣ Generate embeddings for all tables sequentially (optional: can use Promise.all)
            await generateBusinessEmbeddings(businessId, userId);
            await generateStockEmbeddings(businessId, userId);
            await generateProductEmbeddings(businessId, userId);
            await generateOrderEmbeddings(businessId, userId);
            await generateCustomerEmbeddings(businessId, userId);
        }

        return NextResponse.json({ success: true, businessesProcessed: businesses.length });
    } catch (err: any) {
        console.error("Full embedding error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
