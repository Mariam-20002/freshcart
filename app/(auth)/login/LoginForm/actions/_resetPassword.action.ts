"use server";

export async function resetPassword(email: string, newPassword: string) {
  try {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        newPassword,
      }),
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
      message: "Password reset successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
