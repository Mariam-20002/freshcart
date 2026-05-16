"use server";

export async function forgotPassword(email: string) {
  try {
    const response = await fetch(`${process.env.API}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: payload.message || "Something went wrong",
      };
    }

    return {
      success: true,
      message: payload.message || "Reset code sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
