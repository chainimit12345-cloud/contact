// ========================================================
// ⚙️ 1. จัดการข้อมูล (แยกเบอร์โทร และ อีเมล) เพิ่มได้ไม่จำกัด!
// ========================================================

// 📱 รายการเบอร์โทรศัพท์
const phoneList = [
  {
    label: "เบอร์โทรหลัก (Mobile)",
    displayValue: "081-234-5678",
    fullValue: "0812345678",
  },
  // ตัวอย่างการเพิ่มเบอร์ที่ 2 (เอาคอมเมนต์ออกแล้วพิมพ์เพิ่มได้เลย)
  /*
    ,{
        label: 'เบอร์สำรอง (Office)',
        displayValue: '02-123-4567',
        fullValue: '021234567'
    }
    */
];

// 📧 รายการอีเมล
const emailList = [
  {
    label: "อีเมลติดต่องาน",
    displayValue: "contact@yourdomain.com",
    fullValue: "contact@yourdomain.com",
  },
  /*
    ,{
        label: 'ส่งเอกสาร',
        displayValue: 'document@yourdomain.com',
        fullValue: 'document@yourdomain.com'
    }
    */
];

// ========================================================
// 🛠️ 2. ระบบ Popup (เปิด-ปิด และ วาดข้อมูลอัตโนมัติ)
// ========================================================
const dynamicModal = document.getElementById("dynamicModal");
const modalTitle = document.getElementById("modalTitle");
const modalDynamicList = document.getElementById("modalDynamicList");
const closeModalBtn = document.getElementById("closeModalBtn");

const openPhoneModalBtn = document.getElementById("openPhoneModalBtn");
const openEmailModalBtn = document.getElementById("openEmailModalBtn");

// ฟังก์ชันหลักสำหรับเปิด Popup
function openModal(type) {
  // 1. เคลียร์ข้อมูลเก่าใน Popup ทิ้งก่อน
  modalDynamicList.innerHTML = "";

  // 2. เช็คว่าผู้ใช้กดปุ่มอะไร (Phone หรือ Email)
  let data = type === "phone" ? phoneList : emailList;
  let icon = type === "phone" ? "fa-solid fa-phone" : "fa-solid fa-envelope";
  let modalClass = type === "phone" ? "modal-phone" : "modal-email";
  let successClass =
    type === "phone" ? "copy-success-phone" : "copy-success-email";

  // 3. เปลี่ยนหัวข้อ ไอคอนพรีเมียม และสีของ Popup
  // ใส่เงา (Drop Shadow) ให้ไอคอนดูพรีเมียมและมีมิติ
  let premiumIcon =
    type === "phone"
      ? '<i class="fa-solid fa-mobile-screen" style="margin-right: 10px; filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.4));"></i>'
      : '<i class="fa-solid fa-envelope-open-text" style="margin-right: 10px; filter: drop-shadow(0 4px 8px rgba(244, 63, 94, 0.4));"></i>';

  modalTitle.innerHTML =
    premiumIcon + (type === "phone" ? "เบอร์โทรติดต่อ" : "อีเมลติดต่อ");
  modalTitle.style.color =
    type === "phone" ? "var(--phone-color)" : "var(--email-color)";

  // 4. วาดการ์ดรายชื่อลงไปใน Popup
  data.forEach((item, index) => {
    const cardId = `modalCopyBtn_${type}_${index}`;
    const textId = `modalStatusText_${type}_${index}`;

    const cardHTML = `
            <div class="modal-item ${modalClass}" id="${cardId}">
                <div class="icon-box"><i class="${icon}"></i></div>
                <div class="info-box">
                    <div class="platform-name">${item.label}</div>
                    <div class="username" id="${textId}">${item.displayValue} <i class="fa-regular fa-copy"></i></div> 
                </div>
            </div>
        `;
    modalDynamicList.insertAdjacentHTML("beforeend", cardHTML);

    // 5. เปิดระบบกดเพื่อคัดลอก (Copy)
    setTimeout(() => {
      const btn = document.getElementById(cardId);
      const textElement = document.getElementById(textId);

      if (btn && textElement) {
        btn.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(item.fullValue);
            textElement.innerHTML = `<i class="fa-solid fa-check"></i> คัดลอกสำเร็จ!`;
            btn.classList.add(successClass);

            setTimeout(() => {
              textElement.innerHTML = `${item.displayValue} <i class="fa-regular fa-copy"></i>`;
              btn.classList.remove(successClass);
            }, 2000);
          } catch (err) {
            textElement.innerHTML = `<i class="fa-solid fa-xmark"></i> คัดลอกไม่สำเร็จ`;
          }
        });
      }
    }, 0);
  });

  // แสดง Popup
  dynamicModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ผูกปุ่มเข้ากับฟังก์ชัน
if (openPhoneModalBtn) {
  openPhoneModalBtn.addEventListener("click", () => openModal("phone"));
}

if (openEmailModalBtn) {
  openEmailModalBtn.addEventListener("click", () => openModal("email"));
}

// ระบบปิด Popup
function closeModal() {
  dynamicModal.classList.remove("active");
  document.body.style.overflow = "";
}
closeModalBtn.addEventListener("click", closeModal);
dynamicModal.addEventListener("click", (e) => {
  if (e.target === dynamicModal) closeModal();
});

// ========================================================
// 💎 3. ระบบคัดลอกเดิมของ LINE Official ในหน้าหลัก
// ========================================================
const lineBtn = document.getElementById("copyLineBtn");
const lineText = document.getElementById("lineStatusText");

if (lineBtn && lineText) {
  lineBtn.addEventListener("click", async () => {
    const lineIdToCopy = lineBtn.getAttribute("data-copy-text");
    try {
      await navigator.clipboard.writeText(lineIdToCopy);
      lineText.innerHTML = `<i class="fa-solid fa-check"></i> คัดลอกแล้ว`;
      lineBtn.classList.add("copy-success-line");
      setTimeout(() => {
        lineText.innerHTML = `ID: ${lineIdToCopy} <i class="fa-regular fa-copy"></i>`;
        lineBtn.classList.remove("copy-success-line");
      }, 2000);
    } catch (err) {
      lineText.innerHTML = `<i class="fa-solid fa-xmark"></i> ไม่สำเร็จ`;
    }
  });
}

// ========================================================
// ✨ 4. ระบบ 3D Tilt Effect สำหรับปุ่มทั้งหมดหน้าหลัก
// ========================================================
const allCards = document.querySelectorAll(".social-card");
allCards.forEach((card) => {
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
      const rotateX = ((mouseY - centerY) / centerY) * -6;
      const rotateY = ((mouseX - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
  });

  card.addEventListener("mouseleave", () => {
    isHovered = false;
    card.style.transition =
      "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, box-shadow 0.3s, border-color 0.3s";
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  });
});
