const express = require("express");
const router = express.Router();

// ======================
// Salla Webhook
// ======================
router.post("/salla/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    // ⚡ رد سريع جدًا (مهم لسلة)
    res.status(200).json({ success: true });

    // ======================
    // Logs
    // ======================
    console.log("📦 Webhook Received");
    console.log({
      userId,
      event: data?.event,
      orderId: data?.data?.id
    });

    // ======================
    // Events
    // ======================
    switch (data?.event) {
      case "order.created":
        console.log("🛒 New Order:", data.data?.id);
        break;

      case "order.paid":
        console.log("💰 Order Paid:", data.data?.id);
        break;

      case "order.shipped":
        console.log("🚚 Order Shipped:", data.data?.id);
        break;

      default:
        console.log("ℹ️ Other Event:", data?.event);
    }

  } catch (error) {
    console.error("❌ Error:", error);

    // حتى لو فيه خطأ نرجع 200 عشان سلة ما تفشل
    res.status(200).json({ success: false });
  }
});

module.exports = router;
