// Device fingerprinting utility for frontend
export function generateDeviceId() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	ctx.textBaseline = 'top';
	ctx.font = '14px Arial';
	ctx.fillText('Device fingerprint', 2, 2);
	
	const fingerprint = [
		navigator.userAgent,
		navigator.language,
		screen.width + 'x' + screen.height,
		new Date().getTimezoneOffset(),
		canvas.toDataURL()
	].join('|');
	
	return btoa(fingerprint).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
}

export function getDeviceInfo() {
	return {
		userAgent: navigator.userAgent,
		language: navigator.language,
		platform: navigator.platform,
		screenResolution: `${screen.width}x${screen.height}`,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
	};
}

// Device session management for frontend
export class DeviceSessionManager {
	constructor(apiBaseUrl) {
		this.apiBaseUrl = apiBaseUrl;
		this.deviceId = this.getOrCreateDeviceId();
		this.checkInterval = null;
	}

	getOrCreateDeviceId() {
		let deviceId = localStorage.getItem('deviceId');
		if (!deviceId) {
			deviceId = generateDeviceId();
			localStorage.setItem('deviceId', deviceId);
		}
		return deviceId;
	}

	async registerDevice(userId) {
		try {
			const response = await fetch(`${this.apiBaseUrl}/device-login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId,
					deviceId: this.deviceId,
					deviceInfo: getDeviceInfo()
				})
			});
			return await response.json();
		} catch (error) {
			console.error('Device registration failed:', error);
			return { error: error.message };
		}
	}

	async unregisterDevice(userId) {
		try {
			const response = await fetch(`${this.apiBaseUrl}/device-logout`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId,
					deviceId: this.deviceId
				})
			});
			return await response.json();
		} catch (error) {
			console.error('Device unregistration failed:', error);
			return { error: error.message };
		}
	}

	startStatusCheck(onLogout) {
		this.checkInterval = setInterval(async () => {
			try {
				const response = await fetch(`${this.apiBaseUrl}/device-status?deviceId=${this.deviceId}`);
				const data = await response.json();
				
				if (data.shouldLogout) {
					this.stopStatusCheck();
					onLogout();
				}
			} catch (error) {
				console.error('Device status check failed:', error);
			}
		}, 30000); // Check every 30 seconds
	}

	stopStatusCheck() {
		if (this.checkInterval) {
			clearInterval(this.checkInterval);
			this.checkInterval = null;
		}
	}
}