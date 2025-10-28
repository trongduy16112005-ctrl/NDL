/**
 * Hàm này dùng để chuyển đổi class 'active' trên ảnh phụ (subPhoto)
 * khi người dùng click vào ảnh chính (mainPhoto).
 * Class 'active' trong CSS sẽ làm ảnh phụ hiện ra (opacity: 1)
 */
function toggleSubPhoto() {
    const subPhoto = document.getElementById('subPhoto');
    
    // Phương thức toggle sẽ thêm class nếu nó chưa tồn tại, và gỡ bỏ nếu nó đã tồn tại.
    subPhoto.classList.toggle('active');
}