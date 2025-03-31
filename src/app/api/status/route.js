import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    // 배터리 상태 가져오기 (노트북일 경우)
    let battery = "N/A";
    try {
      battery = execSync(
        "upower -i $(upower -e | grep BAT) | grep 'percentage'"
      )
        .toString()
        .trim();
    } catch (e) {
      battery = "Battery info not available";
    }

    // CPU 온도 가져오기
    let temperature = "N/A";
    try {
      temperature = execSync("sensors | grep 'Package id 0' | awk '{print $4}'")
        .toString()
        .trim();
    } catch (e) {
      temperature = "Temperature info not available";
    }

    return NextResponse.json({ battery, temperature });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch system status" },
      { status: 500 }
    );
  }
}
