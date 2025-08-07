import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server";

async function handler(request: Request) {
    revalidatePath("/", "layout");
    return NextResponse.json({})
}
export {handler as POST, handler as GET}