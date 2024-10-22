import order from './order.json'
import { NextResponse } from "next/server";

// export const config = {
//     api: {
//         responseLimit: '8mb',
//     },
// }
export async function GET() {
  return NextResponse.json(order);
}
