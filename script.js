// 1. Partikel Emas Melayang
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

// 2. Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 150) {
            el.classList.add('active');
        }
    });
}

// 3. Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Inisialisasi
window.addEventListener('scroll', reveal);
window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animateParticles();
reveal(); // Cek posisi awal saat load

/* --- TAMBAHAN LOGIKA INTERAKTIF --- */

// 1. Logic Modal Pop-up
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scroll background
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto"; // Enable scroll background
}

// Tutup modal jika klik di luar konten
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// 2. Logic Generator Pantun Jambi
const pantunCollection = [
    "Batanghari aeknyo tenang,<br>Sungguhpun tenang deras ke tepi.<br>Anak Jambi janganlah dikenang,<br>Kalau dikenang merusak hati.",
    "Berasap tungku di rumah gadang,<br>Tandonyo ibu sedang memasak.<br>Adat Jambi jangan dibuang,<br>Supayo negeri tidak rusak.",
    "Pergi ke pasar beli tempoyak,<br>Singgah sebentar membeli duku.<br>Kalau tuan bijak memihak,<br>Tentulah adil dalam laku.",
    "Kain songket tenunan indah,<br>Dipakai gadis pergi ke pesta.<br>Negeri Jambi negeri bertuah,<br>Sepucuk Jambi Sembilan Lurah.",
    "Elok rupanya Candi Muaro,<br>Tempat belajar zaman dahulu.<br>Jagalah adat beserta kromo,<br>Supaya hidup rukun selalu."
];

function generatePantun() {
    const display = document.getElementById('pantun-display');
    // Efek fade out
    display.style.opacity = 0;
    
    setTimeout(() => {
        // Pilih pantun acak
        const randomIndex = Math.floor(Math.random() * pantunCollection.length);
        display.innerHTML = `"${pantunCollection[randomIndex]}"`;
        // Efek fade in
        display.style.opacity = 1;
    }, 300);
}

// 1. FILTER GALLERY
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(category) || (category === 'all' && btn.innerText === 'Semua')) {
            btn.classList.add('active');
        }
    });

    // Show/Hide Items
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 100);
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}


/* 1. SELOKO SLIDER LOGIC */
let isPlaying = false;
let currentSeloko = 0;
const slides = document.querySelectorAll('.seloko-slide');

function showSeloko(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) currentSeloko = 0;
    else if (index < 0) currentSeloko = slides.length - 1;
    else currentSeloko = index;
    
    slides[currentSeloko].classList.add('active');
}

function nextSeloko() { showSeloko(currentSeloko + 1); }
function prevSeloko() { showSeloko(currentSeloko - 1); }

// Auto slide setiap 5 detik
setInterval(() => { nextSeloko(); }, 5000);

/* 3. RADAR INTERACTION (ARKEOLOGI) */
if (document.querySelectorAll('.radar-dot').length > 0) {
    const radarDots = document.querySelectorAll('.radar-dot');
    const artifactInfo = document.getElementById('artifact-info');

    radarDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            const info = this.getAttribute('data-info');
            artifactInfo.innerHTML = `
                <h3 style="color: #0f0;"><i class="fas fa-bullseye"></i> Objek Terdeteksi!</h3>
                <p style="font-size: 1.1rem; font-weight: bold; color: white;">${info}</p>
                <p>Lokasi: Dasar Sungai Batanghari. Kedalaman: 15 Meter.</p>
            `;
        });

        dot.addEventListener('mouseleave', function() {
            artifactInfo.innerHTML = `
                <h3><i class="fas fa-search"></i> Sonar Aktif...</h3>
                <p>Situs Bawah Air Sungai Batanghari menyimpan ribuan keramik asing, bukti Jambi sebagai pelabuhan internasional kuno.</p>
                <p class="blink-text">> Arahkan kursor ke titik hijau di radar.</p>
            `;
        });
    });
}

// Keyframes animation via JS insert (optional, better in CSS but handled here for logic sync)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes equalizer { 0% { height: 5px; } 50% { height: 25px; } 100% { height: 5px; } }
`;
document.head.appendChild(styleSheet);

/* --- UPDATE RADAR INTERACTION DENGAN GAMBAR --- */
const radarDots = document.querySelectorAll('.radar-dot');
const artifactTitle = document.getElementById('artifact-title');
const artifactDesc = document.getElementById('artifact-desc');
const artifactPreview = document.getElementById('artifact-preview-container');
const artifactImg = document.getElementById('artifact-preview-img');

radarDots.forEach(dot => {
    dot.addEventListener('mouseenter', function() {
        const info = this.getAttribute('data-info');
        const imgUrl = this.getAttribute('data-img');

        // Update Konten
        artifactTitle.innerHTML = `<i class="fas fa-bullseye"></i> Objek Terdeteksi!`;
        artifactDesc.innerHTML = `<strong>${info}</strong><br>Ditemukan di dasar Sungai Batanghari.`;
        
        // Update Gambar & Animasi
        artifactImg.src = imgUrl;
        artifactPreview.style.display = "block";
        setTimeout(() => {
            artifactPreview.classList.add('active');
        }, 10);
    });

    dot.addEventListener('mouseleave', function() {
        // Kembalikan ke keadaan semula
        artifactTitle.innerHTML = `<i class="fas fa-search"></i> Sonar Aktif...`;
        artifactDesc.innerHTML = `Situs Bawah Air Sungai Batanghari menyimpan ribuan keramik asing. Arahkan kursor ke titik hijau di radar.`;
        
        artifactPreview.classList.remove('active');
        setTimeout(() => {
            artifactPreview.style.display = "none";
        }, 500);
    });
});

/* --- LOGIKA MUSIC YOUTUBE (OPSIONAL: KLIK UNTUK PLAY) --- */
// YouTube iframe sudah memiliki kontrol bawaan, 
// tapi kita bisa menambahkan efek visualizer saat halaman di-scroll
window.addEventListener('scroll', () => {
    const musicSection = document.getElementById('seni');
    const bars = document.querySelectorAll('.visualizer-mini .bar');
    
    if (musicSection.getBoundingClientRect().top < window.innerHeight) {
        bars.forEach(bar => bar.style.animationPlayState = 'running');
    } else {
        bars.forEach(bar => bar.style.animationPlayState = 'paused');
    }
});

// Tambahkan kategori 'rimba' ke dalam logika filter jika diperlukan
// Saat ini section rimba dibuat terpisah untuk memberikan impact lebih besar.

// Opsional: Tambahkan efek hover suara (jika ada file audio) untuk daun herbal
const herbalCards = document.querySelectorAll('.herbal-card');
herbalCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Efek visual tambahan saat hover obat tradisional
        card.style.boxShadow = "0 0 20px rgba(76, 175, 80, 0.3)";
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = "none";
    });
});