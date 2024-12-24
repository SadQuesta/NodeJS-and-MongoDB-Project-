var currentImageIndex = 0;
var images = document.querySelectorAll('#gallery img:not([alt="Geri"]):not([alt="İleri"])');
var totalImages = images.length;
var autoChangeInterval;

function changeImage(step) {
    currentImageIndex += step;

    // İleri veya geri sarma
    if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    }

    // Tüm resimleri gizle
    for (var i = 0; i < totalImages; i++) {
        images[i].style.display = 'none';
    }

    // Şu anki resmi göster
    images[currentImageIndex].style.display = 'block';
}

function autoChangeImage() {
    changeImage(1);
}

function startAutoChange() {
    autoChangeInterval = setInterval(autoChangeImage, 5000); // 5000 milisaniye (5 saniye) aralıklarla çağır
}

// Sayfa yüklendiğinde otomatik değişimi başlat
startAutoChange();
