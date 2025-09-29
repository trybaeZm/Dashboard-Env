import { supabase } from "@/services/SupabaseConfig";
import { openai } from "../utils";

export async function generateStockEmbeddings(businessId: string) {
  // 1. Fetch stock rows
  const { data: stocks, error } = await supabase
    .from("stock_table")
    .select("*")
    .eq("business_id", businessId);

  if (error) {
    console.error("Error fetching stock data:", error);
    return;
  }

  for (const stock of stocks) {
    // 2. Build chunk text
    const chunkText = `
      Stock Record:
      Product ID: ${stock.product_id}
      Quantity: ${stock.quantity}
      Created At: ${stock.created_at}
    `;

    // 3. Generate embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunkText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 4. Insert into business_knowledge table
    const { error: insertError } = await supabase.from("business_knowledge").insert({
      business_id: stock.business_id,
      source_table: "stock_table",
      source_id: stock.stock_id,
      chunk_text: chunkText,
      embedding,
    });

    if (insertError) {
      console.error("Error inserting chunk:", insertError);
    } else {
      console.log(`✅ Inserted embedding for stock id ${stock.id}`);
    }
  }
}

export async function generateProductEmbeddings(businessId: string) {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId);

  if (error) {
    console.error("Error fetching product data:", error);
    return;
  }

  for (const product of products) {
    const chunkText = `
      Product Record:
      Name: ${product.name}
      Description: ${product.description || "N/A"}
      Price: ${product.price}
      Category: ${product.category}
      Created At: ${product.created_at}
      Partial Payment Allowed: ${product.partialPayment === 1 ? "Yes" : "No"}
    `;

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunkText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { error: insertError } = await supabase.from("business_knowledge").insert({
      business_id: product.business_id,
      source_table: "products",
      source_id: product.id,
      chunk_text: chunkText,
      embedding,
    });

    if (insertError) {
      console.error("Error inserting product chunk:", insertError);
    } else {
      console.log(`✅ Inserted embedding for product id ${product.id}`);
    }
  }
}

export async function generateOrderEmbeddings(businessId: string) {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("business_id", businessId);

  if (error) {
    console.error("❌ Error fetching orders:", error);
    return;
  }

  for (const order of orders) {
    const chunkText = `
      Order Record:
      Order ID: ${order.order_id}
      Customer ID: ${order.customer_id}
      Product ID: ${order.product_id}
      Quantity: ${order.quantity}
      Total Amount: ${order.total_amount}
      Status: ${order.order_status}
      Payment Status: ${order.order_payment_status}
      Delivery Location: ${order.delivery_location || "N/A"}
      Transaction ID: ${order.transaction_id || "N/A"}
      Order Token: ${order.orderToken || "N/A"}
      Partial Payment Total: ${order.partialAmountTotal || 0}
      Notes: ${order.sammarized_notes || "N/A"}
      Created At: ${order.created_at}
    `;

    // 1. Create embedding from OpenAI
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunkText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 2. Store embedding in business_knowledge
    const { error: insertError } = await supabase.from("business_knowledge").insert({
      business_id: order.business_id,
      source_table: "orders",
      source_id: order.id,
      chunk_text: chunkText,
      embedding,
    });

    if (insertError) {
      console.error("❌ Error inserting order chunk:", insertError);
    } else {
      console.log(`✅ Inserted embedding for order id ${order.id}`);
    }
  }
}

export async function generateCustomerEmbeddings(businessId: string) {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .eq("business_id", businessId);

  if (error) {
    console.error("❌ Error fetching customers:", error);
    return;
  }

  for (const customer of customers) {
    const chunkText = `
      Customer Record:
      Customer ID: ${customer.customer_id}
      Name: ${customer.name}
      Email: ${customer.email || "N/A"}
      Phone: ${customer.phone || "N/A"}
      Location: ${customer.location || "N/A"}
      Gender: ${customer.gender || "N/A"}
      Created At: ${customer.created_at}
    `;

    // 1. Create embedding from OpenAI
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunkText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 2. Store embedding in business_knowledge
    const { error: insertError } = await supabase.from("business_knowledge").insert({
      business_id: customer.business_id,
      source_table: "customers",
      source_id: customer.id,
      chunk_text: chunkText,
      embedding,
    });

    if (insertError) {
      console.error("❌ Error inserting customer chunk:", insertError);
    } else {
      console.log(`✅ Inserted embedding for customer id ${customer.id}`);
    }
  }
}