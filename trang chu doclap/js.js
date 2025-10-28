const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 500; 
const speed = 0.05; 

// Hàm thiết lập kích thước canvas
function setCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

// Lớp (Class) Ngôi Sao
class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width; 
        
        // Tăng bán kính ngẫu nhiên tối đa lên 1.5, tối thiểu lên 0.5
        this.radius = Math.random() * 1.0 + 0.5; 
        this.color = "rgba(255, 255, 255, " + (this.radius / 1.5) + ")"; 
    }

    // Cập nhật vị trí ngôi sao
    update() {
        this.z -= speed;
        if (this.z <= 0) {
            this.z = width;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }
    }

    // Vẽ ngôi sao
    draw() {
        // Ánh xạ 3D (x, y, z) sang 2D (x_proj, y_proj)
        const x_proj = (this.x - width / 2) * (width / this.z) + width / 2;
        const y_proj = (this.y - height / 2) * (width / this.z) + height / 2;
        
        // Bán kính thay đổi dựa trên trục Z (càng gần càng lớn)
        const radius_proj = this.radius * (width / this.z) * 0.7; 

        // Vẽ hình tròn cho ngôi sao
        ctx.beginPath();
        ctx.arc(x_proj, y_proj, radius_proj, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Khởi tạo các ngôi sao
function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

// Vòng lặp Animation chính
function animate() {
    // Xóa toàn bộ canvas. Sử dụng màu nền đậm (#00001a)
    ctx.fillStyle = '#00001a'; 
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Khởi tạo và chạy hiệu ứng khi load trang
setCanvasSize();
createStars();
animate();

// Xử lý thay đổi kích thước màn hình
window.addEventListener('resize', () => {
    setCanvasSize();
    createStars(); 
});