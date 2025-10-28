// javsa.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiệu ứng sóng biển
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return; // Kiểm tra xem canvas có tồn tại không
    
    const ctx = canvas.getContext('2d');
    
    // Khởi tạo kích thước Canvas bằng kích thước phần tử cha (hero-section)
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cấu hình Sóng
    // Sử dụng màu xanh/cyan để phù hợp với hiệu ứng công nghệ
    const waves = [
        // Sóng trước (đậm nhất) - Tốc độ nhanh hơn
        { amplitude: 30, frequency: 0.005, speed: -0.015, color: 'rgba(72, 219, 251, 0.7)', yOffset: 0.95 }, 
        // Sóng giữa (trung bình) - Tốc độ vừa
        { amplitude: 20, frequency: 0.003, speed: 0.01, color: 'rgba(72, 219, 251, 0.4)', yOffset: 0.85 }, 
        // Sóng nền (nhạt nhất) - Tốc độ chậm
        { amplitude: 15, frequency: 0.002, speed: -0.005, color: 'rgba(72, 219, 251, 0.1)', yOffset: 0.75 } 
    ];

    let time = 0;

    function drawWave() {
        // Xóa canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Vẽ từng lớp sóng
        waves.forEach(wave => {
            ctx.beginPath();
            
            // Bắt đầu vẽ từ góc dưới bên trái (x=0, y=bottom)
            ctx.moveTo(0, canvas.height); 

            for (let x = 0; x < canvas.width; x++) {
                // Công thức sóng Sin: Vị trí Y = Độ lệch + Biên độ * sin(x * Tần số + thời gian * Tốc độ)
                // wave.yOffset xác định vị trí sóng bắt đầu từ đâu (0.75 = 75% chiều cao canvas)
                const y = canvas.height * wave.yOffset + 
                          wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed);
                ctx.lineTo(x, y);
            }

            // Đóng đường dẫn để tạo hình dạng kín
            ctx.lineTo(canvas.width, canvas.height); // Góc dưới bên phải
            ctx.lineTo(0, canvas.height);           // Quay lại góc dưới bên trái

            ctx.fillStyle = wave.color;
            ctx.fill();
        });

        // Tăng biến thời gian để tạo chuyển động liên tục
        time += 1;

        // Lặp lại hàm vẽ ở tốc độ khung hình của trình duyệt
        requestAnimationFrame(drawWave);
    }

    // Bắt đầu hiệu ứng sóng
    drawWave();

    // 2. Hiệu ứng chữ nhảy từng đợt (staggered text animation) đã được thêm vào index.html
});