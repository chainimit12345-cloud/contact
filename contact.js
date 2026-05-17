// 1. ระบบ 3D Tilt Effect (ปรับให้นุ่มนวลและเอียงน้อยลง เพื่อความหรูหรา)
const cards = document.querySelectorAll(".social-card");

cards.forEach((card) => {
  let bounds;
  let isHovered = false;

  card.addEventListener("mouseenter", () => {
    isHovered = true;
    bounds = card.getBoundingClientRect();
    card.style.transition = "none";
  });

  card.addEventListener("mousemove", (e) => {
    if (!isHovered) return;

    requestAnimationFrame(() => {
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // ลดตัวคูณองศาลงเหลือ 4 (จากเดิม 6-10) ทำให้การ์ดขยับแบบผู้ดีขึ้น
      const rotateX = ((mouseY - centerY) / centerY) * -4;
      const rotateY = ((mouseX - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
  });

  card.addEventListener("mouseleave", () => {
    isHovered = false;
    // คืนค่าพร้อม transition ที่นุ่มลึก
    card.style.transition =
      "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.4s, box-shadow 0.4s, border-color 0.4s";
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  });
});

// 2. ระบบคัดลอก LINE ID (ไอคอน FontAwesome)
const lineBtn = document.getElementById("copyLineBtn");
const lineText = document.getElementById("lineStatusText");

if (lineBtn) {
  lineBtn.addEventListener("click", async () => {
    const lineIdToCopy = lineBtn.getAttribute("data-line-id");

    try {
      await navigator.clipboard.writeText(lineIdToCopy);

      // แสดงผลเมื่อคัดลอกสำเร็จ
      lineText.innerHTML = `<i class="fa-solid fa-check"></i> คัดลอกสำเร็จ`;
      lineBtn.classList.add("copy-success");

      setTimeout(() => {
        lineText.innerHTML = `ID: ${lineIdToCopy} <i class="fa-regular fa-copy"></i>`;
        lineBtn.classList.remove("copy-success");
      }, 2000);
    } catch (err) {
      lineText.innerHTML = `<i class="fa-solid fa-xmark"></i> คัดลอกไม่สำเร็จ`;
      setTimeout(() => {
        lineText.innerHTML = `ID: ${lineIdToCopy} <i class="fa-regular fa-copy"></i>`;
      }, 2000);
    }
  });
}
