import { AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prismaClient } from "@/lib/prisma"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      // @ts-expect-error - `clientId` is not a undefined in `.env`
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-expect-error - `clientId` is not a undefined in `.env`
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}
