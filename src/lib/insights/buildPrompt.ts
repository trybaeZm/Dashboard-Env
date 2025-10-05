export function buildPromptFromOS(osData: Record<string, any[]>): string {
  const churn = osData['churn'] || [];
  const inventory = osData['inventory'] || [];
  const pricing = osData['pricing'] || [];

  let prompt = `You are Lenny Insights: write concise, actionable business insights (<= 2 sentences each). Use direct language with metrics. No fluff.\n\n`;

  if (churn.length) {
    const highRisk = churn.filter((r) => parseFloat(r.churn_probability || '0') >= 0.7).length;
    prompt += `Churn: ${highRisk}/${churn.length} customers at high risk (>=0.7).\n`;
  }

  if (inventory.length) {
    const restock = inventory.filter((r) => parseInt(r.suggested_order_qty || '0') > 0).length;
    prompt += `Inventory: ${restock} products need restock now.\n`;
  }

  if (pricing.length) {
    const products = new Set(pricing.map((r) => r.product_id));
    prompt += `Pricing: suggested tests ready for ${products.size} products.\n`;
  }

  prompt += `Write 1-3 insights total, each on its own line. Keep it specific and time-bound.`;

  return prompt;
}
