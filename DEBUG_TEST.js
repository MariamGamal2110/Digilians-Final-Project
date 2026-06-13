// Test script to debug the punishment endpoint
// Run this in browser console to verify backend connectivity

async function testPunishmentEndpoint() {
  try {
    console.log("🔍 Testing punishment endpoint...");
    
    // Get current user
    const userStr = localStorage.getItem('digilians_user');
    const user = userStr ? JSON.parse(userStr) : null;
    console.log("📌 Current user:", user);
    
    // Get token
    const token = localStorage.getItem('digilians_token');
    console.log("🔑 Token exists:", !!token);
    
    if (!user || !user.militaryId) {
      console.warn("⚠️ No militaryId found in user data. Using test data instead.");
    }
    
    const militaryNum = user?.militaryId || "22589"; // fallback for testing
    const studentName = user?.name || "";
    
    console.log(`📝 Searching for: militaryNum="${militaryNum}", studentName="${studentName}"`);
    
    const params = new URLSearchParams({ militaryNum, studentName });
    const url = `http://localhost:5000/api/punishments/student?${params.toString()}`;
    console.log(`🌐 URL: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📋 Response headers:`, {
      contentType: response.headers.get("content-type"),
    });
    
    const data = await response.json();
    console.log("✅ Response data:", data);
    
    if (data.success) {
      console.log(`✨ Total punishments: ${data.stats?.totalPunishments || 0}`);
      console.log(`📌 Punishments:`, data.punishments);
    } else {
      console.error("❌ Error from server:", data.message);
    }
    
  } catch (err) {
    console.error("💥 Test failed:", err);
  }
}

// Run the test
testPunishmentEndpoint();
