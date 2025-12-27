import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import client from "@/lib/db/client"


export const auth = betterAuth({
  database: prismaAdapter(client, {
    provider: 'postgresql'
  }),
  socialProviders: {
    google: {
      accessType: "offline", 
      prompt: "select_account consent", 
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'https://www.googleapis.com/auth/drive.file',
         'https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.metadata'],
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      scope: ['ads_management', 'ads_read', 'business_management', 'catalog_management']
    }
  },
  account: {
    accountLinking: {
      enabled: true,
    }
  }
});