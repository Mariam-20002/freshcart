"use server";

export async function verifyResetCode(resetCode: string) {
  try {
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: payload.message || "Invalid reset code",
      };
    }

    return {
      success: true,
      message: payload.status || "Code verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
