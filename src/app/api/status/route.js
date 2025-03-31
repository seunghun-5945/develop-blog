import { NextResponse } from "next/server";
import { execSync } from "child_process";

// 상태를 저장할 변수
let battery = "N/A";
let temperature = "N/A";

// 배터리와 CPU 온도 주기적으로 갱신하기
function updateSystemStatus() {
  try {
    // 배터리 상태 가져오기
    battery = execSync("upower -i $(upower -e | grep BAT) | grep 'percentage'")
      .toString()
      .trim();
  } catch (e) {
    console.error("Failed to fetch battery info:", e); // 에러 로깅 추가
    battery = "Battery info not available";
  }

  try {
    // CPU 온도 가져오기
    temperature = execSync("sensors | grep 'Package id 0' | awk '{print $4}'")
      .toString()
      .trim();
  } catch (e) {
    console.error("Failed to fetch temperature info:", e); // 에러 로깅 추가
    temperature = "Temperature info not available";
  }
}

// 10초마다 상태 갱신 (주기적으로 갱신)
setInterval(updateSystemStatus, 10000); // 10초마다 갱신

export async function GET() {
  try {
    // 갱신된 배터리 상태와 CPU 온도를 클라이언트에 반환
    return NextResponse.json({ battery, temperature });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch system status" },
      { status: 500 }
    );
  }
}
