// Tüm protected-link sınıfına sahip bağlantıları seç
const protectedLinks = document.querySelectorAll('.protected-link');

// Her bağlantı için click olay dinleyicisi ekle
protectedLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Varsayılan link davranışını durdur

        const guestStatus = document.getElementById('Guest').innerText;

        if (guestStatus === 'Visitor') {
            // Kullanıcı 'Visitor' ise, korumalı sayfaya yönlendir
            alert('Önce kayit olmalisiniz.');
            window.location.href = '#services';
        } else {
            // Kullanıcı 'Visitor' değilse, kayıt olma sayfasına yönlendir
            
            window.location.href = 'services.html';
             // Kayıt sayfasının URL'sini girin
        }
    });
});