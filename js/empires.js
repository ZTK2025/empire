// empires.js - INTEGRACIÓN CON FIREBASE
console.log("🎮 Empires.js - Inicializando con Firebase...");

// Sistema de Firebase para Empires
class EmpireFirebaseIntegration {
    constructor() {
        this.profileSystem = null;
        this.currentProfile = null;
        this.initFirebase();
    }

    initFirebase() {
        try {
            if (typeof ProfileSystem !== 'undefined') {
                this.profileSystem = new ProfileSystem();
                this.currentProfile = this.profileSystem.getSelectedProfile();
                
                if (this.currentProfile) {
                    console.log("✅ Perfil de Firebase cargado para el juego:", this.currentProfile.name);
                    this.injectProfileToGame();
                } else {
                    console.log("❌ No hay perfil de Firebase seleccionado");
                }
            } else {
                console.log("⚠️ ProfileSystem no disponible");
            }
        } catch (error) {
            console.error("❌ Error inicializando Firebase en Empires:", error);
        }
    }

    // Inyectar datos del perfil al juego
    injectProfileToGame() {
        if (!this.currentProfile) return;

        console.log("🔄 Inyectando datos de Firebase al juego...");
        
        // Sobrescribir la función getUserInfo para usar datos de Firebase
        this.overrideGetUserInfo();
        
        // Sobrescribir la función getFriendData si es necesario
        this.overrideGetFriendData();
        
        // Simular que el juego está cargado
        this.simulateGameLoad();
    }

    overrideGetUserInfo() {
        // Guardar la función original
        const originalGetUserInfo = window.getUserInfo;
        
        // Reemplazar con datos de Firebase
        window.getUserInfo = function() {
            console.log("🔥 getUserInfo llamado con datos de Firebase");
            
            // Llamar a la función original si existe
            if (typeof inner_getUserInfo === 'function') {
                inner_getUserInfo();
            }
            
            // Devolver datos del perfil de Firebase
            const profile = window.empireFirebase?.currentProfile;
            if (profile) {
                return {
                    'zid': profile.id || 6582090459255810,
                    'uid': profile.id || 6582090459255810,
                    'first_name': profile.name || "Comandante",
                    'name': profile.name || "Comandante",
                    "sex": 'M',
                    'pic_square': 'img/avatars/blank.png',
                    'level': profile.level || 1,
                    'resources': profile.resources || 1000,
                    'gold': profile.gold || 500,
                    'oil': profile.oil || 500
                };
            }
            
            // Fallback a datos locales
            console.log("⚠️ Usando datos locales como fallback");
            return originalGetUserInfo ? originalGetUserInfo() : {
                'zid': 6582090459255810,
                'uid': 6582090459255810,
                'first_name': "Jugador",
                'name': "Jugador",
                "sex": 'M',
                'pic_square': 'img/avatars/blank.png'
            };
        };
        
        console.log("✅ getUserInfo sobrescrito con datos de Firebase");
    }

    overrideGetFriendData() {
        // Mantener la función original de amigos por ahora
        console.log("✅ Sistema de amigos listo");
    }

    simulateGameLoad() {
        // Simular que el juego se cargó correctamente
        setTimeout(() => {
            console.log("🎮 Simulando carga completa del juego...");
            
            // Llamar a onGameLoaded si existe
            if (typeof onGameLoaded === 'function') {
                onGameLoaded(true, false, document.getElementById('game_object'));
            }
            
            // Ocultar pantalla de carga
            this.hideLoadingScreen();
            
        }, 3000);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading_game');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            console.log("✅ Pantalla de carga ocultada");
        }
    }

    // Guardar progreso en Firebase
    async saveGameProgress(gameData) {
        if (!this.currentProfile || !this.profileSystem) return;
        
        try {
            await this.profileSystem.updateProfile(this.currentProfile.id, gameData);
            console.log("✅ Progreso del juego guardado en Firebase");
        } catch (error) {
            console.error("❌ Error guardando progreso:", error);
        }
    }
}

// Inicializar la integración cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que Firebase se cargue
    setTimeout(() => {
        window.empireFirebase = new EmpireFirebaseIntegration();
    }, 1000);
});
