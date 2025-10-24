export const storesPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salon Locator - Bliss Hair Studio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
            color: #1A1A1A;
            background: #F5F5F5;
        }

        .stores-container {
            display: flex;
            height: 100vh;
            position: relative;
            flex-direction: row-reverse;
            padding-top: 80px;
        }

        /* Store List Sidebar - Now on Right */
        .stores-sidebar {
            width: 420px;
            background: #FFFFFF;
            display: flex;
            flex-direction: column;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
            z-index: 1000;
        }

        .stores-header {
            padding: 50px 35px 35px;
            border-bottom: 1px solid #E8E8E8;
        }

        .stores-header h1 {
            font-size: 2rem;
            font-weight: 300;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 25px;
            color: #1A1A1A;
        }

        .use-location-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: transparent;
            border: none;
            padding: 18px 35px;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: color 0.3s ease;
            font-family: inherit;
            color: #1A1A2E !important;
            border-bottom: 1px solid #E8E8E8;
            width: 100%;
            justify-content: flex-start;
        }

        .use-location-btn:hover {
            color: #1A1A2E !important;
            background: #FAFAFA;
        }

        .stores-list {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        .store-item {
            padding: 32px 35px;
            border-bottom: 1px solid #E8E8E8;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .store-item:hover {
            background: #FAFAFA;
        }

        .store-item.active {
            background: #F5F5F5;
            border-left: 3px solid #0D3D2E;
        }

        .store-name {
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            color: #1A1A1A;
        }

        .store-address {
            font-size: 0.9rem;
            color: #666666;
            line-height: 1.7;
            margin-bottom: 16px;
        }

        .store-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 0.85rem;
            color: #999999;
        }

        .store-detail-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .store-detail-item a {
            color: #0D3D2E;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .store-detail-item a:hover {
            color: #1A3D2E;
            text-decoration: underline;
        }

        .book-appointment-btn {
            margin-top: 16px;
            padding: 12px 24px;
            background: #0D3D2E;
            color: #FFFFFF;
            border: 1px solid #0D3D2E;
            font-size: 0.75rem;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            width: 100%;
        }

        .book-appointment-btn:hover {
            background: #FFFFFF;
            color: #0D3D2E;
        }

        /* Map */
        .stores-map {
            flex: 1;
            position: relative;
        }

        .stores-map iframe {
            width: 100%;
            height: 100%;
            border: none;
            position: relative;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .stores-container {
                flex-direction: column;
                padding-top: 70px;
                height: auto;
                min-height: 100vh;
            }

            .stores-sidebar {
                width: 100%;
                height: auto;
                max-height: none;
                order: 1;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            }

            .stores-header {
                padding: 20px 16px 16px;
            }

            .stores-header h1 {
                font-size: 1.3rem;
                margin-bottom: 12px;
                letter-spacing: 1.5px;
            }

            .stores-map {
                height: 60vh;
                min-height: 400px;
                max-height: 600px;
                order: 2;
                width: 100%;
            }

            .stores-map iframe {
                width: 100%;
                height: 100%;
                border: none;
            }

            .store-item {
                padding: 20px 16px;
            }

            .store-name {
                font-size: 0.95rem;
                margin-bottom: 8px;
            }

            .store-address {
                font-size: 0.8rem;
                line-height: 1.5;
                margin-bottom: 12px;
            }

            .store-details {
                font-size: 0.75rem;
                gap: 6px;
            }

            .store-detail-item {
                gap: 6px;
            }

            .store-detail-item svg {
                width: 12px;
                height: 12px;
                flex-shrink: 0;
            }

            .use-location-btn {
                padding: 14px 16px;
                font-size: 0.75rem;
            }

            .use-location-btn svg {
                width: 14px;
                height: 14px;
            }

            .book-appointment-btn {
                padding: 10px 16px;
                font-size: 0.65rem;
                margin-top: 12px;
                letter-spacing: 1px;
            }

            .stores-list {
                max-height: none;
                overflow-y: visible;
            }
        }

        /* Small mobile phones */
        @media (max-width: 400px) {
            .stores-header h1 {
                font-size: 1.2rem;
            }

            .store-name {
                font-size: 0.9rem;
            }

            .store-address {
                font-size: 0.75rem;
            }

            .store-details {
                font-size: 0.7rem;
            }
        }

        /* Tablet adjustments */
        @media (max-width: 1024px) and (min-width: 769px) {
            .stores-sidebar {
                width: 380px;
            }

            .stores-header {
                padding: 40px 30px 30px;
            }

            .store-item {
                padding: 28px 30px;
            }
        }

        /* Custom Scrollbar */
        .stores-list::-webkit-scrollbar {
            width: 4px;
        }

        .stores-list::-webkit-scrollbar-track {
            background: #F5F5F5;
        }

        .stores-list::-webkit-scrollbar-thumb {
            background: #D4D4D4;
            border-radius: 2px;
        }

        .stores-list::-webkit-scrollbar-thumb:hover {
            background: #999999;
        }
    </style>
</head>
<body>
    <div class="stores-container">
        <!-- Sidebar -->
        <div class="stores-sidebar">
            <div class="stores-header">
                <h1>Salon Locator</h1>
            </div>

            <button class="use-location-btn" id="useLocationBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                Use My Current Location
            </button>

            <div class="stores-list" id="storesList">
                <div class="store-item active">
                    <div class="store-name">Bliss Hair Studios</div>
                    <div class="store-address">
                        1-2 N End<br>
                        Swineshead, Boston PE20 3LR<br>
                        United Kingdom
                    </div>
                    <div class="store-details">
                        <div class="store-detail-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            +44 1205 820308
                        </div>
                        <div class="store-detail-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            Mon-Sat: 9:00 - 17:00, Sun: Closed
                        </div>
                        <div class="store-detail-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <a href="https://www.facebook.com/Blisshairswineshead" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </div>
                    </div>
                    <button class="book-appointment-btn" onclick="window.location.href='/contact'">
                        Book an Appointment
                    </button>
                </div>
            </div>
        </div>

        <!-- Map -->
        <div class="stores-map">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2410.3167891234567!2d-0.1811234!3d52.9534567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879f5e0f5e0f5e1%3A0x1234567890abcdef!2s1-2%20N%20End%2C%20Swineshead%2C%20Boston%20PE20%203LR!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </div>

    <script>
        // Use current location
        document.getElementById('useLocationBtn')?.addEventListener('click', () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        // Open Google Maps with directions from user location to store
                        window.open(\`https://www.google.com/maps/dir/\${userLat},\${userLng}/1-2+N+End,+Swineshead,+Boston+PE20+3LR\`, '_blank');
                    },
                    (error) => {
                        alert('Unable to retrieve your location. Please enable location services.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    </script>
</body>
</html>
`;
