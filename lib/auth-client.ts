"use client";

import { createAuthClient } from "better-auth/react";

/** Client-side auth helpers. baseURL defaults to the current origin. */
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
