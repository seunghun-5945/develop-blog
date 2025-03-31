import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    console.log("Fetching battery status...");

    let battery = "N/A";
    try {
      battery = execSync(
        "upower -i $(upower -e | grep BAT) | grep 'percentage'"
      )
        .toString()
        .trim();
      console.log("Battery Status:", battery);
    } catch (e) {
      console.error("Battery info fetch error:", e);
      battery = "Battery info not available";
    }

    let temperature = "N/A";
    try {
      temperature = execSync("sensors | grep 'Package id 0' | awk '{print $4}'")
        .toString()
        .trim();
      console.log("CPU Temperature:", temperature);
    } catch (e) {
      console.error("Temperature info fetch error:", e);
      temperature = "Temperature info not available";
    }

    return NextResponse.json({ battery, temperature });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch system status" },
      { status: 500 }
    );
  }
}
