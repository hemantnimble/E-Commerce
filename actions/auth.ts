"use server";

import { auth, signIn, signOut } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const login = async (provider: string) => {
    await signIn(provider, { redirectTo: "/" });
    revalidatePath("/");
};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
    revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
    const rawFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
        role: "ADMIN",
        redirectTo: "/",
    };

    const existingUser = await getUserByEmail(formData.get("email") as string);
    console.log(existingUser);

    try {
        const result = await signIn("credentials", rawFormData);

        // Handle the result of signIn
        if (result?.error) {
            switch (result.error) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
    } catch (error: any) {
        console.error(error);
        return { error: "An unexpected error occurred." };
    }

    revalidatePath("/");
};

export const UserDetails = async () => {
    const session = await auth();
    return session;
};