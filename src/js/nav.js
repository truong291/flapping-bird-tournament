function showConfirmModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const confirmBtn = document.getElementById('confirmBtn');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.style.display = 'block';

    confirmBtn.onclick = () => {
        modal.style.display = 'none';
        onConfirm();
    };

    document.getElementById('cancelBtn').onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function handleWalletClick() {
    const isConnected = localStorage.getItem('walletConnected') === 'true';
    
    if (isConnected) {
        showConfirmModal(
            'Ngắt kết nối ví',
            'Bạn có chắc chắn muốn ngắt kết nối ví không?',
            () => {
                localStorage.removeItem('walletConnected');
                localStorage.removeItem('walletAddress');
                window.location.href = 'index.html';
            }
        );
    } else {
        window.location.href = 'player.html';
    }
}

// Cập nhật trạng thái nút khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const isConnected = localStorage.getItem('walletConnected') === 'true';
    
    if (connectWalletBtn) {
        connectWalletBtn.textContent = isConnected ? 'Disconnect' : 'Connect Wallet';
    }
}); 