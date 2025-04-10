// Quản lý session wallet
const WALLET_KEY = 'connected_wallet';

class WalletSession {
    static isConnected() {
        return localStorage.getItem(WALLET_KEY) === 'true';
    }

    static connect() {
        localStorage.setItem(WALLET_KEY, 'true');
        this.updateUI(true);
        // Broadcast event để các trang khác cập nhật UI
        window.dispatchEvent(new Event('walletConnectionChanged'));
    }

    static disconnect() {
        localStorage.removeItem(WALLET_KEY);
        this.updateUI(false);
        // Broadcast event để các trang khác cập nhật UI
        window.dispatchEvent(new Event('walletConnectionChanged'));
        // Redirect về trang chủ
        window.location.href = '/index.html';
    }

    static updateUI(isConnected) {
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.textContent = isConnected ? 'Disconnect Wallet' : 'Connect Wallet';
            // Gán sự kiện click trực tiếp
            connectBtn.onclick = () => isConnected ? this.disconnect() : this.connect();
        }

        // Update admin content visibility if exists
        const adminContent = document.getElementById('adminContent');
        const loginSection = document.getElementById('loginSection');
        if (adminContent && loginSection) {
            adminContent.style.display = isConnected ? 'block' : 'none';
            loginSection.style.display = isConnected ? 'none' : 'block';
        }
    }

    static initialize() {
        // Update UI based on current connection status
        this.updateUI(this.isConnected());

        // Listen for changes from other tabs/windows
        window.addEventListener('walletConnectionChanged', () => {
            this.updateUI(this.isConnected());
        });

        // Check connection status when page loads
        if (!this.isConnected()) {
            const adminContent = document.getElementById('adminContent');
            if (adminContent) {
                window.location.href = '/index.html';
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    WalletSession.initialize();
}); 